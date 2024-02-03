import { Router } from "express";
import { login, logout, register } from "../controllers/auth";
const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

export default router;
