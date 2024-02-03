import express, { Application, Request, Response } from "express";
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import contribRoutes from "./routes/contrib";
import reportRoutes from "./routes/contrib";

app.use(contribRoutes);
app.use(reportRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("hi");
});

export default app;
