const nodemailer = require("nodemailer");
const User = require("../models/user");
const hotTrendThreadsController = require("./HotTrendThreadsController");
const HotTopicController = require("./HotTopicController");
const cron = require('node-cron');

// Load environment variables from .env file
require('dotenv').config();
class EmailController{
  async sendThreads() {
    try {
      const usersToNotify = await User.find({ isNotifi: true });
      const topThreads = await hotTrendThreadsController.getHotTrendThreads();
  
      if (topThreads && topThreads.length > 0) {
        const top3ThreadsForEmail = topThreads.slice(0, 3);
  
        const emailBody = `Top Trending Threads of the Day:\n\n${top3ThreadsForEmail.map(thread => `${thread.title}\n${thread.summarizedContent}\n\n`).join('\n')}`;
  
        const mailOptions = this.createMailOptions('Here are top 3 trending Threads of the day!', emailBody, usersToNotify);
  
        await this.sendMail(mailOptions);
      }
    } catch (error) {
      this.handleEmailError('Top Trending Threads', error);
    }
  }
  
  async sendTopics() {
    try {
      const usersToNotify = await User.find({ isNotifi: true });
      const topTopics = await HotTopicController.getHotTrendTopics();
  
      if (topTopics && topTopics.length > 0) {
        const top3TopicsForEmail = topTopics.slice(0, 3);
        const emailBody = `Top Trending Topics of the Day:\n\n${top3TopicsForEmail.map(thread => `${thread.topic}\n`).join('\n')}`;
  
        const mailOptions = this.createMailOptions('Here are top 3 trending Topics of the day!', emailBody, usersToNotify);
  
        await this.sendMail(mailOptions);
      }
    } catch (error) {
      this.handleEmailError('Top Trending Topics', error);
    }
  }
  
  createMailOptions(subject, body, usersToNotify) {
    return {
      from: process.env.EMAIL_USERNAME,
      to: usersToNotify.map(user => user.email).join(','),
      subject,
      text: body,
    };
  }
  
  async sendMail(mailOptions) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
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
