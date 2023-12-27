const Thread = require('../models/Thread');

class ThreadController{
  // [GET] /threads
  async showAll(req, res, next){
    try{
      let threads = await Thread.find({})
        .sort({ createdTime: -1 })
        .lean();
      if(!threads){
        return res.status(404).send('404 - No threads found!');
      }
      return res.status(200).json(threads);
    }
    catch(error){
      next(error);
    }
  }

  // [GET] /threads/:threadId
  async showThread(req, res, next){
    try{
      let threads = await Thread.findOne({ threadId: req.params.threadId })
      .sort({ createdTime: -1 })
      .lean();
      if(!threads){
        return res.status(404).send('404 - No threads found!');
      }
        return res.status(200).json(threads);
    }
    catch(error){
      next(error);
    }
  }

    // [GET] /threads/search?text=<từ khóa cần tìm>&newer=<YY-MM-DD>&older=<YY-MM-DD>&order=<type>
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
        });
        threads.sort((a, b) => b.relevanceScore - a.relevanceScore);
        res.status(200).json(threads);
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
