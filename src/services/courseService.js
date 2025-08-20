import axios from "axios";
import Cookies from "js-cookie";
import { API_CONFIG, API_ENDPOINTS } from "../constants/api";

/**
 * Course Service - Handles all course-related API operations
 * @module CourseService
 */

// Create axios instance for course-related API calls
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: API_CONFIG.WITH_CREDENTIALS,
});

// Request interceptor for authentication
api.interceptors.request.use((config) => {
  // Add CSRF token
  const xsrfToken = Cookies.get("XSRF-TOKEN");
  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
  }
  
  // Add Authorization header
  const accessToken = Cookies.get("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  
  return config;
});

/**
 * Fetches all available courses
 * @returns {Promise<Object>} API response containing courses data
 * @throws {Error} When API request fails
 */
export const fetchCourses = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.COURSES);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches a specific course by ID
 * @param {string|number} id - The course ID
 * @returns {Promise<Object>} API response containing course data
 * @throws {Error} When API request fails
 */
export const fetchCourseById = async (id) => {
  try {
    const response = await api.get(`${API_ENDPOINTS.COURSES}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Creates a new course
 * @param {Object} course - Course data to create
 * @returns {Promise<Object>} API response containing created course data
 * @throws {Error} When API request fails
 */
export const addCourse = async (course) => {
  try {
    const response = await api.post(API_ENDPOINTS.COURSES, course);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Updates an existing course
 * @param {string|number} id - The course ID to update
 * @param {Object} course - Updated course data
 * @returns {Promise<Object>} API response containing updated course data
 * @throws {Error} When API request fails
 */
export const updateCourse = async (id, course) => {
  try {
    const response = await api.put(`${API_ENDPOINTS.COURSES}/${id}`, course);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Deletes a course by ID
 * @param {string|number} id - The course ID to delete
 * @returns {Promise<Object>} API response confirming deletion
 * @throws {Error} When API request fails
 */
export const deleteCourse = async (id) => {
  try {
    const response = await api.delete(`${API_ENDPOINTS.COURSES}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
