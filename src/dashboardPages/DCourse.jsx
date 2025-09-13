// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { CourseEditor } from "../components";
// import { addCourse, fetchCourses } from "../services/course";

// const DCourse = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { user } = useSelector(state => state.auth);

//   // Transform API data to match Card component expectations
//   const transformCourseData = (courseData) => {
//     return courseData.map((course) => ({
//       title: course.title || course.name || "Untitled Course",
//       short_des: course.description
//         ? Array.isArray(course.description)
//           ? course.description
//           : [course.description]
//         : ["Course description will be updated soon"],
//       price: course.price || "Contact for pricing",
//       offer: course.offer || false,
//       offerPrice: course.offer_price || course.offerPrice,
//       image: course.image || null,
//       bulletType: "circle",
//     }));
//   };

//   useEffect(() => {
//     const createCourse = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const res = await addCourse();
//         console.log(res.data.courses);

//         let transformedCourses = [];

//         if (res && res.data && Array.isArray(res.data.courses)) {
//           transformedCourses = transformCourseData(res.data.courses);
//         } else if (res && Array.isArray(res)) {
//           transformedCourses = transformCourseData(res);
//         }

//         setCourses(transformedCourses);
//       } catch (error) {
//         if (error.response?.status === 401) {
//           setError("Authentication required. Please login first.");
//         } else if (error.response?.status === 500) {
//           setError(
//             `Server error: ${
//               error.response?.data?.message || "Internal server error"
//             }`
//           );
//         } else if (
//           error.code === "ERR_NETWORK" ||
//           error.message.includes("Network Error")
//         ) {
//           setError(
//             "Cannot connect to server. Make sure your Laravel backend is running on http://localhost:8000"
//           );
//         } else {
//           setError(error.response?.data?.message || "Failed to load courses");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     // if (user && user.role === "admin") {
//     //   createCourse();
//     // } else {
//     //   setError("You do not have permission to access this page.");
//     //   setLoading(false);
//     // }
//   }, [user]);
//   return (
//     <div className="xl:px-8 2xl:px-28 xl:text-xl">
//       <CourseEditor />
//     </div>
//   );
// };

// export default DCourse;
