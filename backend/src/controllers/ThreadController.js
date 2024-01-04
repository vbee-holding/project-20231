require("dotenv").config();
const Thread = require('../models/Thread');
const { OpenAI } = require('openai');
const { OPENAI_API_KEY } = require('../config');
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
class ThreadController{
  // [GET] /threads?page=<pageNumber>
  async showAll(req, res, next){
    const page = req.query.page || 0;
    const threadsPerPage = 10;

    try{
      let totalThreads = await Thread.countDocuments({});
      if(page > Math.ceil(totalThreads / threadsPerPage)){
        return res.status(404).send('404 - No threads found!');
      }
      let threads = await Thread.find({})
        .sort({ createdTime: -1 })
        .skip(page * threadsPerPage)
        .limit(threadsPerPage)
        .lean();
      if(!threads){
        return res.status(404).send('404 - No threads found!');
      }
      // Giới hạn content của threads chỉ có tối đa 20 từ
      threads.forEach(thread => {
        if (thread.replys && thread.replys.length > 0) {
          let content = thread.replys[0].content;
          if (thread.replys[0].content.split(' ').length > 20) {
            let threadContent = thread.replys[0].content;
            content = threadContent.split(' ').slice(0, 20).join(' ') + ' ...';
          }
          thread.content = content;
        }
      });

      const response = {
        totalPages: Math.ceil(totalThreads / threadsPerPage),
        threads
      }
      return res.status(200).json(response);
    }
    catch(error){
      next(error);
    }
  }

  // [GET] /threads/:threadId
  async showThread(req, res, next){
    try{
      let thread = await Thread.findOne({ threadId: req.params.threadId })
      .lean();
      if(!thread){
        return res.status(404).send('404 - No threads found!');
      }
      thread.content = thread.replys[0].content;
      return res.status(200).json(thread);
    }
    catch(error){
      next(error);
    }
  }

  // [GET] /threads/:threadId/summary
  async showSummarizedThread(req, res, next){
    try{
      let thread = await Thread.findOne({ threadId: req.params.threadId }).lean();

      if(!thread){
        return res.status(404).send('404 - No thread is found to summarize!');
      }

      let content = thread.replys[0].content;
      let summarizedContent = "";
      // Nếu đã có nội dung tóm tắt thì trả về luôn
      if(thread.summarized_content){
        return res.json(thread);
      }
      // Nếu chưa có 
      const prompt = "Summarize content you are provided with in Vietnamese in exactly 100 words";
      if(content.length < 200){
        return res.json(thread);
      }
      else{
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { 
              "role": "system", 
              "content": prompt
            },
            {
              "role": "user",
              "content": content
            }
          ],
          temperature: 0,
          top_p: 1,
        });

        summarizedContent = response.choices[0].message.content;
        thread.summarized_content = summarizedContent;
        // Lưu vào trong database
        await Thread.findOneAndUpdate({ threadId: req.params.threadId }, { summarized_content: summarizedContent });
        return res.json(thread);
      }
    }
    catch(error){
      next(error);
    }
  }
    // [GET] /threads/search?text=<từ khóa cần tìm>&newer=<YY-MM-DD>&older=<YY-MM-DD>&order=<type>?page=<pageNumber>
  async searchThread(req, res, next){
    const text = req.query.text;
    const order = req.query.order;
    const newerThan = req.query.newer;
    const olderThan = req.query.older;
    
    const keywords = text.split(' ');
    const regexKeyWords = keywords.map(keyword => new RegExp(keyword, 'i'));

    const page = req.query.page || 0;
    const threadsPerPage = 10;

    let query = Thread.find({ title: { $in: regexKeyWords } });
    let totalThreads = await Thread.countDocuments({ title: { $in: regexKeyWords } });

    if(page > Math.ceil(totalThreads / threadsPerPage)){
      return res.status(404).send('404 - No threads found!');
    }
    
    if (newerThan && olderThan) {
      query = query.where('createdTime').gte(new Date(newerThan)).lte(new Date(olderThan));
    }
    // Sort by date
    if (order === 'date') {
      query = query.sort({ createdTime: -1 });
    }

    // Sort by relevance
    else if (order === 'relevance'){
      query = query
      .lean()
      .then(threads => {
        threads.forEach(thread => {
          let relevanceScore = 0;
          keywords.forEach(keyword =>{
            const keywordRegex = new RegExp(keyword, 'i');
            if (keywordRegex.test(thread.title)) {
              relevanceScore++;
            }
          });
          thread.relevanceScore = relevanceScore
          // Giới hạn content của threads chỉ có tối đa 20 từ
          if (thread.replys && thread.replys.length > 0) {
            let content = thread.replys[0].content;
            if (thread.replys[0].content.split(' ').length > 20) {
              let threadContent = thread.replys[0].content;
              content = threadContent.split(' ').slice(0, 20).join(' ') + ' ...';
            }
            thread.content = content;
          }
        });
        threads.sort((a, b) => b.relevanceScore - a.relevanceScore);
        const startIndex = page * threadsPerPage;
        const endIndex = startIndex + threadsPerPage;
        const paginatedThreads = threads.slice(startIndex, endIndex);
        // res.status(200).json(paginatedThreads);
        const response = {
          totalPages: Math.ceil(totalThreads / threadsPerPage),
          paginatedThreads
        }
        return res.status(200).json(response);
      })
      .catch(next);
      return;
    }

    const threads = await query
      .sort({createdTime: -1})
      .skip(page * threadsPerPage)
      .limit(threadsPerPage)
      .lean();
      if(threads.length === 0){
        return res.status(404).send('404 - No threads found!');
      }
      // return res.status(200).json(replies);
      threads.forEach(thread => {
        if (thread.replys && thread.replys.length > 0) {
          let content = thread.replys[0].content;
          if (thread.replys[0].content.split(' ').length > 20) {
            let threadContent = thread.replys[0].content;
            content = threadContent.split(' ').slice(0, 20).join(' ') + ' ...';
          }
          thread.content = content;
        }
      });
      const response = {
        totalPages: Math.ceil(totalThreads / threadsPerPage),
        threads
      }
      return res.status(200).json(response);
  }
}

module.exports = new ThreadController();
