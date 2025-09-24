import {
  setNoticeData,
  setNoticeMetaData,
  setPublicNotices,
} from "./noticeSlice";
import { apiSlice } from "../api/apiSlice";

export const noticeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL COURSES
    getAllNotices: builder.query({
      query: (params = { page: 1, limit: 10 }) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `notices/?${queryString}`,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) => [
        { type: "Notice", id: "LIST" },
        { type: "Notice", id: `PAGE_${arg.page || 1}` },
      ],
      // Keep data fresh for 5 minutes
      keepUnusedDataFor: 300,
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          dispatch(setNoticeData(apiData));
          dispatch(setNoticeMetaData(apiData?.data.pagination));
        } catch (err) {
          console.error(err);
        }
      },
    }),

    getAllPublicNotices: builder.query({
      query: () => ({ url: `notices`, method: "GET" }),
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          dispatch(setPublicNotices(apiData));
        } catch (err) {
          console.error(err);
        }
      },
    }),

    getBranches: builder.query({
      query: () => "/branches",
      providesTags: ["Branches"],
    }),

    // Get Batches for a Notice
    getNoticeBatches: builder.query({
      query: (encrypted_notice_id) => `notices/${encrypted_notice_id}/batches`,
      // Add proper error handling and caching
      providesTags: (result, error, encrypted_notice_id) => [
        { type: "NoticeBatches", id: encrypted_notice_id },
      ],
    }),

    // ADD A NEW COURSE
    addNotice: builder.mutation({
      query: ({ data }) => {
        // Check if data is FormData or JSON
        const isFormData = data instanceof FormData;

        return {
          url: "notices",
          method: "POST",
          body: data,
          headers: isFormData
            ? {}
            : {
                "Content-Type": "application/json",
              },
        };
      },
      invalidatesTags: [{ type: "Notice", id: "LIST" }],
    }),

    // UPDATE A COURSE
    updateNotice: builder.mutation({
      query: ({ data, noticeId }) => {
        // Check if data is FormData or JSON
        const isFormData = data instanceof FormData;

        return {
          url: `notices/${noticeId}`,
          method: "PUT",
          body: data,
          headers: isFormData
            ? {}
            : {
                "Content-Type": "application/json",
              },
        };
      },
      invalidatesTags: [{ type: "Notice", id: "LIST" }],
    }),

    // DELETE A COURSE
    deleteNotice: builder.mutation({
      query: ({ noticeId }) => {
        return {
          url: `notices/${noticeId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Notice", id: "LIST" }],
    }),

    toggleNoticeStatus: builder.mutation({
      query: ({ noticeId }) => {
        return {
          url: `notices/${noticeId}/status`,
          method: "PATCH",
        };
      },
      // Invalidate the cache to refetch the updated data
      invalidatesTags: [{ type: "Notice", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllNoticesQuery,
  useGetAllPublicNoticesQuery,
  useAddNoticeMutation,
  useDeleteNoticeMutation,
  useUpdateNoticeMutation,
  useGetNoticeBatchesQuery,
  useGetBranchesQuery,
  useToggleNoticeStatusMutation,
} = noticeApi;
