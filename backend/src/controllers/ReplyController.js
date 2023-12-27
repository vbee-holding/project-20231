const Reply = require('../models/Reply');

class ReplyController{
  // [GET] /threads/:threadId/replies?page=<pageNumber>
  async showReply(req, res, next){
    const page = req.query.page || 0;
    const repliesPerPage = 10;

    try{
      let totalReplies = await Reply.countDocuments({threadId: req.params.threadId})
      let replies = await Reply.find({threadId: req.params.threadId})
      .sort({ createdTime: -1 })
      .skip(page * repliesPerPage)
      .limit(repliesPerPage)
      .lean();
      if(replies.length === 0){
        return res.status(404).send('404 - No replies found!');
      }
      // return res.status(200).json(replies);
      const response = {
        totalPages: Math.ceil(totalReplies / repliesPerPage),
        replies
      }
      return res.status(200).json(response);
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
        return res.status(200).json(response);
      })
      .catch(next);
      return;
    }

    await query
      .lean()
      .then(replies =>{
        res.json(replies);
      })
      .catch(next);
  }
}

module.exports = new ReplyController();
