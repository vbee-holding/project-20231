const nodemailer = require("nodemailer");
const moment = require('moment');
require('moment/locale/vi');
const User = require("../models/user");
const Thread = require("../models/Thread");
const Reply = require("../models/Reply");
const { OAuth2Client } = require("google-auth-library");
const { GOOGLE_MAILER_CLIENT_ID, GOOGLE_MAILER_CLIENT_SECRET, GOOGLE_MAILER_REFRESH_TOKEN} = require('../config');
const GOOGLE_MAILER_CLIENT_ID_EMAIL = GOOGLE_MAILER_CLIENT_ID;
const GOOGLE_MAILER_CLIENT_SECRET_EMAIL = GOOGLE_MAILER_CLIENT_SECRET;
const GOOGLE_MAILER_REFRESH_TOKEN_EMAIL = GOOGLE_MAILER_REFRESH_TOKEN;
const ADMIN_EMAIL_ADDRESS = 'voz.f17.app@gmail.com';
// Load environment variables from .env file
require('dotenv').config();

const myOAuth2Client = new OAuth2Client(
  GOOGLE_MAILER_CLIENT_ID_EMAIL,
  GOOGLE_MAILER_CLIENT_SECRET_EMAIL
);

myOAuth2Client.setCredentials({
  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN_EMAIL
})
class EmailController{
  async sendThreads() {
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
      const usersToNotify = await User.find({ isNotifi: true });
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
      const topThreads = await Thread.find({ threadId: { $in: topThreadIds}}).lean();
  
      if (topThreads && topThreads.length > 0) {
        const top3ThreadsForEmail = topThreads.slice(0, 3);
  
        const emailBody = `Đây là các bài viết xu hướng của hôm nay  - ${moment().format('dddd, D [tháng] M, YYYY')}:\n\n${top3ThreadsForEmail.map(thread => `Tác giả bài viết: ${thread.author}\nTiêu đề bài viết: ${thread.title}\nLink bài viết: https://cloudrun-frontend-service-lsz2erfp2q-et.a.run.app/r/post/${thread.threadId}\n\n`).join('\n')}`;

        const mailOptions = this.createMailOptions(`Đây là các bài viết xu hướng của hôm nay!`, emailBody, usersToNotify);
  
        await this.sendMail(mailOptions);
      }
    } catch (error) {
      this.handleEmailError('Top Trending Threads', error);
    }
  }
  
  async sendTopics() {
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
      sortedTags.sort((a, b) => b.threadCount - a.threadCount);
      const topTopics = sortedTags.slice(0, 6);
      const usersToNotify = await User.find({ isNotifi: true });
  
      if (topTopics && topTopics.length > 0) {
        const top3TopicsForEmail = topTopics.slice(0, 3);
        const emailBody = `Đây là các chủ đề được nhiều người quan tâm hôm nay - ${moment().format('dddd, D [tháng] M, YYYY')}:\n\n${top3TopicsForEmail.map(topic => `Tên chủ đề: ${topic.tag}\nSố lượng bài viết: ${topic.threadCount}\nLink đến các bài viết thuộc chủ đề này: https://cloudrun-frontend-service-lsz2erfp2q-et.a.run.app/r/topic-detail/${encodeURIComponent(topic.tag)}\n\n`).join('\n')}`;

        const mailOptions = this.createMailOptions(`Đây là 3 chủ đề được nhiều người quan tâm hôm nay!`, emailBody, usersToNotify);
  
        await this.sendMail(mailOptions);
      }
    } catch (error) {
      this.handleEmailError('Top Trending Topics', error);
    }
  }
  
  createMailOptions(subject, body, usersToNotify) {
    return {
      from: "voz.f17.app@gmail.com",
      to: usersToNotify.map(user => user.email).join(','),
      subject,
      text: body,
    };
  }
  
  async sendMail(mailOptions) {
    try {
      const myAccessTokenObject = await myOAuth2Client.getAccessToken();
      const myAccessToken = myAccessTokenObject?.token;
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: "voz.f17.app@gmail.com",
          pass: "VoZ_f17_pass",
          clientId: GOOGLE_MAILER_CLIENT_ID_EMAIL,
          clientSecret: GOOGLE_MAILER_CLIENT_SECRET_EMAIL,
          refresh_token: GOOGLE_MAILER_REFRESH_TOKEN_EMAIL,
          accessToken: myAccessToken
        },
      });
  
      await transporter.sendMail(mailOptions);
    } catch (error) {
      this.handleEmailError('Sending Email', error);
    }
  }
  
  handleEmailError(action, error) {
    console.error(`Error during ${action}:`, error);
  }
}

module.exports = new EmailController();
