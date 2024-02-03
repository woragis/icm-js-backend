import { Request, Response } from "express";

const sendReport = (req: Request, res: Response) => {
  res.send("hi");
};

export { sendReport };
