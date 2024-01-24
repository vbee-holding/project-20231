require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_API_KEY } = require('../config');
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const { OpenAI } = require('openai');
const { OPENAI_API_KEY } = require('../config');
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
const Reply = require('../models/Reply');
const Thread = require('../models/Thread');
const logger = require('../utils/logger');
const { error } = require('winston');
class ReplyController{
  // [GET] /threads/:threadId/replies/summary
  async showSummarizedReplies(req, res, next){
    try{
      let thread = await Thread.findOne({ threadId: req.params.threadId }).lean();
      const model = genAI.getGenerativeModel({model: "gemini-pro"});
      if(!thread){
        return res.status(404).send('404 - No thread is found to summarize replies!') 
        && logger.warn({status:404, message: "No thread is found to summarize replies!", stack : error.stack, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers});
      }
      // Nếu thread có ít replies thì không tóm tắt
      if(thread.replys.length <= 5){
        thread.latestRepliesLength = thread.replys.length;
        await Thread.findOneAndUpdate({ threadId: req.params.threadId }, { latestRepliesLength: thread.replys.length });
        res.json(thread);
        logger.info({ status: 200, data: thread, message:"Chưa đủ replies để tóm tắt", url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers });
        return;
      }
      // Nếu đã có nội dung tóm tắt và số lượng replies không đổi thì trả về luôn
      if(thread.summarizedRepliesContent && thread.latestRepliesLength && thread.replys.length === thread.latestRepliesLength){
        res.json(thread);
        logger.info({ status: 200, data: thread, message:"Đã tồn tại nội dung tóm tắt và không có thêm replies mới để tóm tắt lại", url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers });
        return;
      }
      // Tổng hợp comment
      let content = "";
      for(var i = 1; i < thread.replys.length && content.length < 30000; i++){
        content += thread.replys[i].content + '|';
      }
      // Nếu chưa có 
      const prompt = "Summarize comments you are provided with into an overview in Vietnamese like 'Phần lớn bình luận là ..., số khác lại cho là ..., một số ít cho là ..., hơn nữa ...' in exactly 100 words\n" + content;
      let summarizedRepliesContent = "";
      // Thử tóm tắt bằng Gemini
      try{
        const result = await model.generateContent(prompt);
        const response = result.response;
        summarizedRepliesContent = response.text(); 
      }
      
      // Nếu gặp lỗi BLOCKED DUE TO SAFETY thì dùng chatGPT
      catch(error) {
        const promptGPT = "Summarize comments you are provided with into an overview in Vietnamese like 'Phần lớn bình luận là ..., số khác lại cho là ..., một số ít cho là ..., hơn nữa ...' in exactly 100 words";
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
        summarizedRepliesContent = response.choices[0].message.content;
      }
      
      thread.summarizedRepliesContent = summarizedRepliesContent;
      thread.latestRepliesLength = thread.replys.length;
      // Lưu vào trong database
      await Thread.findOneAndUpdate({ threadId: req.params.threadId }, { summarizedRepliesContent: summarizedRepliesContent });
      await Thread.findOneAndUpdate({ threadId: req.params.threadId }, { latestRepliesLength: thread.replys.length });
      return res.json(thread) 
      && logger.info({ status: 200, data: response, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers });
    }
    catch(error){
      next(error);
      logger.warn({status:404, message: "Không thể tóm tắt replies bằng cả Gemini lẫn ChatGPT", url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers});
    }
  }
  // [GET] /threads/:threadId/replies?page=<pageNumber>
  async showReply(req, res, next){
    const page = req.query.page || 0;
    const repliesPerPage = 10;

    try{
      let totalReplies = await Reply.countDocuments({threadId: req.params.threadId})
      if(page > Math.ceil(totalReplies / repliesPerPage)){
        return res.status(404).send('404 - No replies found!') 
        && logger.warn({ status: 404, message: "No replies found!", url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers });
      }
      let replies = await Reply.find({threadId: req.params.threadId})
      .sort({ createdTime: -1 })
      .skip(page * repliesPerPage)
      .limit(repliesPerPage)
      .lean();
      if(replies.length === 0){
        return res.status(404).send('404 - No replies found!') 
        && logger.warn({ status: 404, message: "No replies found!", url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers });
      }
      // return res.status(200).json(replies);
      const response = {
        totalPages: Math.ceil(totalReplies / repliesPerPage),
        replies
      }
      return res.status(200).json(response) 
      && logger.info({ status: 200, data: response, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers });

    }
    catch(error){
      next(error);
    }
  }
  
  // [GET] /threads/:threadId/replies/search?text=<từ khóa cần tìm>&newer=<YY-MM-DD>&older=<YY-MM-DD>&order=<type>
  async searchReply(req, res, next){
    const text = req.query.text;
    const order = req.query.order;
    const newerThan = req.query.newer;
    const olderThan = req.query.older;

    const keywords = text.split(' ');
    const regexKeyWords = keywords.map(keyword => new RegExp(keyword, 'i'));
    
    const page = req.query.page || 0;
    const repliesPerPage = 10;

    let query = Reply.find({ content: { $in: regexKeyWords } });
    let totalReplies = await Reply.countDocuments({ content: { $in: regexKeyWords } });
    if(page > Math.ceil(totalReplies / repliesPerPage)){
      return res.status(404).send('404 - No replies found!') 
      && logger.warn({ status: 404, message: "No replies found!", url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers });
    }
    if (newerThan && olderThan) {
      query = query.where('createdTime').gte(new Date(newerThan)).lte(new Date(olderThan));
    }
    // Sort by date
    if (order === 'date') {
      query = query.sort({ createdTime: -1 });
    }

    // Sort by relevance
    else if (order == 'relevance'){
      query = query
      .lean()
      .then(replies => {
        replies.forEach(reply => {
          let relevanceScore = 0;
          keywords.forEach(keyword =>{
            const keywordRegex = new RegExp(keyword, 'i');
            if (keywordRegex.test(reply.content)) {
              relevanceScore++;
            }
          });
          reply.relevanceScore = relevanceScore
        });
        replies.sort((a, b) => b.relevanceScore - a.relevanceScore);
        const startIndex = page * repliesPerPage;
        const endIndex = startIndex + repliesPerPage;
        const paginatedReplies = replies.slice(startIndex, endIndex);
        // res.status(200).json(paginatedReplies);
        const response = {
          totalPages: Math.ceil(totalReplies / repliesPerPage),
          paginatedReplies
        }
        return res.status(200).json(response) 
        && logger.info({ status: 200, data: response , url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers});
      })
      .catch(next);
      return logger.error({ status: 404, message: error.message, stack : error.stack, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers });;
    }

    const replies = await query
    .sort({ createdTime: -1 })
    .skip(page * repliesPerPage)
    .limit(repliesPerPage)
    .lean();
    if(replies.length === 0){
      return res.status(404).send('404 - No replies found!') 
      && logger.warn({ status: 404, message: "No replies found!", data : replies, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers });
    }
    // return res.status(200).json(replies);
    const response = {
      totalPages: Math.ceil(totalReplies / repliesPerPage),
      replies
    }
    return res.status(200).json(response) 
    && logger.info({ status: 200, data: response, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers });
  }
}

module.exports = new ReplyController();
