import { Router } from "express";
import { sendReport } from "../controllers/report";
const router = Router();

router.route("/report").post(sendReport);

export default router;
