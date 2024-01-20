const express = require("express");
const router = express.Router();

const dataStatisticsController = require("../controllers/datastatistic");

router.get("/data-statistics", dataStatisticsController);

module.exports = router;
