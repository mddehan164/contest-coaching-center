import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { courseHeroData, btnData } from "../data/courseData";
import Card from "../components/Card";
import ScrollAnimatedSection from "../components/ScrollAnimatedSection";
import Hero from "../components/Hero";
import { fetchCourses } from "../services/course";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector(state => state.auth);

  // Transform API data to match Card component expectations
  const transformCourseData = (courseData) => {
    return courseData.map((course) => ({
      id: course.id,
      title: course.title || course.name || "Untitled Course",
      short_des: course.description
        ? Array.isArray(course.description)
          ? course.description
          : [course.description]
        : ["Course description will be updated soon"],
      price: course.price || "Contact for pricing",
      offer: course.offer || false,
      offerPrice: course.offer_price || course.offerPrice,
      image: course.image || null,
      bulletType: "circle",
    }));
  };

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiResponse = await fetchCourses();
        console.log(apiResponse.data.courses);

        let transformedCourses = [];

        if (
          apiResponse &&
          apiResponse.data &&
          Array.isArray(apiResponse.data.courses)
        ) {
          transformedCourses = transformCourseData(apiResponse.data.courses);
        } else if (apiResponse && Array.isArray(apiResponse)) {
          transformedCourses = transformCourseData(apiResponse);
        }

        setCourses(transformedCourses);
      } catch (error) {
        if (error.response?.status === 401) {
          setError("Authentication required. Please login first.");
        } else if (error.response?.status === 500) {
          setError(
            `Server error: ${
              error.response?.data?.message || "Internal server error"
            }`
          );
        } else if (
          error.code === "ERR_NETWORK" ||
          error.message.includes("Network Error")
        ) {
          setError(
            "Cannot connect to server. Make sure your Laravel backend is running on http://localhost:8000"
          );
        } else {
          setError(error.response?.data?.message || "Failed to load courses");
        }
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [user]);

  return (
    <div className="px-1 mt-1 sm:px-5 md:px-10 lg:px-20 xl:px-36 2xl:px-44">
      <Hero data={courseHeroData} />
      <h1 className="mt-16 text-lg md:text-2xl xl:text-4xl sm:my-5 font-semibold text-headerColorHover">
        Explore Our Courses
      </h1>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="text-lg">Loading courses...</div>
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
            {courses.length > 0 ? (
              courses.map((course, idx) => (
                <Card key={course.id || idx} data={course} btn={btnData} />
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
    </div>
  );
};

export default Courses;
