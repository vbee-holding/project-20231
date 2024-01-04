const Thread = require("../models/Thread");
const Reply = require("../models/Reply");

const hotTrendThreads = async (req, res) => {
  try {
    const currentDate = new Date(); 

    // Đặt ngày bắt đầu của ngày hiện tại (0:00:00)
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
    // console.log(startOfToday);

    // Đặt ngày kết thúc của ngày hiện tại (23:59:59)
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
    // console.log(endOfToday);

    const threadIds = await Reply.aggregate([
      {
        $match: {
          createdTime: { $gte: startOfToday, $lte: endOfToday },
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

    return res.status(200).json({ topThreads: topThreads });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = hotTrendThreads;
