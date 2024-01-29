const Thread = require("../models/Thread");
const logger = require("../utils/logger");

class HotTopicController{
  async getHotTrendTopics(req, res, next){
    try {
      const currentDate = new Date(); 
  
      // Set the start of today (00:00:00)
      const startOfToday = new Date(
        Date.UTC(
          currentDate.getUTCFullYear(),
          currentDate.getUTCMonth(),
          currentDate.getUTCDate(),
          0,
          0,
          0,
          0
        )
      );
  
      // Set the end of today (23:59:59)
      const endOfToday = new Date(
        Date.UTC(
          currentDate.getUTCFullYear(),
          currentDate.getUTCMonth(),
          currentDate.getUTCDate(),
          23,
          59,
          59,
          999
        )
      );
      const threads = await Thread.find({
        updatedTime: { $gte: startOfToday, $lte: endOfToday}
      }).lean();
      const tagCounts = {};

      threads.forEach((thread) => {
        if(thread.tags && thread.tags.length > 0){
          thread.tags.forEach((tag) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        }
      });
      const sortedTags = Object.keys(tagCounts).map((tag) => ({
        tag, 
        threadCount: tagCounts[tag],
      }))
      if(sortedTags.length === 0){
        return res.status(400).send("Không có hot topic nào hôm nay");
      }
      sortedTags.sort((a, b) => b.threadCount - a.threadCount);
      const trendingTopics = sortedTags.slice(0, 6);
      return res.status(200).json(trendingTopics);
      //return res.status(200).json({ hotTopics: topicCounts }) && logger.info({ status: 200, data: topicCounts, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" }) && logger.error({ status: 500, message: err,  url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers});
    }
  }

  async getTopicThreads(req, res, next){
    const topic = req.params.topic;
    const topicThreads = await Thread.find({ tags: { $regex: new RegExp(topic, 'i') } }).lean();
    if(!topicThreads){
      res.status(400).send("Không có bài viết nào cho topic này");
    }
    const response = {
      topicThreads: topicThreads.map(thread => {
        const threadCopy = { ...thread, replys: undefined };
        return threadCopy;
      })
    }
    res.status(200).json(response);
  }
}

module.exports = new HotTopicController();
