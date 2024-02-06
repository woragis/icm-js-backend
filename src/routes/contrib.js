"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var contrib_1 = require("../controllers/contrib");
var router = (0, express_1.Router)();
router.route("/").post(contrib_1.sendContrib);
exports.default = router;
