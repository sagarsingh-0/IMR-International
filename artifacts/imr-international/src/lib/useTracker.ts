import { useEffect } from "react";
import { useLocation } from "wouter";
import { trackPageView, trackSessionEnd } from "./tracker";

export function usePageTracking() {
  const [location] = useLocation();

  useEffect(() => {
    trackPageView(location);
  }, [location]);

  useEffect(() => {
    const handleUnload = () => trackSessionEnd();
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);
}
