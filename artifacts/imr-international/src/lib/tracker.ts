const BASE_URL = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";
const API_BASE = BASE_URL;

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

// ── Public API ──────────────────────────────────────────────────────────────

export function trackPageView(path: string) {
  sendEvent("page_view", path);
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
