// hooks/usePayment.js
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllCoursesQuery,
  useGetCourseBatchesQuery,
} from "../redux-rtk/course";
import {
  setSelectedCourseEncryptedId,
  setSelectedStudentPayment,
} from "../redux-rtk/payment/paymentSlice";
import {
  useGetAllStudentsPaymentQuery,
  useAddPaymentDetailMutation,
  useEditPaymentDetailMutation,
  useTogglePaymentDetailStatusMutation,
  useGetPaymentByStudentQuery,
} from "../redux-rtk/payment/paymentApi";

export const usePayment = () => {
  const dispatch = useDispatch();

  const { studentPayments, selectedStudentPayment } = useSelector(
    (state) => state.payment
  );

  const { data: singlePayment, isLoading: loadingSingle } =
    useGetPaymentByStudentQuery(
      { encrypted_student_id: selectedStudentPayment?.id },
      { skip: !selectedStudentPayment?.id }
    );

  const [addDetail, { isLoading: adding }] = useAddPaymentDetailMutation();
  const [toggleStatus, { isLoading: toggling }] =
    useTogglePaymentDetailStatusMutation();

  const selectPayment = (payment) => {
    dispatch(setSelectedStudentPayment(payment));
  };

  const addPaymentDetail = async (paymentId, detailData) => {
    try {
      await addDetail({ encrypted_payment_id: paymentId, detailData }).unwrap();
      // optional: success message
    } catch (err) {
      // error handle
    }
  };

  const toggleDetailStatus = async (detailId) => {
    try {
      await toggleStatus({ encrypted_payment_detail_id: detailId }).unwrap();
    } catch (err) {
      // error handle
    }
  };

  // inside component or custom hook

  // Get all payment states from Redux
  const paymentState = useSelector((state) => state.payment);

  // Fetch courses
  const { data: coursesData } = useGetAllCoursesQuery({
    page: 1,
    limit: 100,
  });
  const handleAddDetail = async (paymentId, detailData) => {
    try {
      const result = await addPaymentDetail({
        encrypted_payment_id: paymentId,
        detailData,
      }).unwrap();
      // result e tumi response pabe, jodi backend response thik thake
      console.log("Added payment detail:", result);
    } catch (err) {
      console.error("Error adding payment detail:", err);
    }
  };

  // function to toggle status
  const handleToggleStatus = async (detailId) => {
    try {
      const result = await toggleDetailStatus({
        encrypted_payment_detail_id: detailId,
      }).unwrap();
      console.log("Toggled status:", result);
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

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

    // Actions
    updateSelectedCourseEncryptedId,

    singlePayment,
    loadingSingle,
    adding,
    toggling,
    selectPayment,
    addPaymentDetail,
    toggleDetailStatus,
  };
};
