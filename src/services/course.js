import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

// Add request interceptor
api.interceptors.request.use((config) => {
  // Add any cookies or tokens here if needed
  return config;
});

// সব কোর্স ফেচ
const fetchCourses = async () => {
  try {
    const response = await api.get("/courses");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    console.error("❌ Error response:", error.response);
    throw error;
  }
};

// কোর্স ডিটেইলস
const fetchCourseById = async (id) => {
  try {
    const response = await api.get(`/courses/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to Fetch Course");
    }
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    throw error;
  }
};

// Export all functions
export { fetchCourses, fetchCourseById };
