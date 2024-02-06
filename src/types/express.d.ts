import "express";
import { Session } from "express-session";
/// <reference path="express-session.d.ts" />

declare module "express" {
  interface Request {
    session: Session;
  }
}
