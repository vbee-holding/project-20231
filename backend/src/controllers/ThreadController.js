require("dotenv").config();
const Thread = require('../models/Thread');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_API_KEY } = require('../config');
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const { OpenAI } = require('openai');
const { OPENAI_API_KEY } = require('../config');
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
const logger = require("../utils/logger");
class ThreadController{
  // [GET] /threads?page=<pageNumber>
  async showAll(req, res, next){
    const page = req.query.page || 0;
    const threadsPerPage = 10;

    try{
      let totalThreads = await Thread.countDocuments({});
      if(page > Math.ceil(totalThreads / threadsPerPage)){
        return res.status(404).send('404 - No threads found!') && logger.warn({status: 404, message : "No threads found!", data: res, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers});
      }
      let threads = await Thread.find({})
        .sort({ createdTime: -1 })
        .skip(page * threadsPerPage)
        .limit(threadsPerPage)
        .lean();
      if(!threads){
        return res.status(404).send('404 - No threads found!') && logger.warn({status: 404, message : "No threads found!", data: res, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers});
        ;
      }
      // Giới hạn content của threads chỉ có tối đa 20 từ
      threads.forEach(thread => {
        if (thread.replys && thread.replys.length > 0) {
          let content = thread.replys[0].content;
          if (thread.replys[0].content.split(' ').length > 20) {
            let threadContent = thread.replys[0].content;
            content = threadContent.split(' ').slice(0, 20).join(' ') + '...';
          }
          thread.content = content;
        }
      });

      const response = {
        totalPages: Math.ceil(totalThreads / threadsPerPage),
        threads
      }
      return res.status(200).json(response) && logger.info({status: 200, message : "No threads found!", data: response, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers});
    }
    catch(error){
      next(error);
      logger.error({ message :error.message, stack: error.stack, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers})
    }
  }

  // [GET] /threads/:threadId
  async showThread(req, res, next){
    try{
      let thread = await Thread.findOne({ threadId: req.params.threadId })
      .lean();
      if(!thread){
        return res.status(404).send('404 - No threads found!') && logger.warn({status: 404, message:"No threads found!", data: req.params,url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers })
      }
      thread.content = thread.replys[0].content;
      return res.status(200).json(thread)  && logger.info({status: 200, message:"OK", data: thread , url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers}); 
    }
    catch(error){
      next(error);
      logger.error({ message :error.message, stack: error.stack, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers})
    }
  }

  // [GET] /threads/:threadId/summary
  async showSummarizedThread(req, res, next){
    try{
      let thread = await Thread.findOne({ threadId: req.params.threadId }).lean();
      const model = genAI.getGenerativeModel({model: "gemini-pro"});
      if(!thread){
        return res.status(404).send('404 - No thread is found to summarize!') && logger.warn({status: 404, message : "No thread is found to summarize!", data: req, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers});
      }

      let content = thread.replys[0].content;
      let summarizedContent = "";
      // Nếu đã có nội dung tóm tắt thì trả về luôn
      if(thread.summarizedContent){
        return res.json(thread) && logger.info({status: 200, message : "Đã tóm tắt nội dung", data: thread, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers});
        
      }
      // Nếu chưa có 
      const prompt = "Summarize content you are provided with in Vietnamese as if you are the writer in exactly 70 words, please remember to keep the same way of addressing\n" + content;
      if (content.split(' ').length < 120) {
        thread.summarizedContent = content;
        return res.json(thread) && logger.info({status: 200, message : "Nội dung không cần tóm tắt", data: thread, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers});
      }
      else{
        let summarizedContent = "";
        // Thử tóm tắt bằng Gemini
        try{
          const result = await model.generateContent(prompt);
          const response = result.response;
          summarizedContent = response.text(); 
        }

        // Nếu gặp lỗi BLOCKED DUE TO SAFETY hoặc INTERNAL ERROR thì dùng chatGPT
        catch(error) {
          const promptGPT = "Summarize content you are provided with in Vietnamese as if you are the writer in exactly 100 words, please remember to keep the same way of addressing";
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            messages: [
              { 
                "role": "system", 
                "content": promptGPT
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
        }

        thread.summarizedContent = summarizedContent;
        // Lưu vào trong database
        await Thread.findOneAndUpdate({ threadId: req.params.threadId }, { summarizedContent: summarizedContent });
        return res.json(thread) && logger.info({status: 200, message : "Đã tóm tắt nội dung", data: thread, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers});;
      }
    }
    catch(error){
      next(error);
      logger.error({ message :error.message, stack: error.stack, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers})
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
              content = threadContent.split(' ').slice(0, 20).join(' ') + '...';
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
      // return res.status(200).json(replies);
      threads.forEach(thread => {
        if (thread.replys && thread.replys.length > 0) {
          let content = thread.replys[0].content;
          if (thread.replys[0].content.split(' ').length > 20) {
            let threadContent = thread.replys[0].content;
            content = threadContent.split(' ').slice(0, 20).join(' ') + '...';
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
