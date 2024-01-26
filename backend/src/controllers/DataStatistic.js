const Thread = require("../models/Thread");
const logger = require("../utils/logger");

const dataStatistics = async (req, res) => {
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

    const yesterday = new Date(
      Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate() - 1,
        23,
        59,
        59,
        999
      )
    );

    // Set the start of one month back to today (00:00:00)
    const startOfOneMonthBackToToday = new Date(
      Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth() - 1,
        currentDate.getUTCDate(),
        0,
        0,
        0,
        0
      )
    );

    const todayThreadCount = await Thread.countDocuments({
      timestamp: { $gte: startOfToday }
    });

    const oneMonthBackToTodayThreadCount = await Thread.countDocuments({
      timestamp: { $gte: startOfOneMonthBackToToday }
    });


    const todayReplyCount = await Thread.aggregate([
      {
        $match: {
          "replys.timestamp": { $gte: startOfToday }
        }
      },
      {
        $project: {
          _id: 0,
          replyCount: { $size: "$replys" }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$replyCount" }
        }
      }
    ]);

    const oneMonthBackToTodayReplyCount = await Thread.aggregate([
      {
        $match: {
          "replys.timestamp": { $gte: startOfOneMonthBackToToday }
        }
      },
      {
        $project: {
          _id: 0,
          replyCount: { $size: "$replys" }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$replyCount" }
        }
      }
    ]);

    const dataStats = {
      todayThreadCount,
      oneMonthBackToTodayThreadCount,
      todayReplyCount: todayReplyCount.length > 0 ? todayReplyCount[0].total : 0,
      oneMonthBackToTodayReplyCount: oneMonthBackToTodayReplyCount.length > 0 ? oneMonthBackToTodayReplyCount[0].total : 0
    };

    return res.status(200).json({ dataStats }) && logger.info({
      status: 200,
      data: dataStats,
      url: req.originalUrl,
      method: req.method,
      sessionID: req.sessionID,
      headers: req.headers
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" }) && logger.error({
      status: 500,
      message: err,
      url: req.originalUrl,
      method: req.method,
      sessionID: req.sessionID,
      headers: req.headers
    });
  }
};

module.exports = dataStatistics;
