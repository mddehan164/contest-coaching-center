// paymentApi.js

import { apiSlice } from "../api/apiSlice";
import {
  setStudentPaymentData,
  // setSelectedStudentPayment,
  // setFilters,
} from "./paymentSlice";

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudentsPayment: builder.query({
      query: ({ search } = {}) => {
        let url = `payments/student`;
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        const qs = params.toString();
        if (qs) url += `?${qs}`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Payments"],
      keepUnusedDataFor: 300,
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          // apiData আসবে তেমন: { success: true, message: "...", data: { payment: {...} } }
          dispatch(setStudentPaymentData(apiData.data));
        } catch (err) {
          console.error("getAllStudentsPayment error:", err);
        }
      },
    }),

    getPaymentByStudent: builder.query({
      query: ({ encrypted_student_id }) => ({
        url: `payments/student/${encrypted_student_id}`,
        method: "GET",
      }),
      providesTags: (result, error, { encrypted_student_id }) => [
        { type: "Payments", id: encrypted_student_id },
      ],
    }),

    addPaymentDetail: builder.mutation({
      query: ({ encrypted_payment_id, detailData }) => ({
        url: `payments/${encrypted_payment_id}/add-detail`,
        method: "POST",
        body: detailData,
      }),
      invalidatesTags: ["Payments"],
    }),

    editPaymentDetail: builder.mutation({
      query: ({ encrypted_payment_id, detailData }) => ({
        url: `/payment-details/${encrypted_payment_id}`,
        method: "PUT",
        body: detailData,
      }),
      invalidatesTags: ["Payments"],
    }),

    togglePaymentDetailStatus: builder.mutation({
      query: ({ encrypted_payment_detail_id }) => ({
        url: `payment-details/${encrypted_payment_detail_id}/toggle-status`,
        method: "POST",
      }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

export const {
  useGetAllStudentsPaymentQuery,
  useGetPaymentByStudentQuery,
  useAddPaymentDetailMutation,
  useEditPaymentDetailMutation,
  useTogglePaymentDetailStatusMutation,
} = paymentApi;
