// paymentApi.js

import { apiSlice } from "../api/apiSlice";
import { setStudentPaymentData } from "./paymentSlice";

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getAllStudentsPayment: builder.query({
    //   query: ({ search } = {}) => {
    //     let url = `payments/students`; // 🔹 URL change: 'student' -> 'students'
    //     const params = new URLSearchParams();
    //     if (search) params.append("search", search);
    //     const qs = params.toString();
    //     if (qs) url += `?${qs}`;
    //     return {
    //       url,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["Payments"],
    //   keepUnusedDataFor: 300,
    //   async onQueryStarted(_args, { queryFulfilled, dispatch }) {
    //     try {
    //       const { data: apiData } = await queryFulfilled;
    //       // 🔹 API response structure change according to Postman
    //       // Response: { success: true, message: "...", data: { students: [...] } }
    //       dispatch(setStudentPaymentData(apiData.data?.students || []));
    //     } catch (err) {
    //       console.error("getAllStudentsPayment error:", err);
    //     }
    //   },
    // }),

    // 🔹 Get student payments filtered by Course & Batch
    getStudentPaymentsByCourseBatch: builder.query({
      query: ({ encrypted_course_id, encrypted_batch_id }) => ({
        // 🔹 URL change according to Postman
        url: `payments/students/filter?course_id=${encrypted_course_id}&batch_id=${encrypted_batch_id}`,
        method: "GET",
      }),
      providesTags: ["Payments"],
      // 🔹 Add onQueryStarted to handle response properly
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          // Response: { success: true, message: "...", data: { students: [...] } }
          dispatch(setStudentPaymentData(apiData.data?.students || []));
        } catch (err) {
          console.error("getStudentPaymentsByCourseBatch error:", err);
        }
      },
    }),

    // 🔹 Get payment by student ID
    getPaymentByStudent: builder.query({
      query: ({ encrypted_student_id }) => ({
        // 🔹 URL change according to Postman
        url: `payments/student/${encrypted_student_id}`,
        method: "GET",
      }),
      providesTags: (result, error, { encrypted_student_id }) => [
        { type: "StudentPayment", id: encrypted_student_id },
        "Payments",
      ],
    }),

    // 🔹 Add payment detail
    addPaymentDetail: builder.mutation({
      query: ({ encrypted_payment_id, detailData }) => ({
        // 🔹 URL change according to Postman
        url: `payments/${encrypted_payment_id}/add-detail`,
        method: "POST",
        body: detailData,
      }),
      invalidatesTags: ["Payments", "StudentPayment"],
    }),

    // 🔹 Edit payment detail
    editPaymentDetail: builder.mutation({
      query: ({ encrypted_payment_detail_id, detailData }) => ({
        // 🔹 URL change according to Postman
        url: `payment-details/${encrypted_payment_detail_id}`,
        method: "PUT",
        body: detailData,
      }),
      invalidatesTags: ["Payments", "StudentPayment"],
    }),

    // 🔹 Toggle payment detail status
    togglePaymentDetailStatus: builder.mutation({
      query: ({ encrypted_payment_detail_id }) => ({
        // 🔹 URL change according to Postman
        url: `payment-details/${encrypted_payment_detail_id}/toggle-status`,
        method: "POST",
      }),
      invalidatesTags: ["Payments", "StudentPayment"],
    }),
  }),
});

export const {
  useGetAllStudentsPaymentQuery,
  useGetStudentPaymentsByCourseBatchQuery,
  useGetPaymentByStudentQuery,
  useAddPaymentDetailMutation,
  useEditPaymentDetailMutation,
  useTogglePaymentDetailStatusMutation,
} = paymentApi;
