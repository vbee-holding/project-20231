const Thread = require("../models/Thread");
const Reply = require("../models/Reply");

const hotTrendThreads = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const threadIds = await Reply.aggregate([
      {
        $match: {
          createdTime: { $gte: startOfDay },
        },
      },
      {
        $group: {
          _id: "$threadId",
          replyCount: { $sum: 1 },
        },
      },
      {
        $sort: { replyCount: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    const topThreads = await Thread.find({
      threadId: { $in: threadIds.map((result) => result._id) },
    });
``
    return res.status(200).json({ topThreads: topThreads });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = hotTrendThreads;
