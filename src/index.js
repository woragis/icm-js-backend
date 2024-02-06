"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var port = process.env.PORT || 3000;
app_1.default.listen(port, function () {
    console.log("Server running on port https://localhost:" + port);
});
