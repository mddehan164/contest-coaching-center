import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courseHeroData } from "../data/courseData";
import Card from "../components/Card";
import ScrollAnimatedSection from "../components/ScrollAnimatedSection";
import Hero from "../components/Hero";
import CustomSpinner from "../shared/custom/CustomSpinner";
import {
  fetchCoursesPage,
  setCurrentPage,
} from "../redux-rtk/course/courseSlice";
import { fetchEncryptId } from "../services/course";

const Courses = () => {
  // const [courses, setCourses] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const { data } = useSelector((state) => state.course);

  // // Transform API data to match Card component expectations
  // const transformCourseData = (courseData) => {
  //   return courseData.map((course) => ({
  //     id: course.id,
  //     title: course.title || course.name || "Untitled Course",
  //     short_des: course.description
  //       ? Array.isArray(course.description)
  //         ? course.description
  //         : [course.description]
  //       : ["Course description will be updated soon"],
  //     price: course.price || "Contact for pricing",
  //     offer: course.offer || false,
  //     offerPrice: course.offer_price || course.offerPrice,
  //     image: course.image || null,
  //     bulletType: "circle",
  //   }));
  // };
  // console.log(data);
  // useEffect(() => {
  //   const loadCourses = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);

  //       const apiResponse = await fetchCourses();
  //       console.log(apiResponse.data.courses);

  //       let transformedCourses = [];

  //       if (
  //         apiResponse &&
  //         apiResponse.data &&
  //         Array.isArray(apiResponse.data.courses)
  //       ) {
  //         transformedCourses = transformCourseData(apiResponse.data.courses);
  //       } else if (apiResponse && Array.isArray(apiResponse)) {
  //         transformedCourses = transformCourseData(apiResponse);
  //       }

  //       setCourses(transformedCourses);
  //     } catch (error) {
  //       if (error.response?.status === 401) {
  //         setError("Authentication required. Please login first.");
  //       } else if (error.response?.status === 500) {
  //         setError(
  //           `Server error: ${
  //             error.response?.data?.message || "Internal server error"
  //           }`
  //         );
  //       } else if (
  //         error.code === "ERR_NETWORK" ||
  //         error.message.includes("Network Error")
  //       ) {
  //         setError(
  //           "Cannot connect to server. Make sure your Laravel backend is running on http://localhost:8000"
  //         );
  //       } else {
  //         setError(error.response?.data?.message || "Failed to load courses");
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadCourses();
  // }, []);
  const dispatch = useDispatch();
  // const getEncryptId = (id) => {
  //   try {
  //     const encryptedId = fetchEncryptId(id);
  //     return encryptedId;
  //   } catch (error) {
  //     console.error("Error in fetchCourseWithEncryptedId:", error);
  //     throw error;
  //   }
  // };
  const [encryptedIds, setEncryptedIds] = useState({});
  const { pages, meta, loading, error } = useSelector((state) => state.course);

  const { currentPage, totalPages, pageSize, hasNextPage, hasPreviousPage } =
    meta;

  const currentCourses = pages[currentPage] || [];

  // যখন currentCourses change হবে
  useEffect(() => {
    const loadCoursesWithEncryptedIds = async () => {
      // যদি সেই page already loaded না হয়
      if (!pages[currentPage]) {
        await dispatch(
          fetchCoursesPage({ page: currentPage, pageSize })
        ).unwrap();
      }

      const coursesToEncrypt = pages[currentPage] || [];
      const ids = {};
      for (const course of coursesToEncrypt) {
        const encryptedId = await fetchEncryptId(course.id);
        ids[course.id] = encryptedId || null;
      }
      setEncryptedIds(ids);
    };

    loadCoursesWithEncryptedIds();
  }, [currentPage, pageSize, dispatch, pages]);

  const handlePrev = () => {
    if (hasPreviousPage) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNext = () => {
    if (hasNextPage) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  return (
    // <div className="px-1 mt-1 sm:px-5 md:px-10 lg:px-20 xl:px-36 2xl:px-44">
    //   <Hero data={courseHeroData} />
    //   <h1 className="mt-16 text-lg md:text-2xl xl:text-4xl sm:my-5 font-semibold text-headerColorHover">
    //     Explore Our Courses
    //   </h1>

    //   {loading && (
    //     <div className="flex justify-center items-center py-10">
    //       <CustomSpinner />
    //     </div>
    //   )}

    //   {error && (
    //     <div className="flex justify-center items-center py-10">
    //       <div className="text-red-500 text-lg">
    //         Something went wrong: {error}
    //       </div>
    //     </div>
    //   )}

    //   {!loading && !error && (
    //     <ScrollAnimatedSection id="all-course" direction="left">
    //       <div className="grid grid-cols-1 gap-5 px-7 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:px-0 2xl:grid-cols-5 2xl:gap-7">
    //         {courses.length > 0 ? (
    //           courses.map((course, idx) => (
    //             <Card key={course.id || idx} data={course} btn={btnData} />
    //           ))
    //         ) : (
    //           <div className="col-span-full text-center py-10">
    //             <p className="text-gray-500">
    //               No courses available at the moment.
    //             </p>
    //           </div>
    //         )}
    //       </div>
    //     </ScrollAnimatedSection>
    //   )}
    // </div>
    <div className="px-1 mt-1 sm:px-5 md:px-10 lg:px-20 xl:px-36 2xl:px-44">
      <Hero data={courseHeroData} />
      <h1 className="mt-16 text-lg md:text-2xl xl:text-4xl sm:my-5 font-semibold text-headerColorHover">
        Explore Our Courses
      </h1>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <CustomSpinner />
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center py-10">
          <div className="text-red-500 text-lg">
            Something went wrong: {error}
          </div>
        </div>
      )}

      {!loading && !error && (
        <ScrollAnimatedSection id="all-course" direction="left">
          <div className="grid grid-cols-1 gap-5 px-7 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:px-0 2xl:grid-cols-5 2xl:gap-7">
            {currentCourses.length > 0 ? (
              currentCourses.map((course, idx) => (
                <Card
                  key={course.id || idx}
                  data={course}
                  encryptedId={encryptedIds[course.id] || null}
                  btn={{
                    btnName: ["Enroll Now", "Details"],
                    btnStyle: {
                      btnBgColor: "headerColor",
                      btnHoverColor: "headerColorHover",
                      btnStatus: true,
                    },
                  }}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">
                  No courses available at the moment.
                </p>
              </div>
            )}
          </div>
        </ScrollAnimatedSection>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={!hasPreviousPage || loading}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={!hasNextPage || loading}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Courses;
