const express = require("express");
const { sendContrib } = require("../controllers/contrib");
const router = express.Router();

router.route("/").post(sendContrib);

module.exports = router;
