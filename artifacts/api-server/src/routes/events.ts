import { Router } from "express";
import { createHash } from "crypto";
import { pool } from "@workspace/db";

const router = Router();

function hashSessionId(rawId: string): string {
  return createHash("sha256").update(rawId).digest("hex");
}

// POST /api/events — receive and store an anonymised analytics event
router.post("/", async (req, res) => {
  try {
    const { sessionId, eventType, page, element } = req.body;

    if (!sessionId || !eventType || !page) {
      return res.status(400).json({ error: "sessionId, eventType, and page are required" });
    }

    const hashedSessionId = hashSessionId(String(sessionId));

    await pool.query(
      `INSERT INTO analytics_events (hashed_session_id, event_type, page, element)
       VALUES ($1, $2, $3, $4)`,
      [hashedSessionId, eventType, page, element ?? null]
    );

    return res.json({ success: true });
  } catch (err) {
    console.error("Event tracking error:", err);
    return res.status(500).json({ error: "Failed to record event" });
  }
});

export default router;
