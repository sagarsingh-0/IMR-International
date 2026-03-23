import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database, Table2, Search, RefreshCw, ChevronLeft, ChevronRight,
  Trash2, ArrowLeft, BarChart2, AlertCircle, Download, Shield, Eye,
  Users, MessageSquare, FileText, Activity, ClipboardList, Hash,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Navigation } from "@/components/Navigation";

const BASE_URL = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";

interface TableMeta {
  table: string;
  rows: number;
  columns: { name: string; type: string; nullable: boolean }[];
}

interface TableData {
  table: string;
  columns: string[];
  rows: Record<string, unknown>[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// Table icon + color theme map
const TABLE_THEME: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string; light: string }> = {
  users:            { icon: Users,        color: "text-blue-600",   bg: "bg-blue-600",   light: "bg-blue-50 border-blue-200"   },
  enquiries:        { icon: ClipboardList,color: "text-amber-600",  bg: "bg-amber-500",  light: "bg-amber-50 border-amber-200"  },
  analytics_events: { icon: Activity,     color: "text-emerald-600",bg: "bg-emerald-600",light: "bg-emerald-50 border-emerald-200"},
  consent_logs:     { icon: Shield,       color: "text-violet-600", bg: "bg-violet-600", light: "bg-violet-50 border-violet-200" },
  conversations:    { icon: MessageSquare,color: "text-cyan-600",   bg: "bg-cyan-600",   light: "bg-cyan-50 border-cyan-200"    },
  messages:         { icon: FileText,     color: "text-rose-600",   bg: "bg-rose-600",   light: "bg-rose-50 border-rose-200"    },
};

function formatCell(val: unknown): string {
  if (val === null || val === undefined) return "—";
  if (typeof val === "boolean") return val ? "✓ Yes" : "✗ No";
  const str = String(val);
  if (str.length > 80) return str.slice(0, 77) + "…";
  return str;
}

function isSensitive(col: string) {
  return ["password", "token", "secret", "hash"].some(k => col.toLowerCase().includes(k));
}

export default function AdminDatabase() {
  const [, setLocation] = useLocation();
  const [authChecked, setAuthChecked] = useState(false);
  const [tables, setTables] = useState<TableMeta[]>([]);
  const [activeTable, setActiveTable] = useState<string>("");
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [loading, setLoading] = useState(false);
  const [tablesLoading, setTablesLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Auth guard
  useEffect(() => {
    fetch(`${BASE_URL}/api/admin/me`, { credentials: "include" })
      .then(r => { if (!r.ok) setLocation("/admin/login"); else setAuthChecked(true); })
      .catch(() => setLocation("/admin/login"));
  }, []);

  // Load table metadata
  useEffect(() => {
    if (!authChecked) return;
    setTablesLoading(true);
    fetch(`${BASE_URL}/api/admin/db/tables`, { credentials: "include" })
      .then(r => r.json())
      .then((data: TableMeta[]) => {
        setTables(data);
        if (data.length > 0 && !activeTable) setActiveTable(data[0].table);
      })
      .finally(() => setTablesLoading(false));
  }, [authChecked]);

  // Load table rows
  const loadTable = useCallback(async (table: string, pg = 1, q = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(pg), limit: "20" });
      if (q) params.set("search", q);
      const r = await fetch(`${BASE_URL}/api/admin/db/${table}?${params}`, { credentials: "include" });
      if (r.ok) setTableData(await r.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTable) { setPage(1); setSearch(""); loadTable(activeTable, 1, ""); }
  }, [activeTable]);

  const handleSearch = (q: string) => { setSearch(q); setPage(1); loadTable(activeTable, 1, q); };
  const handlePage = (p: number) => { setPage(p); loadTable(activeTable, p, search); };

  const handleDelete = async (id: string) => {
    await fetch(`${BASE_URL}/api/admin/db/${activeTable}/${id}`, { method: "DELETE", credentials: "include" });
    setDeleteConfirm(null);
    loadTable(activeTable, page, search);
    // refresh count
    fetch(`${BASE_URL}/api/admin/db/tables`, { credentials: "include" })
      .then(r => r.json()).then(setTables);
  };

