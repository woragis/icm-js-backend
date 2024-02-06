import { Router } from "express";
import { sendReport } from "../controllers/report";
const router = Router();

router.route("/").post(sendReport);

export default router;
