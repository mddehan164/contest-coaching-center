// API Configuration Constants
export const API_CONFIG = {
  BASE_URL: "http://localhost:8000/api",
  TIMEOUT: 10000,
  WITH_CREDENTIALS: true,
};

// API Endpoints
export const API_ENDPOINTS = {
  COURSES: "/courses",
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
  },
  CSRF: "/sanctum/csrf-cookie",
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Cannot connect to server. Please check your internet connection.",
  AUTH_REQUIRED: "Authentication required. Please login first.",
  SERVER_ERROR: "Internal server error. Please try again later.",
  GENERIC_ERROR: "Something went wrong. Please try again.",
};

// Loading Messages
export const LOADING_MESSAGES = {
  LOADING_COURSES: "Loading courses...",
  AUTHENTICATING: "Checking authentication...",
  PROCESSING: "Processing...",
};
