import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { fetchMe, login as loginRequest, register as registerRequest } from "../api/userApi";
import type { CurrentUser, RegisterPayload } from "../types";

interface AuthContextValue {
  user: CurrentUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  isOwner: boolean;
  isVet: boolean;
  login: (username: string, password: string) => Promise<CurrentUser>;
  register: (payload: RegisterPayload) => Promise<CurrentUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    fetchMe()
      .then((me) => {
        setUser(me);
        localStorage.setItem("user", JSON.stringify(me));
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(username: string, password: string): Promise<CurrentUser> {
    const { token } = await loginRequest(username, password);
    localStorage.setItem("token", token);
    const me = await fetchMe();
    setUser(me);
    localStorage.setItem("user", JSON.stringify(me));
    return me;
  }

  async function register(payload: RegisterPayload): Promise<CurrentUser> {
    return registerRequest(payload);
  }

  function logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  const value: AuthContextValue = {
    user,
    loading,
    isAuthenticated: !!user,
    isOwner: user?.role === "ROLE_USER",
    isVet: user?.role === "ROLE_VETERINARIAN",
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
