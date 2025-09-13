import Card from "../Card";
import MainBtn from "../MainBtn";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomSpinner from "../../shared/custom/CustomSpinner";
import {
  fetchCoursesPage,
  setEncryptedId,
} from "../../redux-rtk/course/courseSlice";
import { fetchEncryptId } from "../../services/course";
import { useEffect } from "react";

const CourseMain = () => {
  const dispatch = useDispatch();

  const { pages, meta, loading, error } = useSelector((state) => state.course);

  const { currentPage, pageSize } = meta;

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
      dispatch(setEncryptedId(ids));
    };

    loadCoursesWithEncryptedIds();
  }, [currentPage, pageSize, dispatch, pages]);

  const someCourse = currentCourses.slice(0, 4);

  return (
    <div className="w-full max-sm:p-3 sm:pt-10 relative min-h-[400px]">
      <h1 className="text-center max-sm:text-lg font-semibold text-headerColorHover sm:py-8 sm:text-2xl xl:text-3xl">
        আমাদের চলমান কোর্সসমূহ
      </h1>
      {!someCourse ||
        (loading && (
          <div className="flex justify-center items-center py-10">
            <CustomSpinner />
          </div>
        ))}
      {error && (
        <div className="flex justify-center items-center py-10">
          <CustomSpinner />
          <p className="text-red-500 italic font-medium">{error}</p>
        </div>
      )}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-5 px-7 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:px-0">
          {someCourse.map((course, idx) => (
            <Card
              key={idx}
              data={course}
              btn={{
                btnName: ["Enroll Now", "Details"],
                btnStyle: {
                  btnBgColor: "headerColor",
                  btnHoverColor: "headerColorHover",
                  btnStatus: true,
                },
              }}
            />
          ))}
        </div>
      )}

      <div className="w-full flex justify-end items-center absolute xl:-bottom-20 xl:right-20 max-sm:-bottom-10 max-sm:right-2 sm:-bottom-16 md:right-2">
        <NavLink to="/courses">
          <MainBtn
            data={["See More"]}
            btnStyle={{
              btnBgColor: "headerColor",
              btnHoverColor: "headerColorHover",
              btnStatus: true,
            }}
          />
        </NavLink>
      </div>
    </div>
  );
};
export default CourseMain;
