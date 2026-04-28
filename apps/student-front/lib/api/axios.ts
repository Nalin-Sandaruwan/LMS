import axios from "axios";

// Create a globally configured Axios instance
export const apiClient = axios.create({
  baseURL: "http://31.97.135.164:3000",
  withCredentials: true, // Crucial for sending setting HTTP-Only cookies automatically
});

// Response interceptor to handle global errors like 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Catch 401 and redirect to login automatically
    if (error.response?.status === 401) {
      // Bypass redirect for profile checks and login attempts
      const isAuthRequest =
        error.config?.url?.includes("/auth/profile/user") ||
        error.config?.url?.includes("/auth/login");

      if (isAuthRequest) {
        return Promise.reject(error); // Silently fail the session check
      }
      console.warn("Unauthorized access detected, redirecting to login...");

      // Ensure we are in the browser context before attempting to redirect
      if (typeof window !== "undefined") {
        const loginUrl = "/login";
        // Avoid infinite redirect loops if we are already on the login page
        if (window.location.pathname !== loginUrl) {
          window.location.href = loginUrl;
        }
      }
    }

    return Promise.reject(error);
  },
);
