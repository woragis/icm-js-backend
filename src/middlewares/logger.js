"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger = function (req, res, next) {
    console.log(req.method, req.url, req.body);
    next();
};
exports.default = logger;
