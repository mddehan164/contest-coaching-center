import { setNoticeData, setNoticeMetaData } from "./noticeSlice";
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
        return {
          url: "notices",
          method: "POST",
          body: data,
        };
      },
    }),

    // UPDATE A COURSE
    updateNotice: builder.mutation({
      query: ({ data, noticeId }) => {
        return {
          url: `notices/${noticeId}`,
          method: "PUT",
          body: data,
        };
      },
    }),

    // DELETE A COURSE
    deleteNotice: builder.mutation({
      query: ({ noticeId }) => {
        return {
          url: `notices/${noticeId}`,
          method: "DELETE",
        };
      },
    }),

    toggleNoticeStatus: builder.mutation({
      query: ({ noticeId }) => {
        return {
          url: `notices/${noticeId}/toggle-status`,
          method: "PATCH",
        };
      },
      // Invalidate the cache to refetch the updated data
      invalidatesTags: ["Notices"],
    }),
  }),
});

export const {
  useGetAllNoticesQuery,
  useAddNoticeMutation,
  useDeleteNoticeMutation,
  useUpdateNoticeMutation,
  useGetNoticeBatchesQuery,
  useGetBranchesQuery,
  useToggleNoticeStatusMutation,
} = noticeApi;
