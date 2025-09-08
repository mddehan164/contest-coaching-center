// hooks/usePayment.js
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllCoursesQuery,
  useGetCourseBatchesQuery,
} from "../redux-rtk/course";
import { useGetAllStudentsQuery } from "../redux-rtk/student/studentApi";
import {
  setSelectedCourseEncryptedId,
  applyFilters,
} from "../redux-rtk/payment/paymentSlice";

export const usePayment = () => {
  const dispatch = useDispatch();

  // Get all payment states from Redux
  const paymentState = useSelector((state) => state.payment);

  // Fetch courses
  const { data: coursesData } = useGetAllCoursesQuery({
    page: 1,
    limit: 100,
  });

  // Fetch students with filters from payment state
  const { data: studentsData, isLoading: studentsLoading } =
    useGetAllStudentsQuery({
      page: 1,
      limit: 100,
      courseId: paymentState.courseId,
      batchId: paymentState.batchId,
      search: paymentState.search,
    });

  // Use the RTK Query hook for batches
  const { data: batchesData } = useGetCourseBatchesQuery(
    paymentState.selectedCourseEncryptedId,
    {
      skip: !paymentState.selectedCourseEncryptedId,
      refetchOnMountOrArgChange: true,
    }
  );

  // Memoize course options
  const courseOptions = useMemo(() => {
    return (
      coursesData?.data?.courses?.map((course) => ({
        value: course.id,
        label: course.title,
        encrypted_id: course.encrypted_id,
      })) || []
    );
  }, [coursesData?.data?.courses]);

  // Process batches data to match the expected format
  const batchesOptions = useMemo(() => {
    if (!batchesData?.success || !batchesData?.data?.batches) return [];

    return batchesData.data.batches.map((batch) => ({
      value: batch.id,
      label: batch.title || batch.name || `Batch ${batch.id}`,
    }));
  }, [batchesData]);

  // Update selected course encrypted ID
  const updateSelectedCourseEncryptedId = (encryptedId) => {
    dispatch(setSelectedCourseEncryptedId(encryptedId));
  };

  // Apply filters
  const applyPaymentFilters = (filters) => {
    dispatch(applyFilters(filters));
  };

  return {
    // Payment state
    ...paymentState,

    // Data
    courseOptions,
    batchesOptions,
    students: studentsData?.data?.students || [],
    studentsLoading,

    // Actions
    updateSelectedCourseEncryptedId,
    applyPaymentFilters,
  };
};
