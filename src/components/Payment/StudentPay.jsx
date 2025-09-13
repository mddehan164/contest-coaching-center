// components/StudentPay.jsx
import { useEffect, useMemo } from "react";
import FilterPerson from "../FilterPerson";
import FilterBox from "../FilterBox";
import { usePayment } from "../../hooks/usePayment";
import { useDispatch, useSelector } from "react-redux";
import CustomSpinner from "../../shared/custom/CustomSpinner";
// import StudentPaymentDetails from "./StudentPaymentDetails"; //假设您有这个组件

import {
  setShowPopup,
  setShowStickyBtn,
  setFilters,
  clearFilters,
} from "../../redux-rtk/payment/paymentSlice";
import {
  // useGetAllStudentsPaymentQuery,
  useGetStudentPaymentsByCourseBatchQuery,
} from "../../redux-rtk/payment/paymentApi";

const StudentPay = () => {
  const dispatch = useDispatch();
  const {
    filters,
    selectedCourseEncryptedId,
    courseOptions,
    batchesOptions,
    updateSelectedCourseEncryptedId,
    selectStudent,
    selectedStudent, // selected student পাবেন এখানে
    clearSelectedStudent, // selected student clear করার function
  } = usePayment();

  const { showPopup, showStickyBtn } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(setShowPopup(true));
    dispatch(setShowStickyBtn(false));
  }, [dispatch]);

  // ✅ API call students (filter অনুযায়ী)
  const { data: filteredStudents, isLoading: loadingFilteredStudents } =
    useGetStudentPaymentsByCourseBatchQuery(
      {
        encrypted_course_id: filters.course || "",
        encrypted_batch_id: filters.batch || "",
      },
      { skip: !filters.course || !filters.batch }
    );

  // const { data: allStudents, isLoading: loadingAllStudents } =
  //   useGetAllStudentsPaymentQuery(
  //     { search: filters.search || "" },
  //     { skip: (filters.course || filters.batch) && !filters.search }
  //   );

  // student list নির্ধারণ
  const studentList = useMemo(() => {
    if (filters.course && filters.batch) {
      return filteredStudents?.data?.students || [];
    }
    return [];
  }, [filters, filteredStudents]);

  // courseBatchData prepare
  const courseBatchData = useMemo(() => {
    return (courseOptions || []).map((course) => ({
      id: course.value || "",
      title: course.label || "",
      encrypted_id: course.encrypted_id || "",
      batches: (course.value === filters.course ? batchesOptions : []) || [],
    }));
  }, [courseOptions, batchesOptions, filters.course]);

  // popup এ course change
  const handleCourseChange = (courseId) => {
    const selectedCourse = (courseOptions || []).find(
      (c) => c.value === courseId
    );
    if (selectedCourse) {
      updateSelectedCourseEncryptedId(selectedCourse.encrypted_id || "");
    }
    dispatch(setFilters({ course: courseId || null, batch: null }));
  };

  // Student select করলে
  const handleSelectStudent = (student) => {
    selectStudent(student);
  };

  // Student details close করলে
  const handleCloseDetails = () => {
    clearSelectedStudent();
  };

  const isLoading = loadingFilteredStudents;

  if (isLoading) {
    return (
      <div className="relative pt-20 flex justify-center items-center h-64">
        <CustomSpinner />
      </div>
    );
  }

  return (
    <div className="relative pt-20">
      {/* Sticky Button */}
      {showStickyBtn && (
        <button
          onClick={() => {
            dispatch(setShowPopup(true));
            dispatch(setShowStickyBtn(false));
          }}
          className="fixed top-20 right-5 bg-headerColorHover hover:bg-headerColor text-white px-4 py-2 rounded shadow-lg z-50"
        >
          Select Course & Batch
        </button>
      )}

      {/* Popup Box */}
      {showPopup && (
        <FilterBox
          courseBatchData={courseBatchData}
          selectedCourse={filters.course || ""}
          setSelectedCourse={handleCourseChange}
          selectedBatch={filters.batch || ""}
          setSelectedBatch={(batchId) =>
            dispatch(setFilters({ batch: batchId || null }))
          }
          query={filters.search || ""}
          setQuery={(query) => dispatch(setFilters({ search: query || "" }))}
          onApply={() => {
            dispatch(setShowPopup(false));
            dispatch(setShowStickyBtn(true));
          }}
          onClose={() => {
            dispatch(setShowPopup(false));
            dispatch(setShowStickyBtn(true));
          }}
        />
      )}

      {/* Selected Student Details Display */}
      {/* {selectedStudent && (
        <StudentPaymentDetails
          student={selectedStudent}
          onClose={handleCloseDetails}
        />
      )} */}

      {/* Display filter info */}
      {(filters.course || filters.batch || filters.search) && (
        <div className="bg-gray-100 p-3 mb-4 rounded-md mx-4">
          <h3 className="font-semibold">Active Filters:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {filters.course && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                Course:{" "}
                {(courseOptions || []).find((c) => c.value === filters.course)
                  ?.label || "Unknown"}
              </span>
            )}
            {filters.batch && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                Batch:{" "}
                {(batchesOptions || []).find((b) => b.value === filters.batch)
                  ?.label || "Unknown"}
              </span>
            )}
            {filters.search && (
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                Search: "{filters.search}"
              </span>
            )}
            <button
              onClick={() => dispatch(clearFilters())}
              className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm hover:bg-red-200"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Student Section */}
      <div className="px-4 mb-4">
        <h2 className="text-xl font-bold">Students</h2>
        <p className="text-sm text-gray-600">
          {studentList.length} students found
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {/* Case 1: কোনো filter select হয়নি */}
        {!filters.course && !filters.batch && !filters.search && (
          <div className="text-center py-10 w-full">
            <p className="text-gray-600 font-medium text-lg xl:text-3xl">
              Please select a course & batch or search to see students
            </p>
          </div>
        )}

        {/* Case 2: filter select আছে, কিন্তু কোনো student নেই */}
        {(filters.course || filters.batch || filters.search) &&
          studentList.length === 0 && (
            <div className="text-center py-10 w-full">
              <p className="text-gray-500">No students match your filters</p>
            </div>
          )}

        {/* Case 3: student list আছে */}
        {studentList.length > 0 && (
          <FilterPerson
            dataList={studentList}
            person="student"
            onSelectStudent={handleSelectStudent}
          />
        )}
      </div>
    </div>
  );
};

export default StudentPay;
