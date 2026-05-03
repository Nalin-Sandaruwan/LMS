import axios from "axios";

// Create a globally configured Axios instance for Admin
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Response interceptor to handle global errors like 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Catch 401 and redirect to login automatically
    if (error.response?.status === 401) {
      // Don't redirect if we are already trying to login or check profile
      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "";
      const isLoginRequest = error.config?.url === "/auth/login";
      const isProfileRequest = error.config?.url === "/auth/verify"; // Use basic verify for admin session check

      if (isLoginRequest || isProfileRequest) {
        return Promise.reject(error);
      }

      console.warn("Unauthorized access detected, redirecting to login...");

      if (typeof window !== "undefined") {
        const loginUrl = "/login";
        if (window.location.pathname !== loginUrl) {
          window.location.href = loginUrl;
        }
      }
    }

    return Promise.reject(error);
  },
);
