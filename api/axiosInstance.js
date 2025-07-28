// /api/axiosInstance.js
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:8000/api/auth", // or your API base
  withCredentials: true, // ❗Important to send cookies
});

// Automatically attach CSRF token from cookie
api.interceptors.request.use((config) => {
  const xsrfToken = Cookies.get("XSRF-TOKEN");
  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
  }
  return config;
}, (error) => Promise.reject(error));

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
