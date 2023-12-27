const Reply = require('../models/Reply');

class ReplyController{

  // [GET] /threads/:threadId/replies
  async showReply(req, res, next){
    try{
      let replies = await Reply.find({threadId: req.params.threadId})
      .sort({ createdTime: -1 })
      .lean();
      if(replies.length === 0){
        return res.status(404).send('404 - No replies found!');
      }
      return res.status(200).json(replies);
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
    let query = Reply.find({ content: { $in: regexKeyWords } });
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
        res.json(replies);
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
