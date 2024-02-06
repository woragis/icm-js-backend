"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../controllers/auth");
var router = (0, express_1.Router)();
router.route("/test-email").post(auth_1.testEmail);
router.route("/register").post(auth_1.register);
router.route("/login").post(auth_1.login);
router.route("/logout").post(auth_1.logout);
exports.default = router;
