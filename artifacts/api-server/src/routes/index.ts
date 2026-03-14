import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import enquiryRouter from "./enquiry";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/enquiry", enquiryRouter);

export default router;
