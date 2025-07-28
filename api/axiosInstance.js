// /api/axiosInstance.js
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // Updated base URL
  withCredentials: true, // Important to send cookies
});

// Request interceptor to attach tokens
api.interceptors.request.use((config) => {
  // Add CSRF token
  const xsrfToken = Cookies.get("XSRF-TOKEN");
  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
  }
  
  // Add Authorization header for auth endpoints
  const accessToken = Cookies.get("access_token");
  if (accessToken && config.url?.includes('/auth/')) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  
  return config;
}, (error) => Promise.reject(error));

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        // Try to refresh the token
        const refreshResponse = await axios.post("http://localhost:8000/api/auth/refresh", {
          refresh_token: refreshToken,
        }, {
          withCredentials: true
        });

        const newAccessToken = refreshResponse.data.data.access_token;
        
        // Update cookie with new token
        Cookies.set('access_token', newAccessToken, { 
          expires: 1,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        Cookies.remove('laravel_session');
        Cookies.remove('XSRF-TOKEN');
        
        // Only redirect if we're not already on login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

// Function to load CSRF cookie (call this before login/register)
export const getCsrfToken = async () => {
  await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
    withCredentials: true,
  });
};

export default api;



// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api/auth",
// });

// // Request interceptor
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("access_token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Response interceptor
// api.interceptors.response.use(
//   res => res,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshRes = await axios.post("http://localhost:8000/api/auth/refresh", {
//           refresh_token: localStorage.getItem("refresh_token"),
//         });

//         const newAccessToken = refreshRes.data.access_token;
//         localStorage.setItem("access_token", newAccessToken);

//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (refreshErr) {
//         localStorage.clear();
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
