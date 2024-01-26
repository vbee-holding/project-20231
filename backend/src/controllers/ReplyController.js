require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_API_KEY } = require('../config');
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
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
      // Tổng hợp comment
      let content = "";
      for(var i = 1; i < thread.replys.length && content.length < 30000; i++){
        content += thread.replys[i].content + '|';
      }
      // Nếu đã có nội dung tóm tắt thì trả về luôn
      if(thread.summarizedRepliesContent){
        return res.json(thread) 
        && logger.info({ status: 200, data: thread, message:"Da ton tai noi dung tom tat", url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers });
      }
      // Nếu chưa có 
      const prompt = "Summarize comments you are provided with into an overview in Vietnamese like 'Phần lớn comment là ..., số khác lại cho là ..., một số ít cho là ..., hơn nữa ...' in exactly 100 words\n" + content;
      const result = await model.generateContent(prompt);
      const response = result.response;
      let summarizedRepliesContent = response.text(); 
      thread.summarizedRepliesContent = summarizedRepliesContent;
      
      // Lưu vào trong database
      await Thread.findOneAndUpdate({ threadId: req.params.threadId }, { summarizedRepliesContent: summarizedRepliesContent });
      return res.json(thread) 
      && logger.info({ status: 200, data: response, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers });
    }
    catch(error){
      logger.warn({status:404, message: "No thread is found to summarize replies!", url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers});
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
      })
      .catch(next);
      return res.status(400);
    }

    const replies = await query
    .sort({ createdTime: -1 })
    .skip(page * repliesPerPage)
    .limit(repliesPerPage)
    .lean();
    if(replies.length === 0){
      return res.status(404).send('404 - No replies found!') 
    }
    // return res.status(200).json(replies);
    const response = {
      totalPages: Math.ceil(totalReplies / repliesPerPage),
      replies
    }
    return res.status(200).json(response) 
  }
}

module.exports = new ReplyController();
