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

// কোর্স ডিটেইলস
const fetchCourseById = async (id) => {
  try {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    throw error;
  }
};

// নতুন কোর্স অ্যাড
const addCourse = async (course) => {
  try {
    const response = await api.post("/courses", course);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
};

// কোর্স আপডেট
const updateCourse = async (id, course) => {
  try {
    const response = await api.put(`/courses/${id}`, course);
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

// কোর্স ডিলিট
const deleteCourse = async (id) => {
  try {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

// Export all functions
export { fetchCourses, fetchCourseById, addCourse, updateCourse, deleteCourse };
