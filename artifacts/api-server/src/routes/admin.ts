import { Router, type Request, type Response } from "express";
import { pool } from "@workspace/db";

const router = Router();

declare module "express-session" {
  interface SessionData {
    isAdmin?: boolean;
  }
}

const ADMIN_USERNAME = process.env["ADMIN_USERNAME"] ?? "imradmin";
const ADMIN_PASSWORD = process.env["ADMIN_PASSWORD"] ?? "IMR@Analytics2024";

// ── Auth middleware for protected routes ─────────────────────────────────────
function requireAdmin(req: Request, res: Response, next: () => void) {
  if (!req.session.isAdmin) {
    res.status(401).json({ error: "Not authenticated as admin" });
    return;
  }
  next();
}

// Allowed tables + columns to omit (sensitive fields)
// All tables are READ-ONLY via this viewer — no deletion or editing allowed.
const ALLOWED_TABLES: Record<string, { omit?: string[] }> = {
  users:            { omit: ["password_hash"] },
  enquiries:        {},
  analytics_events: {},
  consent_logs:     {},
  visitor_logs:     {},
  conversations:    {},
  messages:         {},
};

// POST /api/admin/login
router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body as { username: string; password: string };
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    req.session.isAdmin = true;
    req.session.save(() => {
      res.json({ success: true, message: "Admin login successful" });
    });
    return;
  }
  res.status(401).json({ error: "Invalid admin credentials" });
});

// GET /api/admin/me
router.get("/me", (req: Request, res: Response) => {
  if (req.session.isAdmin) { res.json({ isAdmin: true }); return; }
  res.status(401).json({ error: "Not authenticated as admin" });
});

// POST /api/admin/logout
router.post("/logout", (req: Request, res: Response) => {
  req.session.isAdmin = false;
  req.session.save(() => res.json({ success: true }));
});

// GET /api/admin/db/tables — list all tables with row counts
router.get("/db/tables", requireAdmin, async (_req, res) => {
  try {
    const tableNames = Object.keys(ALLOWED_TABLES);
    const counts = await Promise.all(
      tableNames.map(async (t) => {
        const { rows } = await pool.query(`SELECT COUNT(*) AS count FROM ${t}`);
        return { table: t, rows: Number(rows[0]?.count ?? 0) };
      })
    );

    // Get column info for each table
    const columns = await Promise.all(
      tableNames.map(async (t) => {
        const { rows } = await pool.query(`
          SELECT column_name, data_type, is_nullable
          FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = $1
          ORDER BY ordinal_position
        `, [t]);
        const omit = ALLOWED_TABLES[t]?.omit ?? [];
        return {
          table: t,
          columns: rows
            .filter(r => !omit.includes(r.column_name))
            .map(r => ({ name: r.column_name, type: r.data_type, nullable: r.is_nullable === "YES" })),
        };
      })
    );

    const colMap = Object.fromEntries(columns.map(c => [c.table, c.columns]));
    return res.json(counts.map(c => ({ ...c, columns: colMap[c.table] ?? [] })));
  } catch (err) {
    console.error("DB tables error:", err);
    return res.status(500).json({ error: "Failed to fetch tables" });
  }
});

// GET /api/admin/db/:table — paginated rows
router.get("/db/:table", requireAdmin, async (req, res) => {
  const { table } = req.params;
  if (!ALLOWED_TABLES[table]) {
    return res.status(403).json({ error: "Access to this table is not allowed" });
  }

  const page = Math.max(1, parseInt(String(req.query.page ?? "1"), 10));
  const limit = Math.min(50, Math.max(1, parseInt(String(req.query.limit ?? "20"), 10)));
  const offset = (page - 1) * limit;
  const search = String(req.query.search ?? "").trim();

  const omit = ALLOWED_TABLES[table]?.omit ?? [];

  try {
    // Build SELECT columns list
    const { rows: colRows } = await pool.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1
      ORDER BY ordinal_position
    `, [table]);
    const cols = colRows
      .map(r => r.column_name as string)
      .filter(c => !omit.includes(c));
    const selectCols = cols.map(c => `"${c}"`).join(", ");

    let countQuery = `SELECT COUNT(*) AS count FROM ${table}`;
    let dataQuery = `SELECT ${selectCols} FROM ${table}`;
    const params: unknown[] = [];

    // Basic search across text columns
    if (search) {
      const textCols = colRows
        .filter(r => !omit.includes(r.column_name))
        .map(r => r.column_name as string);
      if (textCols.length > 0) {
        const conditions = textCols.map((_, i) => `CAST("${textCols[i]}" AS TEXT) ILIKE $${i + 1}`).join(" OR ");
        const searchPattern = `%${search}%`;
        const searchParams = textCols.map(() => searchPattern);
        countQuery += ` WHERE ${conditions}`;
        dataQuery += ` WHERE ${conditions}`;
        params.push(...searchParams);
      }
    }

    dataQuery += ` ORDER BY 1 DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;

    const [countResult, dataResult] = await Promise.all([
      pool.query(countQuery, params),
      pool.query(dataQuery, [...params, limit, offset]),
    ]);

    const total = Number(countResult.rows[0]?.count ?? 0);

    return res.json({
      table,
      columns: cols,
      rows: dataResult.rows,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(`DB table ${table} error:`, err);
    return res.status(500).json({ error: "Failed to fetch table data" });
  }
});

// DELETE is intentionally disabled — all data is immutable via this API.
// No route exists for deletion to protect the integrity of visitor records.

export default router;
