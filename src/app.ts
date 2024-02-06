import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();

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

app.get("/", (req: Request, res: Response) => {
  res.send("hi");
});

export default app;
