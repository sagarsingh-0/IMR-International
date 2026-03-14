import { createContext, useContext, ReactNode, useEffect } from "react";
import { useGetMe } from "@workspace/api-client-react";
import type { UserProfile } from "@workspace/api-client-react";

interface AuthContextType {
  user: UserProfile | undefined;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: undefined, isLoading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useGetMe({ 
    query: { 
      retry: false,
      staleTime: 5 * 60 * 1000 // 5 minutes
    } 
  });

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
