import { Request, Response } from "express";

const sendContrib = (req: Request, res: Response) => {
  res.json({ message: "Contribuicao recebida" });
};

export { sendContrib };