  const exportCSV = () => {
    if (!tableData) return;
    const header = tableData.columns.join(",");
    const body = tableData.rows.map(row =>
      tableData.columns.map(c => {
        const v = String(row[c] ?? "").replace(/"/g, '""');
        return `"${v}"`;
      }).join(",")
    ).join("\n");
    const blob = new Blob([header + "\n" + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `${activeTable}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const activeMeta = tables.find(t => t.table === activeTable);
  const theme = TABLE_THEME[activeTable] ?? { icon: Table2, color: "text-slate-600", bg: "bg-slate-600", light: "bg-slate-50 border-slate-200" };
  const ThemeIcon = theme.icon;

  if (!authChecked) return null;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-100">
      <TopBar />
      <Navigation />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e3a5f] via-[#1a4f8a] to-[#2563eb] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2 text-white/50 text-xs mb-2">
                <button onClick={() => setLocation("/admin/analytics")} className="hover:text-white transition-colors flex items-center gap-1">
                  <BarChart2 className="w-3 h-3" /> Analytics
                </button>
                <span>/</span>
                <span className="text-white/80">Database Viewer</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-display font-bold">Database Viewer</h1>
                  <p className="text-white/55 text-xs">Read · Browse · Export · Delete rows</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setLocation("/admin/analytics")}
                className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-xl text-xs font-semibold transition-all">
                <BarChart2 className="w-3.5 h-3.5" /> Analytics
              </button>
              <button onClick={async () => {
                await fetch(`${BASE_URL}/api/admin/logout`, { method: "POST", credentials: "include" });
                setLocation("/admin/login");
              }} className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-rose-500 border border-white/15 text-white rounded-xl text-xs font-semibold transition-all">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-5 h-full">

          {/* ── Sidebar ── */}
          <aside className="w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden sticky top-6">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tables</p>
              </div>
              {tablesLoading ? (
                <div className="p-4 space-y-2">
                  {[...Array(6)].map((_, i) => <div key={i} className="h-9 bg-slate-100 rounded-lg animate-pulse" />)}
                </div>
              ) : (
                <nav className="p-2 space-y-0.5">
                  {tables.map(t => {
                    const tm = TABLE_THEME[t.table] ?? { icon: Table2, color: "text-slate-600", light: "bg-slate-50 border-slate-200" };
                    const TIcon = tm.icon;
                    const isActive = t.table === activeTable;
                    return (
                      <button key={t.table} onClick={() => setActiveTable(t.table)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all text-sm font-medium ${
                          isActive ? `${tm.light} border ${tm.color} font-bold` : "text-slate-600 hover:bg-slate-50"
                        }`}>
                        <TIcon className={`w-4 h-4 flex-shrink-0 ${isActive ? tm.color : "text-slate-400"}`} />
                        <span className="flex-1 truncate">{t.table.replace(/_/g, " ")}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          isActive ? "bg-white text-slate-600 shadow-sm" : "bg-slate-100 text-slate-500"
                        }`}>{t.rows}</span>
                      </button>
                    );
                  })}
                </nav>
              )}
            </div>
          </aside>

          {/* ── Main panel ── */}
          <div className="flex-1 min-w-0">
            {!tableData ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 h-64 flex items-center justify-center">
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 text-slate-300 animate-spin mx-auto mb-2" />
                  <p className="text-slate-400 text-sm">Loading…</p>
                </div>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

                {/* Table header bar */}
                <div className={`flex items-center justify-between gap-3 p-4 rounded-2xl border mb-4 ${theme.light}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${theme.bg} flex items-center justify-center shadow-sm`}>
                      <ThemeIcon className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-foreground text-sm capitalize">{activeTable.replace(/_/g, " ")}</h2>
                      <p className="text-xs text-slate-500">{tableData.total.toLocaleString()} row{tableData.total !== 1 ? "s" : ""} · {tableData.columns.length} column{tableData.columns.length !== 1 ? "s" : ""}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input
                        value={search}
                        onChange={e => handleSearch(e.target.value)}
                        placeholder="Search rows…"
                        className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary w-44"
                      />
                    </div>
                    <button onClick={() => loadTable(activeTable, page, search)}
                      className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors">
                      <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${loading ? "animate-spin" : ""}`} />
                    </button>
                    <button onClick={exportCSV}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary/90 transition-all">
                      <Download className="w-3.5 h-3.5" /> CSV
                    </button>
                  </div>
                </div>

                {/* Column schema pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {activeMeta?.columns.map(col => (
                    <span key={col.name} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-mono text-slate-600 shadow-sm">
                      <Hash className="w-2.5 h-2.5 text-slate-400" />
                      {col.name}
                      <span className="text-slate-400 font-sans not-italic">{col.type.replace("character varying", "varchar").replace("timestamp with time zone", "timestamptz")}</span>
                    </span>
                  ))}
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                  {tableData.rows.length === 0 ? (
                    <div className="h-48 flex items-center justify-center text-slate-400 text-sm">
                      <div className="text-center">
                        <Eye className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                        {search ? `No rows matching "${search}"` : "No rows in this table yet"}
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            {tableData.columns.map(col => (
                              <th key={col} className="text-left px-4 py-3 font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                                {col}
                              </th>
                            ))}
                            <th className="px-4 py-3 text-slate-400 font-bold uppercase tracking-wide text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <AnimatePresence mode="popLayout">
                            {tableData.rows.map((row, i) => {
                              const rowId = String(row.id ?? i);
                              return (
                                <motion.tr
                                  key={rowId}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors"
                                >
                                  {tableData.columns.map(col => (
                                    <td key={col} className="px-4 py-2.5 text-slate-700 max-w-[220px]">
                                      {isSensitive(col) ? (
                                        <span className="text-slate-300 italic text-[10px]">••• hidden •••</span>
                                      ) : (
                                        <span className={`font-mono ${col === "id" ? "font-bold text-primary text-[11px]" : ""}`}
                                          title={String(row[col] ?? "")}>
                                          {formatCell(row[col])}
                                        </span>
                                      )}
                                    </td>
                                  ))}
                                  <td className="px-4 py-2.5 text-right">
                                    {activeTable !== "users" && (
                                      deleteConfirm === rowId ? (
                                        <span className="flex items-center gap-1 justify-end">
                                          <span className="text-rose-500 text-[10px] font-medium">Delete?</span>
                                          <button onClick={() => handleDelete(rowId)}
                                            className="px-2 py-0.5 bg-rose-500 text-white rounded text-[10px] font-bold hover:bg-rose-600 transition-colors">Yes</button>
                                          <button onClick={() => setDeleteConfirm(null)}
                                            className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-[10px] font-medium hover:bg-slate-300 transition-colors">No</button>
                                        </span>
                                      ) : (
                                        <button onClick={() => setDeleteConfirm(rowId)}
                                          className="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 flex items-center justify-center ml-auto transition-all">
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      )
                                    )}
                                  </td>
                                </motion.tr>
                              );
                            })}
                          </AnimatePresence>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Pagination */}
                  {tableData.pages > 1 && (
                    <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50/50">
                      <p className="text-xs text-slate-500">
                        Showing {((page - 1) * tableData.limit) + 1}–{Math.min(page * tableData.limit, tableData.total)} of {tableData.total.toLocaleString()} rows
                      </p>
                      <div className="flex items-center gap-1">
                        <button disabled={page <= 1} onClick={() => handlePage(page - 1)}
                          className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        {Array.from({ length: Math.min(7, tableData.pages) }, (_, i) => {
                          let p: number;
                          if (tableData.pages <= 7) p = i + 1;
                          else if (page <= 4) p = i + 1;
                          else if (page >= tableData.pages - 3) p = tableData.pages - 6 + i;
                          else p = page - 3 + i;
                          return (
                            <button key={p} onClick={() => handlePage(p)}
                              className={`w-7 h-7 rounded-lg border text-xs font-semibold transition-all ${
                                p === page ? "bg-primary border-primary text-white" : "border-slate-200 text-slate-500 hover:bg-slate-100"
                              }`}>
                              {p}
                            </button>
                          );
                        })}
                        <button disabled={page >= tableData.pages} onClick={() => handlePage(page + 1)}
                          className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Security note */}
                <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-3">
                  <Shield className="w-3 h-3" />
                  Sensitive fields (passwords, hashes) are hidden. User deletion is disabled for safety.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
