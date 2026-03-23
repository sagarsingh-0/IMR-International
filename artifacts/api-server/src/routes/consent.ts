import { Router } from "express";
import { pool } from "@workspace/db";

const router = Router();

// POST /api/consent — log consent decision
router.post("/", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["accepted", "rejected", "withdrawn"].includes(status)) {
      return res.status(400).json({ error: "Invalid consent status" });
    }

    const ip = req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim()
      ?? req.socket.remoteAddress
      ?? null;

    await pool.query(
      "INSERT INTO consent_logs (status, ip_address) VALUES ($1, $2)",
      [status, ip]
    );

    return res.json({ success: true });
  } catch (err) {
    console.error("Consent log error:", err);
    return res.status(500).json({ error: "Failed to log consent" });
  }
});

export default router;
