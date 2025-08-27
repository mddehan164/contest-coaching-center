import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
});

api.interceptors.request.use(
  (config) => {
    const xsrfToken = Cookies.get("XSRF-TOKEN");
    if (xsrfToken) {
      config.headers["X-XSRF-TOKEN"] = decodeURIComponent(xsrfToken);
    }

    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("access_token");
      Cookies.remove("laravel_session");
      Cookies.remove("XSRF-TOKEN");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export const getCsrfToken = async () => {
  await axios.get(`${import.meta.env.VITE_BASE_URL}/sanctum/csrf-cookie` || "http://localhost:8000/sanctum/csrf-cookie", {
  });
};

export default api;
