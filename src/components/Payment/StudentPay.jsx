// components/StudentPay.jsx
import { useMemo } from "react";
import FilterPerson from "../FilterPerson";
import FilterBox from "../FilterBox";
import { usePayment } from "../../hooks/usePayment";
import { useDispatch } from "react-redux";
import {
  setShowPopup,
  setShowStickyBtn,
  setDraftCourse,
  setDraftBatch,
  setDraftQuery,
  resetFilters,
} from "../../redux-rtk/payment/paymentSlice";

const StudentPay = () => {
  const dispatch = useDispatch();
  const {
    // State from Redux
    showPopup,
    showStickyBtn,
    courseId,
    batchId,
    search,
    draftCourse,
    draftBatch,
    draftQuery,
    selectedCourseEncryptedId,

    // Data
    courseOptions,
    batchesOptions,
    students,
    studentsLoading,

    // Actions
    updateSelectedCourseEncryptedId,
    applyPaymentFilters,
  } = usePayment();

  // Get students from Redux store as fallback
  // শুধু filter select করলে students আসবে, না হলে empty array
  const studentList =
    draftCourse || draftBatch || draftQuery
      ? students.filter((s) => {
          // course filter
          const byCourse = draftCourse
            ? s.course_id === Number(draftCourse)
            : true;

          // batch filter
          const byBatch = draftBatch ? s.batch_id === Number(draftBatch) : true;

          // optional search filter
          const bySearch = draftQuery
            ? JSON.stringify(s).toLowerCase().includes(draftQuery.toLowerCase())
            : true;

          return byCourse && byBatch && bySearch;
        })
      : [];

  // Prepare courseBatchData for FilterBox
  const courseBatchData = useMemo(() => {
    return courseOptions.map((course) => ({
      id: course.value,
      title: course.label,
      encrypted_id: course.encrypted_id,
      batches:
        course.encrypted_id === selectedCourseEncryptedId ? batchesOptions : [], // শুধু select করা course-এর batch দেখাবে
    }));
  }, [courseOptions, batchesOptions, selectedCourseEncryptedId]);

  // Handle course selection change in popup
  const handleDraftCourseChange = (courseId) => {
    dispatch(setDraftCourse(courseId));

    // Find the selected course
    const selectedCourse = courseOptions.find(
      (course) => course.value === courseId
    );
    if (selectedCourse) {
      // Set the encrypted_id so batches load for this course
      updateSelectedCourseEncryptedId(selectedCourse.encrypted_id);
    }

    // Reset batch
    dispatch(setDraftBatch(null));
  };

  if (studentsLoading) {
    return (
      <div className="relative pt-20 flex justify-center items-center h-64">
        <div className="text-lg">Loading students...</div>
      </div>
    );
  }

  return (
    <div className="relative pt-20">
      {/* Sticky Button */}
      {showStickyBtn && (
        <button
          onClick={() => {
            // Prefill drafts from current filters
            dispatch(setDraftCourse(courseId));

            // Find encrypted_id for the selected course
            if (courseId) {
              const selectedCourse = courseOptions.find(
                (course) => course.value === courseId
              );
              if (selectedCourse) {
                updateSelectedCourseEncryptedId(selectedCourse.encrypted_id);
              }
            }

            dispatch(setDraftBatch(batchId));
            dispatch(setDraftQuery(search));
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
          selectedCourse={draftCourse}
          setSelectedCourse={handleDraftCourseChange}
          selectedBatch={draftBatch}
          setSelectedBatch={(batchId) => dispatch(setDraftBatch(batchId))}
          query={draftQuery}
          setQuery={(query) => dispatch(setDraftQuery(query))}
          onApply={() => {
            // Apply filters to Redux store
            applyPaymentFilters({
              courseId: draftCourse,
              batchId: draftBatch,
              search: draftQuery,
            });

            dispatch(setShowPopup(false));
            dispatch(setShowStickyBtn(true));
          }}
          onClose={() => {
            // যদি কোনো student না থাকে তাহলে cross কাজ করবে না
            if (studentList.length === 0) return;

            // Close → RESET draft to current filters
            dispatch(setDraftCourse(courseId));
            dispatch(setDraftBatch(batchId));
            dispatch(setDraftQuery(search));
            dispatch(setShowPopup(false));
            dispatch(setShowStickyBtn(true));
          }}
        />
      )}

      {/* Display filter info */}
      {(courseId || batchId || search) && (
        <div className="bg-gray-100 p-3 mb-4 rounded-md mx-4">
          <h3 className="font-semibold">Active Filters:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {courseId && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                Course: {courseOptions.find((c) => c.value === courseId)?.label}
              </span>
            )}
            {batchId && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                Batch: {batchesOptions.find((b) => b.value === batchId)?.label}
              </span>
            )}
            {search && (
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                Search: "{search}"
              </span>
            )}
            <button
              onClick={() => dispatch(resetFilters())}
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
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {/* Case 1: কিছুই select করা হয়নি */}
        {!courseId && !batchId && !search && (
          <div className="text-center py-10 w-full">
            <p className="text-gray-600 font-medium text-lg xl:text-3xl">
              Please select a course & batch to see students
            </p>
          </div>
        )}

        {/* Case 2: Filter select করা আছে, কিন্তু কোনো student নেই */}
        {(courseId || batchId || search) && studentList.length === 0 && (
          <div className="text-center py-10 w-full">
            <p className="text-gray-500">No students match your filters</p>
          </div>
        )}

        {/* Case 3: Student আছে */}
        {studentList.length > 0 && (
          <FilterPerson dataList={studentList} person="student" />
        )}
      </div>
    </div>
  );
};

export default StudentPay;
