import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import {
  Users, Eye, Clock, TrendingUp, TrendingDown, ArrowLeft,
  Download, RefreshCw, Shield, BarChart2, Activity, Star, Database,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const BASE_URL = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";

type Period = "daily" | "weekly" | "monthly";

interface AnalyticsData {
  totalVisits: number;
  uniqueSessions: number;
  avgSessionDuration?: number;
  topPages: { page: string; count: number }[];
  eventStats: { eventType: string; count: number }[];
  trend: { label: string; visits: number }[];
}

interface SummaryData extends AnalyticsData {
  avgSessionDuration: number;
}

interface InterestsData {
  mostVisited: { page: string; count: number }[];
  mostClicked: { element: string; count: number }[];
  highEngagement: { page: string; uniqueUsers: number; totalEvents: number }[];
}

const CHART_COLORS = ["#1e3a5f", "#f59e0b", "#10b981", "#8b5cf6", "#f97316", "#06b6d4", "#e11d48", "#64748b"];
const PIE_COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#8b5cf6", "#f97316", "#06b6d4", "#e11d48"];

// ── Format page path for display
function formatPage(page: string): string {
  if (!page || page === "/") return "Home";
  return page.replace(/\//g, " › ").replace(/^›\s/, "").replace(/-/g, " ")
    .split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

// ── Stat card
function StatCard({
  icon: Icon, label, value, sub, color, trend,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  trend?: "up" | "down" | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 relative overflow-hidden`}
    >
      <div className={`absolute top-0 left-0 right-0 h-1 ${color}`} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">{label}</p>
          <p className="text-2xl font-extrabold text-foreground">{value}</p>
          {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl ${color.replace("bg-", "bg-").replace("-600", "-100").replace("-500", "-100")} flex items-center justify-center`}
          style={{ background: color.includes("blue") ? "#eff6ff" : color.includes("amber") ? "#fef3c7" : color.includes("emerald") ? "#ecfdf5" : "#f5f3ff" }}>
          <Icon className={`w-5 h-5 ${color.includes("blue") ? "text-blue-600" : color.includes("amber") ? "text-amber-600" : color.includes("emerald") ? "text-emerald-600" : "text-violet-600"}`} />
        </div>
      </div>
      {trend && (
        <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend === "up" ? "text-emerald-600" : "text-rose-500"}`}>
          {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend === "up" ? "Growing" : "Declining"}
        </div>
      )}
    </motion.div>
  );
}

export default function AdminAnalytics() {
  const [, setLocation] = useLocation();
  const [period, setPeriod] = useState<Period>("weekly");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [interests, setInterests] = useState<InterestsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Guard: verify admin session on mount
  useEffect(() => {
    fetch(`${BASE_URL}/api/admin/me`, { credentials: "include" })
      .then(res => {
        if (!res.ok) setLocation("/admin/login");
        else setAuthChecked(true);
      })
      .catch(() => setLocation("/admin/login"));
  }, []);

  const handleLogout = async () => {
    await fetch(`${BASE_URL}/api/admin/logout`, { method: "POST", credentials: "include" });
    setLocation("/admin/login");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [periodRes, summaryRes, interestRes] = await Promise.all([
        fetch(`${BASE_URL}/api/analytics/${period}`),
        fetch(`${BASE_URL}/api/analytics/summary`),
        fetch(`${BASE_URL}/api/analytics/interests`),
      ]);
      if (periodRes.ok) setData(await periodRes.json());
      if (summaryRes.ok) setSummary(await summaryRes.json());
      if (interestRes.ok) setInterests(await interestRes.json());
    } catch (e) {
      console.error("Analytics fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (authChecked) fetchData(); }, [period, refreshKey, authChecked]);

  const exportCSV = () => {
    if (!data?.topPages) return;
    const rows = [["Page", "Visits"], ...data.topPages.map(p => [p.page, p.count])];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `imr-analytics-${period}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const PERIOD_LABELS: Record<Period, string> = { daily: "Today", weekly: "Last 7 Days", monthly: "Last 30 Days" };

  // Show blank while checking auth (redirect handled in useEffect)
  if (!authChecked) return null;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <TopBar />
      <Navigation />

      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1e3a5f] via-[#1a4f8a] to-[#2563eb] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <button
                  onClick={() => setLocation("/")}
                  className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs mb-3 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to site
                </button>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
                    <BarChart2 className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-2xl font-display font-bold">Analytics Dashboard</h1>
                </div>
                <p className="text-white/60 text-sm">Privacy-first, consent-based user behaviour insights</p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Period tabs */}
                <div className="flex bg-white/10 rounded-xl p-1 border border-white/15">
                  {(["daily", "weekly", "monthly"] as Period[]).map(p => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${period === p ? "bg-white text-primary shadow-sm" : "text-white/70 hover:text-white"}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setRefreshKey(k => k + 1)}
                  className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
                  title="Refresh"
                >
                  <RefreshCw className={`w-4 h-4 text-white ${loading ? "animate-spin" : ""}`} />
                </button>
                <button
                  onClick={exportCSV}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl text-sm font-bold transition-all shadow-lg"
                >
                  <Download className="w-4 h-4" /> Export CSV
                </button>
                <button
                  onClick={() => setLocation("/admin/database")}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-sm font-bold transition-all"
                >
                  <Database className="w-4 h-4" /> Database
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-rose-500 border border-white/20 hover:border-rose-400 text-white rounded-xl text-sm font-bold transition-all"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Privacy badge */}
            <div className="mt-4 flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl px-4 py-2 w-fit">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-white/80 text-xs">All data is anonymised · No PII stored · Consent-based tracking only</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <RefreshCw className="w-10 h-10 text-primary animate-spin mx-auto mb-3" />
                <p className="text-muted-foreground">Loading analytics…</p>
              </div>
            </div>
          ) : (
            <>
              {/* ── Summary Stats ── */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-4 h-4 text-primary" />
                  <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide">All-Time Summary</h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard icon={Eye} label="Total Visits" value={summary?.totalVisits.toLocaleString() ?? "0"}
                    color="bg-blue-600" trend={summary?.totalVisits ? "up" : null} />
                  <StatCard icon={Users} label="Unique Sessions" value={summary?.uniqueSessions.toLocaleString() ?? "0"}
                    color="bg-amber-500" />
                  <StatCard icon={Clock} label="Avg Session" value={`${summary?.avgSessionDuration ?? 0}s`}
                    sub="per visitor" color="bg-emerald-600" />
                  <StatCard icon={Star} label="Top Page" value={summary?.topPages?.[0]?.page ? formatPage(summary.topPages[0].page) : "—"}
                    sub={summary?.topPages?.[0]?.count ? `${summary.topPages[0].count} visits` : ""} color="bg-violet-600" />
                </div>
              </div>

              {/* Period stats */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide">{PERIOD_LABELS[period]}</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <StatCard icon={Eye} label="Period Visits" value={data?.totalVisits.toLocaleString() ?? "0"}
                    color="bg-blue-600" />
                  <StatCard icon={Users} label="Unique Sessions" value={data?.uniqueSessions.toLocaleString() ?? "0"}
                    color="bg-amber-500" />
                </div>
              </div>

              {/* ── Charts grid ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

                {/* Line chart — traffic over time */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
                  <h3 className="font-bold text-foreground mb-5 flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full bg-blue-500" />
                    Traffic Over Time
                  </h3>
                  {data?.trend?.length ? (
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart data={data.trend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748b" }} />
                        <YAxis tick={{ fontSize: 11, fill: "#64748b" }} allowDecimals={false} />
                        <Tooltip
                          contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12 }}
                          labelStyle={{ fontWeight: "bold" }}
                        />
                        <Line type="monotone" dataKey="visits" stroke="#1e3a5f" strokeWidth={2.5}
                          dot={{ fill: "#1e3a5f", r: 4 }} activeDot={{ r: 6, fill: "#f59e0b" }} name="Visits" />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[220px] flex items-center justify-center text-slate-400 text-sm">
                      No data yet — traffic will appear here once users visit
                    </div>
                  )}
                </div>

                {/* Bar chart — top pages */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
                  <h3 className="font-bold text-foreground mb-5 flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    Top Pages
                  </h3>
                  {data?.topPages?.length ? (
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={data.topPages.slice(0, 6).map(p => ({ ...p, page: formatPage(p.page) }))}
                        layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                        <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b" }} allowDecimals={false} />
                        <YAxis dataKey="page" type="category" tick={{ fontSize: 10, fill: "#64748b" }} width={90} />
                        <Tooltip
                          contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12 }}
                        />
                        <Bar dataKey="count" name="Visits" radius={[0, 6, 6, 0]}>
                          {data.topPages.slice(0, 6).map((_, i) => (
                            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[220px] flex items-center justify-center text-slate-400 text-sm">
                      No page view data yet
                    </div>
                  )}
                </div>

                {/* Pie chart — event distribution */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
                  <h3 className="font-bold text-foreground mb-5 flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    Event Distribution
                  </h3>
                  {data?.eventStats?.length ? (
                    <div className="flex items-center gap-4">
                      <ResponsiveContainer width="55%" height={200}>
                        <PieChart>
                          <Pie
                            data={data.eventStats}
                            dataKey="count"
                            nameKey="eventType"
                            cx="50%" cy="50%"
                            innerRadius={50} outerRadius={80}
                            paddingAngle={3}
                          >
                            {data.eventStats.map((_, i) => (
                              <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12 }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex-1 space-y-2">
                        {data.eventStats.map((e, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                            <span className="text-xs text-slate-600 capitalize flex-1">{e.eventType.replace("_", " ")}</span>
                            <span className="text-xs font-bold text-foreground">{e.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-[200px] flex items-center justify-center text-slate-400 text-sm">
                      No event data yet
                    </div>
                  )}
                </div>

                {/* Interest signals */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
                  <h3 className="font-bold text-foreground mb-5 flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full bg-violet-500" />
                    User Interest Signals
                  </h3>
                  <div className="space-y-2">
                    {interests?.mostVisited?.length ? (
                      interests.mostVisited.slice(0, 6).map((p, i) => {
                        const max = interests.mostVisited[0]?.count || 1;
                        const pct = Math.round((p.count / max) * 100);
                        return (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-medium text-foreground">{formatPage(p.page)}</span>
                              <span className="text-xs text-slate-500">{p.count} visits</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-1.5">
                              <div
                                className="h-1.5 rounded-full transition-all duration-500"
                                style={{ width: `${pct}%`, background: CHART_COLORS[i % CHART_COLORS.length] }}
                              />
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="h-[160px] flex items-center justify-center text-slate-400 text-sm">
                        Interests will appear as users browse the site
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ── High Engagement Pages ── */}
              {interests?.highEngagement?.length ? (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
                  <h3 className="font-bold text-foreground mb-5 flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    High Engagement Pages
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="text-left py-2 px-3 text-xs text-slate-500 font-semibold uppercase tracking-wide">Page</th>
                          <th className="text-right py-2 px-3 text-xs text-slate-500 font-semibold uppercase tracking-wide">Unique Users</th>
                          <th className="text-right py-2 px-3 text-xs text-slate-500 font-semibold uppercase tracking-wide">Total Events</th>
                          <th className="text-right py-2 px-3 text-xs text-slate-500 font-semibold uppercase tracking-wide">Engagement</th>
                        </tr>
                      </thead>
                      <tbody>
                        {interests.highEngagement.map((row, i) => {
                          const evPerUser = row.uniqueUsers > 0
                            ? (row.totalEvents / row.uniqueUsers).toFixed(1)
                            : "0";
                          return (
                            <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                              <td className="py-2.5 px-3 font-medium text-foreground">{formatPage(row.page)}</td>
                              <td className="py-2.5 px-3 text-right text-slate-600">{row.uniqueUsers}</td>
                              <td className="py-2.5 px-3 text-right text-slate-600">{row.totalEvents}</td>
                              <td className="py-2.5 px-3 text-right">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                  {evPerUser}x
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}

              {/* ── Empty state note ── */}
              {!data?.totalVisits && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center"
                >
                  <Shield className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                  <h3 className="font-bold text-blue-800 mb-1">No data yet</h3>
                  <p className="text-blue-600 text-sm">
                    Analytics will appear here once visitors accept the consent banner and browse the site.
                    Data is fully anonymous — no personal information is ever stored.
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
