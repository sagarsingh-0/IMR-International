import { Router } from "express";
import { pool } from "@workspace/db";

const router = Router();

// Helper — run a query and return rows
async function query(sql: string, params: unknown[] = []) {
  const { rows } = await pool.query(sql, params);
  return rows;
}

// GET /api/analytics/summary — overall totals
router.get("/summary", async (_req, res) => {
  try {
    const [totals] = await query(`
      SELECT
        COUNT(*) AS total_visits,
        COUNT(DISTINCT hashed_session_id) AS unique_sessions
      FROM analytics_events
      WHERE event_type = 'page_view'
    `);

    const [durationRow] = await query(`
      SELECT COALESCE(AVG(session_duration_s), 0) AS avg_duration
      FROM (
        SELECT
          hashed_session_id,
          EXTRACT(EPOCH FROM (MAX(timestamp) - MIN(timestamp))) AS session_duration_s
        FROM analytics_events
        GROUP BY hashed_session_id
        HAVING COUNT(*) > 1
      ) t
    `);

    const topPages = await query(`
      SELECT page, COUNT(*) AS count
      FROM analytics_events
      WHERE event_type = 'page_view'
      GROUP BY page
      ORDER BY count DESC
      LIMIT 10
    `);

    const eventStats = await query(`
      SELECT event_type, COUNT(*) AS count
      FROM analytics_events
      GROUP BY event_type
      ORDER BY count DESC
    `);

    return res.json({
      totalVisits: Number(totals?.total_visits ?? 0),
      uniqueSessions: Number(totals?.unique_sessions ?? 0),
      avgSessionDuration: Number(Number(durationRow?.avg_duration ?? 0).toFixed(1)),
      topPages: topPages.map(r => ({ page: r.page, count: Number(r.count) })),
      eventStats: eventStats.map(r => ({ eventType: r.event_type, count: Number(r.count) })),
    });
  } catch (err) {
    console.error("Analytics summary error:", err);
    return res.status(500).json({ error: "Failed to fetch summary" });
  }
});

// GET /api/analytics/daily — today's data
router.get("/daily", async (_req, res) => {
  try {
    const [totals] = await query(`
      SELECT
        COUNT(*) AS total_visits,
        COUNT(DISTINCT hashed_session_id) AS unique_sessions
      FROM analytics_events
      WHERE event_type = 'page_view'
        AND timestamp >= CURRENT_DATE
    `);

    const topPages = await query(`
      SELECT page, COUNT(*) AS count
      FROM analytics_events
      WHERE event_type = 'page_view'
        AND timestamp >= CURRENT_DATE
      GROUP BY page
      ORDER BY count DESC
      LIMIT 10
    `);

    const eventStats = await query(`
      SELECT event_type, COUNT(*) AS count
      FROM analytics_events
      WHERE timestamp >= CURRENT_DATE
      GROUP BY event_type
      ORDER BY count DESC
    `);

    const trend = await query(`
      SELECT
        TO_CHAR(timestamp, 'HH24:00') AS label,
        COUNT(*) AS visits
      FROM analytics_events
      WHERE event_type = 'page_view'
        AND timestamp >= CURRENT_DATE
      GROUP BY label
      ORDER BY label
    `);

    return res.json({
      totalVisits: Number(totals?.total_visits ?? 0),
      uniqueSessions: Number(totals?.unique_sessions ?? 0),
      topPages: topPages.map(r => ({ page: r.page, count: Number(r.count) })),
      eventStats: eventStats.map(r => ({ eventType: r.event_type, count: Number(r.count) })),
      trend: trend.map(r => ({ label: r.label, visits: Number(r.visits) })),
    });
  } catch (err) {
    console.error("Daily analytics error:", err);
    return res.status(500).json({ error: "Failed to fetch daily analytics" });
  }
});

