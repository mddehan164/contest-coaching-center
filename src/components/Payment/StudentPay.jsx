// components/StudentPay.jsx
import { useEffect, useMemo, useState } from "react";
import FilterPerson from "../FilterPerson";
import FilterBox from "../FilterBox";
import { usePayment } from "../../hooks/usePayment";
import { useDispatch, useSelector } from "react-redux";
import CustomSpinner from "../../shared/custom/CustomSpinner";

import {
  setShowPopup,
  setShowStickyBtn,
  setFilters,
  clearFilters,
} from "../../redux-rtk/payment/paymentSlice";
import { useGetStudentPaymentsByCourseBatchQuery } from "../../redux-rtk/payment/paymentApi";

const StudentPay = () => {
  const dispatch = useDispatch();
  const [shouldFetchStudents, setShouldFetchStudents] = useState(false); // Apply button control

  const {
    filters,
    selectedCourseEncryptedId,
    courseOptions,
    batchesOptions,
    updateSelectedCourseEncryptedId,
    selectStudent,
    clearSelectedStudent,
    loading, // batch loading state
  } = usePayment();

  const { showPopup, showStickyBtn } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(setShowPopup(true));
    dispatch(setShowStickyBtn(false));
  }, [dispatch]);

  // ✅ API call students (Apply button এর পর call হবে)
  const {
    data: filteredStudents,
    isLoading: loadingFilteredStudents,
    error: studentsError, // এখানে properly define করলাম
  } = useGetStudentPaymentsByCourseBatchQuery(
    {
      encrypted_course_id: filters.course || "",
      encrypted_batch_id: filters.batch || "",
    },
    {
      skip: !shouldFetchStudents || !filters.course, // Apply করার পর এবং course থাকলে
      refetchOnMountOrArgChange: true,
    }
  );

  // student list নির্ধারণ
  const studentList = useMemo(() => {
    if (shouldFetchStudents && filters.course) {
      return filteredStudents?.data?.students || [];
    }
    return [];
  }, [shouldFetchStudents, filters, filteredStudents]);

  // courseBatchData prepare - এখানে logic ঠিক করুন
  const courseBatchData = useMemo(() => {
    return (courseOptions || []).map((course) => ({
      id: course.encrypted_id, // encrypted_id ব্যবহার করুন
      title: course.label || "",
      encrypted_id: course.encrypted_id || "",
      batches:
        course.encrypted_id === selectedCourseEncryptedId ? batchesOptions : [],
    }));
  }, [courseOptions, batchesOptions, selectedCourseEncryptedId]);

  // Course change করলে
  const handleCourseChange = (courseEncryptedId) => {
    // Redux state update করুন
    dispatch(setFilters({ course: courseEncryptedId || null }));

    // selectedCourseEncryptedId update করুন batch fetch এর জন্য
    updateSelectedCourseEncryptedId(courseEncryptedId);
  };

  // Apply filter function
  const handleApplyFilter = () => {
    if (filters.course) {
      setShouldFetchStudents(true);
      dispatch(setShowPopup(false));
      dispatch(setShowStickyBtn(true));
    } else {
      alert("Please select at least a course!");
    }
  };

  // Clear filters function
  const handleClearFilters = () => {
    dispatch(clearFilters());
    setShouldFetchStudents(false);
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
          onApply={handleApplyFilter}
          onClose={() => {
            dispatch(setShowPopup(false));
            dispatch(setShowStickyBtn(true));
          }}
          loading={loading} // batch loading state pass করুন
        />
      )}

      {/* Display filter info */}
      {shouldFetchStudents &&
        (filters.course || filters.batch || filters.search) && (
          <div className="bg-gray-100 p-3 mb-4 rounded-md mx-4">
            <h3 className="font-semibold">Active Filters:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {filters.course && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  Course:{" "}
                  {(courseOptions || []).find(
                    (c) => c.encrypted_id === filters.course
                  )?.label || "Unknown"}
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
                onClick={handleClearFilters}
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
        {/* API Error handling */}
        {studentsError && (
          <div className="text-center py-10 w-full">
            <p className="text-red-600 font-medium text-lg">
              {studentsError?.status === 403
                ? "Access denied. Please check your permissions."
                : "Error loading students. Please try again."}
            </p>
            <button
              onClick={() => setShouldFetchStudents(false)}
              className="mt-2 text-blue-600 underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Case 1: কোনো filter apply করা হয়নি */}
        {!shouldFetchStudents && (
          <div className="text-center py-10 w-full">
            <p className="text-gray-600 font-medium text-lg xl:text-3xl">
              Please select a course & batch to see the students
            </p>
          </div>
        )}

        {/* Case 2: filter apply আছে, কিন্তু কোনো student নেই */}
        {shouldFetchStudents &&
          !studentsError &&
          studentList.length === 0 &&
          !isLoading && (
            <div className="text-center py-10 w-full">
              <p className="text-gray-500">
                No students found with current filters
              </p>
            </div>
          )}

        {/* Case 3: student list আছে */}
        {!studentsError && studentList.length > 0 && (
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
