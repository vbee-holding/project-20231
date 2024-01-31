const Thread = require("../models/Thread");
const Reply = require("../models/Reply");
const logger = require("../utils/logger");
const { OpenAI } = require('openai');
const { OPENAI_API_KEY_2 } = require('../config');
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY_2,
});

class HotTrendThreadsController{
  async getHotTrendThreads(req, res, next){
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
      // Tìm tổng số thread trong khoảng thời gian đã cho
      const replies = await Reply.find({
        createdTime: { $gte: startOfToday, $lte: endOfToday},
      }).lean();
      const threadIdList = replies.map(reply => reply.threadId);
      const replyCountMap = threadIdList.reduce((countMap, threadId) => {
        countMap[threadId] = (countMap[threadId] || 0) + 1;
        return countMap;
      }, {});
      const sortedThreadId = Object.keys(replyCountMap).sort(
        (a, b) => replyCountMap[b] - replyCountMap[a]
      );
      
      const maxNum = 20;
      let threadNumber = Math.min(sortedThreadId.length, maxNum);
      const topThreadIds = sortedThreadId.slice(0, threadNumber);
      const hotThreads = await Thread.find({ threadId: { $in: topThreadIds}}).lean();
      if(hotThreads.length === 0){
        return res.status(200).json({
          hotThreads: []
        });
      }
      else{
        const threadResponse = {
          hotThreads: hotThreads.map(thread => {
            const threadCopy = { ...thread, replys: undefined };
            return threadCopy;
          })
        }
        res.status(200).json(threadResponse);
        // Tổng hợp nội dung của các thread
        const extractedContent = await Promise.all(
          hotThreads.map(async (thread) => {
            const content = thread.replys[0].content;
            return {
              threadId: thread.threadId,
              title: thread.title,
              content: content,
            };
            }
          )
        );
        // Danh sách các tag
        const tag_list = [
          "Vắc xin COVID-19",
          "Biến đổi khí hậu",
          "Năng lượng tái tạo",
          "Trí tuệ nhân tạo",
          "Blockchain tiền điện tử",
          "Điện tử thông minh",
          "Làm việc từ xa",
          "Sức khỏe",
          "Xe cộ",
          "Bảo mật mạng",
          "Đồng tính chuyển giới",
          "Giáo dục trực tuyến",
          "Môi trường",
          "Du lịch",
          "Thực phẩm hữu cơ",
          "Phát triển cá nhân",
          "Thể thao thể dục",
          "Khám phá vũ trụ",
          "Máy bay không người lái",
          "Công nghệ 5G",
          "Truyền thông xã hội",
          "Nội dung số",
          "Sáng tạo kỹ thuật số",
          "Phương tiện truyền thông",
          "Chăm sóc sức khỏe",
          "Tình nguyện xã hội",
          "Giải quyết xã hội",
          "Thương mại điện tử",
          "Dự án công cộng",
          "Tương lai công nghệ",
          "Thực tế ảo",
          "Xu hướng thời trang",
          "Giáo dục STEM",
          "Điện thoại thông minh",
          "Ứng dụng di động",
          "Thời tiết biến đổi",
          "Văn hóa đô thị",
          "Dữ liệu lớn",
          "Dịch COVID-19",
          "Chiến sự Nga - Ukraine",
          "Lạm phát",
          "Suy thoái kinh tế",
          "Bầu cử Mỹ giữa nhiệm kỳ",
          "Elon Musk",
          "iPhone 14",
          "Trò chơi Wordle",
          "Metaverse",
          "Blockchain",
          "Trí tuệ nhân tạo",
          "Xe điện",
          "Năng lượng tái tạo",
          "Biến đổi khí hậu",
          "Tiền mã hóa",
          "NFT",
          "Bitcoin",
          "Ethereum",
          "Facebook",
          "TikTok",
          "YouTube",
          "Instagram",
          "Twitter",
          "Google",
          "Amazon",
          "công ty",
          "layoff"
        ];
        const textContent = extractedContent
          .filter((item) => item) // Lọc bỏ các phần tử undefined (nếu có)
          .map((item) => `${item.threadId} : ${item.title} : ${item.content}`)
          .join('\n');
        // console.log(textContent);
        // Tạo prompt cho AI
        const prompt_tag = `Làm ơn không được thay đổi hay tự thêm bất cứ tag nào cả, chỉ sử dụng các tag dưới đây \n${tag_list.join(", ")}\n 
        Với mỗi thread trong tất cả các thread mà bạn được cung cấp, hãy gắn cho tôi đúng 4 tags khác nhau ở trên, với threadId, tiêu đề và nội dung của nó có dạng như sau
        <thread>.<Id> : <title> : <content>
        hãy gắn tags đủ cho tất cả thread được cung cấp và đồng thời trả về kết quả dưới dạng <thread>.<Id>: <tags> giúp tôi và giữ nguyên threadId như tôi đã gửi bạn`;
        // console.log(prompt_tag);
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-1106",
          messages: [
            {
              role: "system",
              content: prompt_tag,
            },
            {
              role: "user",
              content: textContent
            }
          ],
          temperature: 0,
          top_p: 1,
        });
        // console.log(response.choices[0].message.content);
        const textResult = response.choices[0].message.content;
        const tagResults = textResult.split('\n');
        tagResults.forEach(async (result) => {
          let [threadId, tags] = result.split(':').map((item) => item.trim());
          tags = tags.split(',').map((tag) => tag.trim());
          const thread = await Thread.findOne({threadId: threadId});
          if(!thread.tags || thread.tags.length === 0){
            await Thread.findOneAndUpdate({threadId: threadId}, {tags: tags});
          }
        });
      //return res.status(200).json({ hotThreads }) && logger.info({ status: 200, threadIds: topThreadIds, data: hotThreads, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers });
        hotThreads.forEach(thread => {
          if (thread.replys && thread.replys.length > 0) {
            let content = thread.replys[0].content;
            if (thread.replys[0].content.split(' ').length > 20) {
              let threadContent = thread.replys[0].content;
              content = threadContent.split(' ').slice(0, 20).join(' ') + '...';
            }
            thread.content = content;
          }
        });
        return;
      } 
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ error: err }) && logger.error({ status: 500, message: err, url: req.originalUrl, method: req.method, sessionID: req.sessionID, headers: req.headers });
    }
  }
}


module.exports = new HotTrendThreadsController();
