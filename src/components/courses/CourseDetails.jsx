import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCourseByIdThunk } from "../../redux-rtk/course/courseSlice";
import CustomSpinner from "../../shared/custom/CustomSpinner";

const CourseDetails = () => {
  const { id } = useParams();
  // const course = courseData.courses.find((course) => course.id === +id);
  const dispatch = useDispatch();
  const { course, loading, error } = useSelector((state) => state.course);

  useEffect(() => {
    if (id) dispatch(fetchCourseByIdThunk(id));
  }, [dispatch, id]);

  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        {" "}
        <CustomSpinner />{" "}
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  if (!course)
    return <div className="text-center py-10">কোর্স খুঁজে পাওয়া যায়নি</div>;

  return (
    <div className="w-full max-w-[80%] space-y-6 px-5 sm:px-5 md:px-10 lg:px-20 xl:px-44">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center text-headerColor md:text-4xl">
        Course Details
      </h1>

      {/* Image and Short Description */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-auto object-cover rounded-lg shadow-md"
            loading="lazy"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-headerColorHover md:text-3xl">
            {course.title}
          </h2>
          <ul
            className={`list-disc list-inside text-sm text-gray-700 space-y-1 md:text-lg`}
          >
            <li>{course.short_des}</li>
          </ul>
        </div>
      </div>

      {/* Long Description */}
      <div>
        <p className="leading-relaxed text-sm md:text-lg text-gray-500 ">
          {course.long_des}
        </p>
      </div>

      {/* Pricing Section */}
      <div className="flex justify-between items-center flex-wrap gap-4 border-t pt-4">
        <div>
          {course.offer_price ? (
            <p className="text-sm sm:text-lg">
              <span className="line-through text-red-500 mr-2">
                ৳{course.price}
              </span>
              <span className="text-green-600 font-bold">
                Offer: ৳{course.offer_price}
              </span>
            </p>
          ) : (
            <p className="text-sm sm:text-lg font-semibold text-headerColorHover">
              ৳{course.price}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
