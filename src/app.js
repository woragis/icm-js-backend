"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, PATCH, DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
var logger_1 = require("./middlewares/logger");
app.use(logger_1.default);
var contrib_1 = require("./routes/contrib");
var report_1 = require("./routes/report");
var auth_1 = require("./routes/auth");
app.use("/", contrib_1.default);
app.use("/report", report_1.default);
app.use("/auth", auth_1.default);
app.get("/", function (req, res) {
    res.send("hi");
});
exports.default = app;
