"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
const app = express_1();
// var app = (0, express_1.default)();
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET, POST, PUT, PATCH, DELETE",
//     credentials: true,
//     optionsSuccessStatus: 204,
//   })
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// import logger from "./middlewares/logger";
// app.use(logger);
// import contribRoutes from "./routes/contrib";
// import reportRoutes from "./routes/report";
// import authRoutes from "./routes/auth";
// app.use("/", contribRoutes);
// app.use("/report", reportRoutes);
// app.use("/auth", authRoutes);
app.get("/", function (req, res) {
  res.send("hi");
});
exports.default = app;
