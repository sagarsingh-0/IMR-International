import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, BarChart2, Shield, AlertCircle } from "lucide-react";
import { TopBar } from "@/components/TopBar";

const BASE_URL = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setLocation("/admin/analytics");
      } else {
        setError(data.error ?? "Login failed. Please check your credentials.");
      }
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <TopBar />

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/80 border border-slate-200/60 overflow-hidden">
            {/* Top color bar */}
            <div className="h-1.5 bg-gradient-to-r from-blue-600 via-violet-500 to-amber-500" />

            {/* Header */}
            <div className="bg-gradient-to-br from-[#1e3a5f] via-[#1a4f8a] to-[#2563eb] px-8 py-8 text-white text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-display font-bold mb-1">Admin Dashboard</h1>
              <p className="text-white/60 text-sm">Sign in to access analytics</p>

              <div className="flex items-center justify-center gap-2 mt-4 bg-white/10 border border-white/15 rounded-xl px-4 py-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-white/70 text-xs">Restricted access · Authorised personnel only</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-50 border border-rose-200"
                >
                  <AlertCircle className="w-4.5 h-4.5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <p className="text-rose-700 text-sm font-medium">{error}</p>
                </motion.div>
              )}

              {/* Username */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                    <User className="w-4.5 h-4.5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Admin username"
                    required
                    autoComplete="username"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all text-sm font-medium placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                    <Lock className="w-4.5 h-4.5 text-slate-400" />
                  </div>
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Admin password"
                    required
                    autoComplete="current-password"
                    className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all text-sm font-medium placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPw ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !username || !password}
                className="w-full py-3.5 bg-primary hover:bg-primary/90 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 disabled:translate-y-0 mt-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Signing in…
                  </span>
                ) : "Sign In to Dashboard"}
              </button>

              <p className="text-center text-xs text-slate-400 pt-1">
                <button type="button" onClick={() => setLocation("/")}
                  className="hover:text-primary transition-colors">
                  ← Back to IMR International website
                </button>
              </p>
            </form>
          </div>

          {/* Hint card */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
            <p className="text-blue-600 text-xs font-medium">
              Default credentials can be changed via environment variables<br />
              <code className="bg-blue-100 px-1.5 py-0.5 rounded text-blue-700 font-mono">ADMIN_USERNAME</code> and{" "}
              <code className="bg-blue-100 px-1.5 py-0.5 rounded text-blue-700 font-mono">ADMIN_PASSWORD</code>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
