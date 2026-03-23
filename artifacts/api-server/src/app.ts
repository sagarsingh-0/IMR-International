import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import crypto from "crypto";
import { pool } from "@workspace/db";
import router from "./routes";

const PgSession = connectPgSimple(session);

const app: Express = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new PgSession({
      pool,
      tableName: "sessions",
      createTableIfMissing: true,
    }),
    secret: process.env["SESSION_SECRET"] ?? "imr-international-secret-key-2024",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env["NODE_ENV"] === "production",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

// ── Visitor logging middleware ──────────────────────────────────────────────
// Logs every page-level request (from the frontend tracker) into visitor_logs.
// No personal information is stored — IP is one-way hashed, no names or emails.
app.use("/api/visitor-log", express.json(), async (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== "POST") { next(); return; }

  try {
    const { page, referrer } = req.body as { page?: string; referrer?: string };

    const rawIp =
      String(req.headers["x-forwarded-for"] ?? "").split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      "";
    const ipHash = rawIp
      ? crypto.createHash("sha256").update(rawIp).digest("hex").slice(0, 16)
      : null;

    const ua = String(req.headers["user-agent"] ?? "").slice(0, 300);

    // Accept-Language header gives rough country hint without storing IP
    const langHint = String(req.headers["accept-language"] ?? "").slice(0, 40) || null;

    await pool.query(
      `INSERT INTO visitor_logs (page, referrer, user_agent, ip_hash, country_hint)
       VALUES ($1, $2, $3, $4, $5)`,
      [page ?? "/", referrer ?? null, ua || null, ipHash, langHint]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error("Visitor log error:", err);
    res.json({ ok: false });
  }
});

app.use("/api", router);

export default app;
