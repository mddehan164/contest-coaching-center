import api from "../../api/axiosInstance";
import { getEncryptedId } from "../../api/utils";

// সব কোর্স ফেচ
export const fetchCourses = async () => {
  try {
    const data = await api.get("/courses");
    return data;
  } catch (error) {
    console.log(error);
  }
};

// কোর্স ডিটেইলস (encryptedId দিয়ে)
export const fetchCourseById = async (id) => {
  const encryptedId = await getEncryptedId(id);
  const { data } = await api.get(`/courses/${encryptedId}`);
  return data;
};

// নতুন কোর্স অ্যাড
export const addCourse = async (course) => {
  const encryptedId = await getEncryptedId(course.teacher_id); // ধরো course এ teacher_id আছে
  const { data } = await api.post("/courses", {
    ...course,
    teacher_code: encryptedId,
  });
  return data;
};

// কোর্স আপডেট
export const updateCourse = async (id, course) => {
  const encryptedId = await getEncryptedId(id);
  const { data } = await api.put(`/courses/${encryptedId}`, course);
  return data;
};

// কোর্স ডিলিট
export const deleteCourse = async (id) => {
  const encryptedId = await getEncryptedId(id);
  await api.delete(`/courses/${encryptedId}`);
};
