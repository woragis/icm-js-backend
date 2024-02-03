import { Request, Response } from "express";

const register = (req: Request, res: Response) => {
  res.send("register");
};
const login = (req: Request, res: Response) => {};
const logout = (req: Request, res: Response) => {};

export { register, login, logout };
