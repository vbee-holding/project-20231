const Reply = require('../models/Reply');

class ReplyController{

  // [GET] /threads/:threadId/replies
  async showReply(req, res, next){
    await Reply.find({threadId: req.params.threadId})
      .sort({ createdAt: -1 })
      .lean()
      .then(reply => {
        res.json(reply);
      })
      .catch(next);
  }
  
  // [GET] /threads/:threadId/replies/search
  async searchReply(req, res, next){
    const text = req.query.text;
    const order = req.query.order;
    const newerThan = req.query.newer;
    const olderThan = req.query.older;

    const keywords = text.split(' ');
    const regexKeyWords = keywords.map(keyword => new RegExp(keyword, 'i'));
    let query = Reply.find({ content: { $in: regexKeyWords } });
    if (newerThan && olderThan) {
      query = query.where('createdAt').gte(new Date(newerThan)).lte(new Date(olderThan));
    }
    // Sort by date
    if (order === 'date') {
      query = query.sort({ createdAt: -1 });
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
          reply.relenvanceScore = relevanceScore
        });
        replies.sort((a, b) => b.relevanceScore - a.relenvanceScore);
        threads.reverse();
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
