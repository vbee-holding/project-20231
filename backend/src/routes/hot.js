const express = require('express');
const router = express.Router();
const hotTrendThreadsController = require('./controllers/hotTrendThreadsController');
const hotTrendTopicsController = require('./controllers/hotTrendTopicsController');
const sendEmailsController = require('./controllers/sendEmailsController');


router.get('/hot-trend-threads', hotTrendThreadsController);
router.get('/hot-trend-topics', hotTrendTopicsController);
router.post('/send-emails', sendEmailsController);


module.exports = router;
