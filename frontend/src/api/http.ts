import axios, { AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "/";

export const http = axios.create({
  baseURL: BASE_URL,
});


http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export function extractErrorMessage(error: unknown, fallback?: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | string
      | { message?: string; error?: string }
      | undefined;
    if (typeof data === "string") return data;
    if (data?.message) return data.message;
    if (data?.error) return data.error;
  }
  return fallback || "Something went wrong. Please try again.";
}
