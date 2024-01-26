const Thread = require("../models/Thread");
const Reply = require("../models/Reply");
const logger = require("../utils/logger");
const keywordExtractor = require("keyword-extractor"); // Chú ý việc sửa tên biến
const { OpenAI } = require('openai');
const { OPENAI_API_KEY } = require('../config');
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const hotTrendThreads = async (req, res) => {
  try {
    const currentDate = new Date();

    // Đặt ngày bắt đầu của ngày hiện tại (00:00:00)
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

    // Tìm tổng số chủ đề trong khoảng thời gian đã cho
    const countResult = await Reply.aggregate([
      {
        $match: {
          createdTime: { $gte: startOfToday, $lte: endOfToday },
        },
      },
      {
        $group: {
          _id: "$threadId",
        },
      },
      {
        $group: {
          _id: null,
          threadCount: { $sum: 1 },
        },
      },
    ]);

    // Trích xuất số chủ đề
    const threadCount = countResult.length > 0 ? countResult[0].threadCount : 0;

    // Tính 10% của số chủ đề
    const topPercentageLimit = Math.ceil((threadCount * 5) / 100);

    // Tìm 10% chủ đề hàng đầu dựa trên số lượng phản hồi
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
        $limit: topPercentageLimit,
      },
    ]);

    // Tìm ra tag cho các hot thread
    const extractedKeywords = await Promise.all(
      threadIds.map(async (threadInfo) => {
        const thread = await Thread.findById(threadInfo._id);
        const contentKeywords = keywordExtractor.extract(thread.content, {
          language: "vietnamese",
          remove_digits: true,
          return_changed_case: false,
          remove_duplicates: true,
        });

        return {
          threadId: thread._id,
          keywords: contentKeywords,
        };
      })
    );

    // Danh sách các tag
    const tag_list = [
      "Technology", "Science", "Health", "Travel", "Food", "Fashion", "Beauty", "Lifestyle",
      "Art", "Music", "Books", "Movies", "Gaming", "DIY", "Home Decor", "Parenting", "Education",
      "Business", "Finance", "Career", "Self-improvement", "Relationships", "Mental Health", "Productivity",
      "Social Media", "Marketing", "Entrepreneurship", "Programming", "Web Development", "AI and Machine Learning",
      "Environmental Sustainability", "Adventure", "Outdoor Activities", "Travel Tips", "Culinary Adventures",
      "Fashion Trends", "Skincare", "Comedy", "Entertainment"
    ];

    // Tạo prompt cho AI
    const prompt_tag = `Sử dụng 3 trong số 50 tags dưới đây, gắn nó vào thread \n${tag_list.join(", ")}\nVới keyword của thread như sau: \n${extractedKeywords}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          role: "system",
          content: prompt_tag,
        },
        {
          role: "user",
          content: ""
        }
      ],
      temperature: 0,
      top_p: 1,
    });

    // Lấy các tags từ AI
    const generatedTags = generatedTagsString.split('\n').map(tag => tag.trim()).filter(tag => tag !== "");
    await Promise.all(threadIds.map(async (threadInfo) => {
      // Lấy thông tin chi tiết của thread
      const thread = await Thread.findById(threadInfo._id);

      const currentTags = thread.tags || [];
      const updatedTags = [...currentTags, ...generatedTags];
      const limitedTags = updatedTags.slice(0, 3);

      // Cập nhật tags trong document của thread
      await Thread.findByIdAndUpdate(thread._id, { tags: limitedTags });
    }));

    // Trích xuất IDs của 10 chủ đề hàng đầu
    const topThreadIds = threadIds.slice(0, 20).map((result) => result._id);

    // Tìm thông tin chi tiết của 10 chủ đề hàng đầu
    const topThreads = await Thread.find({
      _id: { $in: topThreadIds },
    });

    return res.status(200).json({ topThreads: topThreads }) && logger.info({ status: 200, threadIds: topThreadIds, data: topThreads, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Lỗi máy chủ" }) && logger.error({ status: 500, message: err, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers });
  }
};

module.exports = hotTrendThreads;
