const Thread = require('../models/Thread');

class ThreadController{
  // [GET] /threads
  async showAll(req, res, next){
    await Thread.find({})
      .sort({ createdAt: -1 })
      .lean()
      .then(thread => {
        res.json(thread);
      })
      .catch(next);
  }

  // [GET] /threads/:threadId
  async showThread(req, res, next){
    await Thread.findOne({ threadId: req.params.threadId })
      .lean()
      .then(thread => {
        res.json(thread);
      })
      .catch(next);
  }

  // // [GET] /threads/search
  async searchThread(req, res, next){
    const text = req.query.text;
    const order = req.query.order;
    const newerThan = req.query.newer;
    const olderThan = req.query.older;
    
    const keywords = text.split(' ');
    const regexKeyWords = keywords.map(keyword => new RegExp(keyword, 'i'));
    console.log(regexKeyWords);
    let query = Thread.find({ title: { $in: regexKeyWords } });
    if (newerThan && olderThan) {
      query = query.where('createdAt').gte(new Date(newerThan)).lte(new Date(olderThan));
    }
    // Sort by date
    if (order === 'date') {
      query = query.sort({ createdAt: -1 });
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
          thread.relenvanceScore = relevanceScore
        });
        threads.sort((a, b) => b.relevanceScore - a.relenvanceScore);
        threads.reverse();
        res.json(threads);
      })
      .catch(next);
      return;
    }

    await query
      .lean()
      .then(threads =>{
        res.json(threads);
      })
      .catch(next);
  }

}

module.exports = new ThreadController();
