import { http } from "./http";
import type { CurrentUser, RegisterPayload } from "../types";

interface LoginResponse {
  token: string;
}

// POST /api/user/login
export function login(username: string, password: string): Promise<LoginResponse> {
  return http.post<LoginResponse>("/api/user/login", { username, password }).then((r) => r.data);
}

// POST /api/user/register
export function register(payload: RegisterPayload): Promise<CurrentUser> {
  return http.post<CurrentUser>("/api/user/register", payload).then((r) => r.data);
}

// GET /api/user/me
export function fetchMe(): Promise<CurrentUser> {
  return http.get<CurrentUser>("/api/user/me").then((r) => r.data);
}
