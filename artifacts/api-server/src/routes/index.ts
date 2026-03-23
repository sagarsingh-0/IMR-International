import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import enquiryRouter from "./enquiry";
import chatRouter from "./chat";
import consentRouter from "./consent";
import eventsRouter from "./events";
import analyticsRouter from "./analytics";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/enquiry", enquiryRouter);
router.use("/chat", chatRouter);

// Analytics module — consent-based, privacy-first
router.use("/consent", consentRouter);
router.use("/events", eventsRouter);
router.use("/analytics", analyticsRouter);

// Admin auth
router.use("/admin", adminRouter);

export default router;
