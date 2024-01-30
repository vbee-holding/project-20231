const express = require('express');
const router = express.Router();
const hotTrendThreadsController = require('../controllers/HotTrendThreadsController');
const hotTrendTopicsController = require('../controllers/HotTopicController');
const emailController = require('../controllers/EmailController');
const cron = require('node-cron');

router.get('/threads', hotTrendThreadsController.getHotTrendThreads);
router.get('/topics/:topic', hotTrendTopicsController.getTopicThreads);
router.get('/topics', hotTrendTopicsController.getHotTrendTopics);

// Gửi email vào 22h hằng ngày
cron.schedule('0  22 * * *', async () => {
  try {
    await emailController.sendThreads();
    await emailController.sendTopics();
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).send('Internal Server Error');
  }
},
  {
    scheduled: true,
    timezone: "Asia/Saigon"
  }
);

router.get('/send-emails', async (req, res) => {
    try{
      await emailController.sendThreads();
      await emailController.sendTopics();
    } catch (error) {
      console.error('Error sending emails:', error);
      res.status(500).send('Internal Server Error');
    }
  }
);

module.exports = router;
