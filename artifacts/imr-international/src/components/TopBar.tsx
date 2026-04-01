import { MapPin, Phone, Mail, LogIn, User, LogOut } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { useQueryClient } from "@tanstack/react-query";
import { getGetMeQueryKey } from "@workspace/api-client-react";
import { useState } from "react";

export function TopBar() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      // Call the logout API to destroy the server-side session
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Ignore errors — we always log out locally
    } finally {
      // Cancel any in-flight /api/auth/me requests so they don't bring the user back
      await queryClient.cancelQueries({ queryKey: getGetMeQueryKey() });
      // Wipe the cached user data completely
      queryClient.removeQueries({ queryKey: getGetMeQueryKey() });
      // Hard redirect — kills all React state and guarantees a clean slate
      window.location.href = "/";
    }
  };

  return (
    <div className="bg-primary text-primary-foreground py-2 text-sm font-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 hover:text-accent transition-colors duration-200 cursor-default">
          <MapPin className="w-4 h-4 text-accent" />
          <span>07 District Centre, CS Pur, Bhubaneswar</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="tel:+919938080165" className="flex items-center gap-2 hover:text-accent transition-colors duration-200">
            <Phone className="w-4 h-4 text-accent" />
            <span>+91-9938080165</span>
          </a>
          <a href="mailto:imrinternational11@gmail.com" className="hidden lg:flex items-center gap-2 hover:text-accent transition-colors duration-200">
            <Mail className="w-4 h-4 text-accent" />
            <span>imrinternational11@gmail.com</span>
          </a>
          
          <div className="h-4 w-px bg-primary-foreground/30 hidden sm:block"></div>
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-accent font-semibold">
                <User className="w-4 h-4" />
                {user.name}
              </span>
              <button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-1.5 hover:text-accent transition-colors duration-200 disabled:opacity-60"
              >
                <LogOut className={`w-4 h-4 ${isLoggingOut ? "animate-spin" : ""}`} />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="flex items-center gap-1.5 hover:text-accent transition-colors duration-200">
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link href="/register" className="flex items-center gap-1.5 hover:text-accent transition-colors duration-200">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
