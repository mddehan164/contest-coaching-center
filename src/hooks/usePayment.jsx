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
  setShowDetailsModal,
  setIsOpenAddModal,
  setSelectedStudentData,
  setSelectedPaymentData,
  setIsOpenEditModal,
} from "../redux-rtk/payment/paymentSlice";
import {
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
    selectedStudent,
    selectedStudentData,
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

  // 🔹 Query: Batches for selected course - এখানে encrypted_id ব্যবহার করুন
  const {
    data: batchesData,
    isLoading: loadingBatches,
    error: errorBatches,
  } = useGetCourseBatchesQuery(selectedCourseEncryptedId, {
    skip: !selectedCourseEncryptedId, // selectedCourseEncryptedId ব্যবহার করুন
    refetchOnMountOrArgChange: true,
  });

  // 🔹 Query: Filtered by course & batch - Apply filter এ click করার পর call হবে
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
      skip: !filters.course, // শুধু course থাকলেই fetch করবে
      refetchOnMountOrArgChange: true,
    }
  );

  // 🔹 Query: Single student payment details
  const {
    data: singlePayment,
    isLoading: loadingSingle,
    error: errorSingle,
    refetch: refetchStudentPayment,
  } = useGetPaymentByStudentQuery(
    { encrypted_student_id: selectedStudentData?.encrypted_id || "" },
    {
      skip: !selectedStudentData?.encrypted_id,
      refetchOnMountOrArgChange: true,
    }
  );

  // 🔹 Mutations
  const [addDetail, { isLoading: adding }] = useAddPaymentDetailMutation();
  const [editDetail, { isLoading: editing }] = useEditPaymentDetailMutation();
  const [toggleStatus, { isLoading: toggling }] =
    useTogglePaymentDetailStatusMutation();

  // 🔹 Select student
  const selectStudent = (student) => {
    dispatch(setSelectedStudent(student));
    dispatch(setSelectedStudentData(student)); // এই লাইনটা যোগ করো
  };

  // 🔹 Clear selected student
  const clearSelectedStudent = () => {
    dispatch(setSelectedStudent(null));
    dispatch(setSelectedStudentData(null));
  };

  // close details modal
  const closeDetailsModal = () => {
    dispatch(setShowDetailsModal(false));
  };

  // close add modal
  const closeAddModal = () => {
    dispatch(setIsOpenAddModal(false));
  };

  // 🔹 Select payment
  const selectPaymentData = (data) => {
    dispatch(setSelectedPaymentData(data));
  };

  // 🔹 clear Selected payment
  const clearPaymentData = () => {
    dispatch(setSelectedPaymentData(null));
  };

  // 🔹 clear Selected payment
  const closeEditModal = () => {
    dispatch(setIsOpenEditModal(false));
  };

  // 🔹 Add payment detail
  const addPaymentDetail = async (paymentId, detailData) => {
    try {
      const result = await addDetail({
        encrypted_payment_id: paymentId,
        detailData,
      }).unwrap();

      if (selectedStudentData) {
        refetchStudentPayment();
      }
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
        encrypted_payment_detail_id: paymentId,
        detailData,
      }).unwrap();

      if (selectedStudentData) {
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

      if (selectedStudent) {
        refetchStudentPayment();
      }

      return result;
    } catch (err) {
      console.error("Error toggling status:", err);
      throw err;
    }
  };

  // 🔹 Course options - এখানে encrypted_id store করুন
  const courseOptions = useMemo(() => {
    return (
      coursesData?.data?.courses?.map((course) => ({
        value: course.encrypted_id, // encrypted_id ব্যবহার করুন
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
    selectedStudent,
    selectedStudentData,
    filters,
    selectedCourseEncryptedId,
    loading,

    // API Data
    filteredPayments,
    loadingFiltered,
    errorFiltered,
    singlePayment,
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
    clearSelectedStudent,
    updateSelectedCourseEncryptedId,
    refetchStudentPayment,
    closeDetailsModal,
    closeAddModal,
    selectPaymentData,
    clearPaymentData,
    closeEditModal,
  };
};
