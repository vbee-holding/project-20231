const nodemailer = require("nodemailer");
const User = require("../models/User");
const getHotTrendThreads = require("./HotTrendThreadsController");
const getHotTrendTopics = require("./hotTopicsController");
const cron = require('node-cron');

// Load environment variables from .env file
require('dotenv').config();

async function sendThreads() {
  try {
    const usersToNotify = await User.find({ isNotifi: true });
    const topThreads = await getHotTrendThreads();

    if (topThreads && topThreads.length > 0) {
      const top3ThreadsForEmail = topThreads.slice(0, 3);

      const emailBody = `Top Trending Threads of the Day:\n\n${top3ThreadsForEmail.map(thread => `${thread.title}\n${thread.summarizedContent}\n\n`).join('\n')}`;

      const mailOptions = createMailOptions('Here are top 3 trending Threads of the day!', emailBody, usersToNotify);

      await sendMail(mailOptions);
    }
  } catch (error) {
    handleEmailError('Top Trending Threads', error);
  }
}

async function sendTopics() {
  try {
    const usersToNotify = await User.find({ isNotifi: true });
    const topTopics = await getHotTrendTopics();

    if (topTopics && topTopics.length > 0) {
      const top3TopicsForEmail = topTopics.slice(0, 3);
      const emailBody = `Top Trending Topics of the Day:\n\n${top3TopicsForEmail.map(thread => `${thread.topic}\n`).join('\n')}`;

      const mailOptions = createMailOptions('Here are top 3 trending Topics of the day!', emailBody, usersToNotify);

      await sendMail(mailOptions);
    }
  } catch (error) {
    handleEmailError('Top Trending Topics', error);
  }
}

function createMailOptions(subject, body, usersToNotify) {
  return {
    from: process.env.EMAIL_USERNAME,
    to: usersToNotify.map(user => user.email).join(','),
    subject,
    text: body,
  };
}

async function sendMail(mailOptions) {
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
    handleEmailError('Sending Email', error);
  }
}

function handleEmailError(action, error) {
  console.error(`Error during ${action}:`, error);

}

//set schedule 7PM
cron.schedule('0 7 * * *', async () => {
  try {
    await sendThreads();
    await sendTopics();
  } catch (error) {
    console.error('Error sending emails:', error);
  }
});

module.exports = { sendThreads, sendTopics };
