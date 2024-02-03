import { Router } from "express";
import { sendContrib } from "../controllers/contrib";
const router = Router();

router.route("/").post(sendContrib);

export default router;
