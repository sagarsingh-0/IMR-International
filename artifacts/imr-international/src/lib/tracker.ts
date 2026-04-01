const BASE_URL = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";
// In production, use the VITE_API_BASE_URL environment variable if it exists
const API_BASE = (import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "")) || BASE_URL;

// ── Session ID — lives only for this browser tab (no localStorage persistence)
let sessionId: string | null = null;
let sessionStart: number = Date.now();

function getSessionId(): string {
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStart = Date.now();
  }
  return sessionId;
}

function hasConsent(): boolean {
  return localStorage.getItem("imr_consent") === "accepted";
}

async function sendEvent(eventType: string, page: string, element?: string) {
  if (!hasConsent()) return;
  try {
    await fetch(`${API_BASE}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: getSessionId(),
        eventType,
        page,
        element: element ?? null,
      }),
    });
  } catch {
    // Silent fail — analytics should never affect UX
  }
}

// ── Server-side visitor log (no consent required — no PII stored) ────────────
// Fires a lightweight record to the server for every page visit.
// IP is one-way hashed server-side. No names, emails, or identifiers collected.
function logVisit(path: string) {
  try {
    navigator.sendBeacon(
      `${API_BASE}/api/visitor-log`,
      new Blob(
        [JSON.stringify({ page: path, referrer: document.referrer || null })],
        { type: "application/json" }
      )
    );
  } catch {
    // Silent fail
    fetch(`${API_BASE}/api/visitor-log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: path, referrer: document.referrer || null }),
      keepalive: true,
    }).catch(() => {});
  }
}

// ── Public API ──────────────────────────────────────────────────────────────

export function trackPageView(path: string) {
  logVisit(path);        // always — no consent needed, no PII
  sendEvent("page_view", path); // only when consent given
}

export function trackClick(element: string, page: string) {
  sendEvent("click", page, element);
}

export function trackNavigation(to: string) {
  sendEvent("navigation", to);
}

export function trackSessionEnd() {
  if (!hasConsent() || !sessionId) return;
  const durationSeconds = Math.round((Date.now() - sessionStart) / 1000);
  sendEvent("session_end", window.location.pathname, `duration:${durationSeconds}s`);
}

export async function saveConsent(status: "accepted" | "rejected" | "withdrawn") {
  localStorage.setItem("imr_consent", status);
  try {
    await fetch(`${API_BASE}/api/consent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  } catch {
    // Silent fail
  }
}

export function getConsent(): string | null {
  return localStorage.getItem("imr_consent");
}
