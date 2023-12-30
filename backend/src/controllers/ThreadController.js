const Thread = require('../models/Thread');

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
      const response = {
        totalPages: Math.ceil(totalThreads / threadsPerPage),
        threads
      }
      return res.status(200).json(response);
  }
}

module.exports = new ThreadController();
