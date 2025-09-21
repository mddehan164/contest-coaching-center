import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../auth/authSlice";

// Function to get CSRF token
const getCsrfToken = async () => {
  try {
    await fetch(
      `${
        import.meta.env.VITE_BASE_URL || "https://contest.shakirahmed.dev"
      }/sanctum/csrf-cookie`,
      {
        credentials: "include",
      }
    );
  } catch (error) {
    console.warn("Failed to get CSRF token:", error);
  }
};

// Function to get token from cookies
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const baseQuery = fetchBaseQuery({
  baseUrl:
    import.meta.env.VITE_API_BASE_URL || "https://contest.shakirahmed.dev/api",
  credentials: "include",
  prepareHeaders: async (headers, { getState }) => {
    // Get CSRF token from cookie
    const xsrfToken = getCookie("XSRF-TOKEN");
    if (xsrfToken) {
      headers.set("X-XSRF-TOKEN", decodeURIComponent(xsrfToken));
    }

    // Get access token from Redux state or cookie
    const token = getState().auth.accessToken || getCookie("access_token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    headers.set("accept", "application/json");

    // Don't set content-type here - let individual endpoints handle it
    // This allows FormData requests to set their own content-type with boundary
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // If in mock mode, return mock data
  if (import.meta.env.VITE_MOCK_API === "true") {
    console.log("Using mock API data");

    if (typeof args === "string" && args.includes("/auth/me")) {
      return {
        data: {
          data: {
            user: {
              id: 1,
              name: "Demo User",
              email: "demo@example.com",
              role: "admin",
            },
          },
        },
      };
    }

    // For login endpoint
    if (typeof args === "object" && args.url?.includes("/auth/login")) {
      return {
        data: {
          success: true,
          message: "Login successful",
          data: {
            user: {
              id: 1,
              name: "Demo User",
              email: "demo@example.com",
              role: "admin",
            },
            access_token: "mock_token_123",
            token_type: "Bearer",
          },
        },
      };
    }

    return {
      data: { success: true, message: "Mock response" },
    };
  }

  // For login requests, get CSRF token first
  if (typeof args === "object" && args.url?.includes("/auth/login")) {
    await getCsrfToken();
  }

  let result = await baseQuery(args, api, extraOptions);

  // Handle connection refused error (no backend server)
  if (
    result?.error?.code === "ERR_NETWORK" ||
    result?.error?.status === "FETCH_ERROR"
  ) {
    console.warn("Backend server not available");

    return {
      error: {
        status: "CUSTOM_ERROR",
        data: {
          message:
            "Backend server not available. Please start the backend server or use mock mode.",
        },
      },
    };
  }

  if (result?.error?.status === 401) {
    // Don't try to refresh token if we're in the middle of a logout request
    if (typeof args === "object" && args.url?.includes("/auth/logout")) {
      return result;
    }

    // Don't try to refresh if we're already logged out
    const currentState = api.getState();
    if (!currentState.auth.accessToken || !currentState.auth.isAuthenticated) {
      return result;
    }

    // Try to refresh token
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      // Store the new token
      api.dispatch(setCredentials(refreshResult.data));
      // Retry the original query with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Clear tokens and logout
      document.cookie = "access_token=; Max-Age=0; path=/;";
      document.cookie = "XSRF-TOKEN=; Max-Age=0; path=/;";
      document.cookie = "laravel_session=; Max-Age=0; path=/;";
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "User"],
  endpoints: (builder) => ({}),
});
