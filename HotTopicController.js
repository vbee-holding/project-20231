const Thread = require("../models/Thread");
const logger = require("../utils/logger");

const hotTrendTopics = async (req, res) => {
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

    const topicCounts = await Thread.aggregate([
      {
        $match: {
          "createdTime": { $gte: startOfToday, $lte: endOfToday },
        },
      },
      {
        $group: {
          _id: "$topic", 
          threadCount: { $sum: 1 }, // Count each thread in the topic
        },
      },
      {
        $sort: { threadCount: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    return res.status(200).json({ hotTopics: topicCounts }) && logger.info({ status: 200, data: topicCounts, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" }) && logger.error({ status: 500, message: err,  url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers});
  }
};

module.exports = hotTrendTopics;
