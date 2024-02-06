"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var report_1 = require("../controllers/report");
var router = (0, express_1.Router)();
router.route("/").post(report_1.sendReport);
exports.default = router;
