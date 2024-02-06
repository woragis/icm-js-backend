const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, PATCH, DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const logger = require("./middlewares/logger");

app.use(logger);

const contribRoutes = require("./routes/contrib");
const reportRoutes = require("./routes/report");
const authRoutes = require("./routes/auth");

app.use("/", contribRoutes);
app.use("/report", reportRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("hi");
});

module.exports = app;
