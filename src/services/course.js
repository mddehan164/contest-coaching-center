import axios from "axios";

console.log("📦 Course service loaded with axios");

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

// Add request interceptor
api.interceptors.request.use((config) => {
  // Add any cookies or tokens here if needed
  console.log("� Making request to:", config.baseURL + config.url);
  return config;
});

// সব কোর্স ফেচ
const fetchCourses = async () => {
  try {
    console.log("🚀 Making API call to /courses...");
    const response = await api.get("/courses");
    console.log("✅ API Response:", response);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    console.error("❌ Error response:", error.response);
    throw error;
  }
};

const fetchEncryptId = async (id) => {
  try {
    const payload = { id, value: id }; // বা backend কে যা দরকার
    const response = await api.post("/utils/encrypt-id", payload);
    // check response status
    if (response.status === 200 && response.data.encrypted_id) {
      return response.data.encrypted_id;
    } else {
      return null;
      // throw new Error("Failed to encrypt ID");
    }
  } catch (error) {
    console.error("Error in fetchEncryptId:", error);
    // যদি want, একটা user-readable message দিতে পারো
    throw error;
  }
};
// কোর্স ডিটেইলস
const fetchCourseById = async (id) => {
  try {
    const response = await api.get(`/courses/${id}`);
    console.log(response);
    if (response.status === 200 && response.data.encrypted_id) {
      return response.data;
    } else {
      throw new Error("Failed to Fetch Course");
    }
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    throw error;
  }
};

// const fetchCourseWithEncryptedId = async (id) => {
//   try {
//     const encryptResp = await fetchEncryptId(id);
//     const encryptedId = encryptResp.data.encrypted_id; // পরিবর্তন হলে field name মিলিয়ে বদলে দিবে
//     const courseResp = await fetchCourseById(encryptedId);
//     return {
//       encrypt: encryptResp,
//       course: courseResp,
//     };
//   } catch (error) {
//     console.error("Error in fetchCourseWithEncryptedId:", error);
//     throw error;
//   }
// };

// Export all functions
export { fetchCourses, fetchEncryptId, fetchCourseById };
