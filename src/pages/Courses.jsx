import { useDispatch, useSelector } from "react-redux";
import { courseHeroData } from "../data/courseData";
import Card from "../components/Card";
import ScrollAnimatedSection from "../components/ScrollAnimatedSection";
import Hero from "../components/Hero";
import CustomSpinner from "../shared/custom/CustomSpinner";
import { setCurrentPage } from "../redux-rtk/course/courseSlice";

const Courses = () => {
  const dispatch = useDispatch();

  const { pages, meta, loading, error } = useSelector((state) => state.course);

  const { currentPage, totalPages, hasNextPage, hasPreviousPage } = meta;

  const currentCourses = pages[currentPage] || [];

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
    <div className="px-1 mt-1 sm:px-5 md:px-10 lg:px-20  2xl:px-44">
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
                  encryptedId={course.encrypted_id || null}
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