// GET /api/analytics/weekly — last 7 days
router.get("/weekly", async (_req, res) => {
  try {
    const [totals] = await query(`
      SELECT
        COUNT(*) AS total_visits,
        COUNT(DISTINCT hashed_session_id) AS unique_sessions
      FROM analytics_events
      WHERE event_type = 'page_view'
        AND timestamp >= NOW() - INTERVAL '7 days'
    `);

    const topPages = await query(`
      SELECT page, COUNT(*) AS count
      FROM analytics_events
      WHERE event_type = 'page_view'
        AND timestamp >= NOW() - INTERVAL '7 days'
      GROUP BY page
      ORDER BY count DESC
      LIMIT 10
    `);

    const eventStats = await query(`
      SELECT event_type, COUNT(*) AS count
      FROM analytics_events
      WHERE timestamp >= NOW() - INTERVAL '7 days'
      GROUP BY event_type
      ORDER BY count DESC
    `);

    const trend = await query(`
      SELECT
        TO_CHAR(timestamp, 'Mon DD') AS label,
        COUNT(*) AS visits
      FROM analytics_events
      WHERE event_type = 'page_view'
        AND timestamp >= NOW() - INTERVAL '7 days'
      GROUP BY label, DATE(timestamp)
      ORDER BY DATE(timestamp)
    `);

    return res.json({
      totalVisits: Number(totals?.total_visits ?? 0),
      uniqueSessions: Number(totals?.unique_sessions ?? 0),
      topPages: topPages.map(r => ({ page: r.page, count: Number(r.count) })),
      eventStats: eventStats.map(r => ({ eventType: r.event_type, count: Number(r.count) })),
      trend: trend.map(r => ({ label: r.label, visits: Number(r.visits) })),
    });
  } catch (err) {
    console.error("Weekly analytics error:", err);
    return res.status(500).json({ error: "Failed to fetch weekly analytics" });
  }
});

// GET /api/analytics/monthly — last 30 days
router.get("/monthly", async (_req, res) => {
  try {
    const [totals] = await query(`
      SELECT
        COUNT(*) AS total_visits,
        COUNT(DISTINCT hashed_session_id) AS unique_sessions
      FROM analytics_events
      WHERE event_type = 'page_view'
        AND timestamp >= NOW() - INTERVAL '30 days'
    `);

    const topPages = await query(`
      SELECT page, COUNT(*) AS count
      FROM analytics_events
      WHERE event_type = 'page_view'
        AND timestamp >= NOW() - INTERVAL '30 days'
      GROUP BY page
      ORDER BY count DESC
      LIMIT 10
    `);

    const eventStats = await query(`
      SELECT event_type, COUNT(*) AS count
      FROM analytics_events
      WHERE timestamp >= NOW() - INTERVAL '30 days'
      GROUP BY event_type
      ORDER BY count DESC
    `);

    const trend = await query(`
      SELECT
        TO_CHAR(DATE_TRUNC('week', timestamp), 'Mon DD') AS label,
        COUNT(*) AS visits
      FROM analytics_events
      WHERE event_type = 'page_view'
        AND timestamp >= NOW() - INTERVAL '30 days'
      GROUP BY DATE_TRUNC('week', timestamp)
      ORDER BY DATE_TRUNC('week', timestamp)
    `);

    return res.json({
      totalVisits: Number(totals?.total_visits ?? 0),
      uniqueSessions: Number(totals?.unique_sessions ?? 0),
      topPages: topPages.map(r => ({ page: r.page, count: Number(r.count) })),
      eventStats: eventStats.map(r => ({ eventType: r.event_type, count: Number(r.count) })),
      trend: trend.map(r => ({ label: r.label, visits: Number(r.visits) })),
    });
  } catch (err) {
    console.error("Monthly analytics error:", err);
    return res.status(500).json({ error: "Failed to fetch monthly analytics" });
  }
});

// GET /api/analytics/interests — user interest signals
router.get("/interests", async (_req, res) => {
  try {
    const mostVisited = await query(`
      SELECT page, COUNT(*) AS count
      FROM analytics_events
      WHERE event_type = 'page_view'
      GROUP BY page
      ORDER BY count DESC
      LIMIT 8
    `);

    const mostClicked = await query(`
      SELECT element, COUNT(*) AS count
      FROM analytics_events
      WHERE event_type = 'click' AND element IS NOT NULL
      GROUP BY element
      ORDER BY count DESC
      LIMIT 8
    `);

    const highEngagement = await query(`
      SELECT
        page,
        COUNT(DISTINCT hashed_session_id) AS unique_users,
        COUNT(*) AS total_events
      FROM analytics_events
      GROUP BY page
      ORDER BY total_events DESC
      LIMIT 8
    `);

    return res.json({
      mostVisited: mostVisited.map(r => ({ page: r.page, count: Number(r.count) })),
      mostClicked: mostClicked.map(r => ({ element: r.element, count: Number(r.count) })),
      highEngagement: highEngagement.map(r => ({
        page: r.page,
        uniqueUsers: Number(r.unique_users),
        totalEvents: Number(r.total_events),
      })),
    });
  } catch (err) {
    console.error("Interests analytics error:", err);
    return res.status(500).json({ error: "Failed to fetch interest data" });
  }
});

export default router;
