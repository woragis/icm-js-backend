const express = require("express");
const { sendReport } = require("../controllers/report");
const router = express.Router();

router.route("/").post(sendReport);

module.exports = router;
