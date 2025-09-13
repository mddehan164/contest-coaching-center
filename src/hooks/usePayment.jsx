// hooks/usePayment.js
import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllCoursesQuery,
  useGetCourseBatchesQuery,
} from "../redux-rtk/course";
import {
  setSelectedCourseEncryptedId,
  setSelectedStudent,
  setLoading,
} from "../redux-rtk/payment/paymentSlice";
import {
  // useGetAllStudentsPaymentQuery,
  useGetStudentPaymentsByCourseBatchQuery,
  useAddPaymentDetailMutation,
  useEditPaymentDetailMutation,
  useTogglePaymentDetailStatusMutation,
  useGetPaymentByStudentQuery,
} from "../redux-rtk/payment/paymentApi";

export const usePayment = () => {
  const dispatch = useDispatch();

  // Redux state
  const {
    studentPayments,
    selectedStudent, // selected student state
    filters,
    selectedCourseEncryptedId,
    loading,
  } = useSelector((state) => state.payment);

  // 🔹 Query: All courses
  const {
    data: coursesData,
    isLoading: loadingCourses,
    error: errorCourses,
  } = useGetAllCoursesQuery();

  // 🔹 Query: Batches for selected course
  const {
    data: batchesData,
    isLoading: loadingBatches,
    error: errorBatches,
  } = useGetCourseBatchesQuery(selectedCourseEncryptedId, {
    skip: !selectedCourseEncryptedId,
    refetchOnMountOrArgChange: true,
  });

  // 🔹 Query: All students payment (with search filter)
  // const {
  //   data: allPayments,
  //   isLoading: loadingAll,
  //   error: errorAll,
  // } = useGetAllStudentsPaymentQuery(
  //   { search: filters.search || "" },
  //   {
  //     skip: !!(filters.course || filters.batch),
  //     refetchOnMountOrArgChange: true,
  //   }
  // );

  // 🔹 Query: Filtered by course & batch
  const {
    data: filteredPayments,
    isLoading: loadingFiltered,
    error: errorFiltered,
  } = useGetStudentPaymentsByCourseBatchQuery(
    {
      encrypted_course_id: filters.course || "",
      encrypted_batch_id: filters.batch || "",
    },
    {
      skip: !filters.course || !filters.batch,
      refetchOnMountOrArgChange: true,
    }
  );

  // 🔹 Query: Single student payment details - selected student এর জন্য
  const {
    data: singlePayment,
    isLoading: loadingSingle,
    error: errorSingle,
    refetch: refetchStudentPayment,
  } = useGetPaymentByStudentQuery(
    { encrypted_student_id: selectedStudent?.encrypted_id || "" },
    {
      skip: !selectedStudent?.encrypted_id,
      refetchOnMountOrArgChange: true,
    }
  );

  // 🔹 Mutations
  const [addDetail, { isLoading: adding }] = useAddPaymentDetailMutation();
  const [editDetail, { isLoading: editing }] = useEditPaymentDetailMutation();
  const [toggleStatus, { isLoading: toggling }] =
    useTogglePaymentDetailStatusMutation();

  // 🔹 Select student - এই function টি student select করবে
  const selectStudent = (student) => {
    dispatch(setSelectedStudent(student));
  };

  // 🔹 Clear selected student
  const clearSelectedStudent = () => {
    dispatch(setSelectedStudent(null));
  };

  // 🔹 Add payment detail
  const addPaymentDetail = async (paymentId, detailData) => {
    try {
      const result = await addDetail({
        encrypted_payment_id: paymentId,
        detailData,
      }).unwrap();

      // Payment add করার পরে selected student এর data refresh করুন
      if (selectedStudent) {
        refetchStudentPayment();
      }

      return result;
    } catch (err) {
      console.error("Error adding payment detail:", err);
      throw err;
    }
  };

  // 🔹 Edit payment detail
  const editPaymentDetail = async (paymentId, detailData) => {
    try {
      const result = await editDetail({
        encrypted_payment_id: paymentId,
        detailData,
      }).unwrap();

      // Payment edit করার পরে selected student এর data refresh করুন
      if (selectedStudent) {
        refetchStudentPayment();
      }

      return result;
    } catch (err) {
      console.error("Error editing payment detail:", err);
      throw err;
    }
  };

  // 🔹 Toggle detail status
  const toggleDetailStatus = async (detailId) => {
    try {
      const result = await toggleStatus({
        encrypted_payment_detail_id: detailId,
      }).unwrap();

      // Status toggle করার পরে selected student এর data refresh করুন
      if (selectedStudent) {
        refetchStudentPayment();
      }

      return result;
    } catch (err) {
      console.error("Error toggling status:", err);
      throw err;
    }
  };

  // 🔹 Course options
  const courseOptions = useMemo(() => {
    return (
      coursesData?.data?.courses?.map((course) => ({
        value: course.encrypted_id,
        label: course.title,
        encrypted_id: course.encrypted_id,
      })) || []
    );
  }, [coursesData]);

  // 🔹 Batch options
  const batchesOptions = useMemo(() => {
    if (!batchesData?.success || !batchesData?.data?.batches) return [];
    return batchesData.data.batches.map((batch) => ({
      value: batch.encrypted_id,
      label: batch.name || `Batch ${batch.id}`,
    }));
  }, [batchesData]);

  // 🔹 Update selected course encrypted ID
  const updateSelectedCourseEncryptedId = (encryptedId) => {
    dispatch(setSelectedCourseEncryptedId(encryptedId));
  };

  // 🔹 Loading states management
  useEffect(() => {
    dispatch(
      setLoading({
        courses: loadingCourses,
        batches: loadingBatches,
      })
    );
  }, [loadingCourses, loadingBatches, dispatch]);

  return {
    // Redux state
    studentPayments,
    selectedStudent, // selected student return করুন
    filters,
    selectedCourseEncryptedId,
    loading,

    // API Data
    // allPayments,
    // loadingAll,
    // errorAll,
    filteredPayments,
    loadingFiltered,
    errorFiltered,
    singlePayment, // selected student এর payment data
    loadingSingle,
    errorSingle,

    // Course & Batch options
    courseOptions,
    batchesOptions,

    // Mutations
    adding,
    editing,
    toggling,
    addPaymentDetail,
    editPaymentDetail,
    toggleDetailStatus,

    // Actions
    selectStudent,
    clearSelectedStudent, // নতুন function
    updateSelectedCourseEncryptedId,
    refetchStudentPayment, // refetch function
  };
};
