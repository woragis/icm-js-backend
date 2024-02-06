import { Router } from "express";
import { testEmail, register, login, logout } from "../controllers/auth";
const router = Router();

router.route("/test-email").post(testEmail);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

export default router;
