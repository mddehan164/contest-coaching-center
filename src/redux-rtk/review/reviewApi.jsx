import { setReviewData, setReviewMetaData } from "./reviewSlice";
import { apiSlice } from "../api/apiSlice";

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // GET ALL REVIEWS
    getAllReviews: builder.query({
      query: (params = { page: 1, limit: 10 }) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `reviews/?${queryString}`,
          method: "GET"
        };
      },
      providesTags: (result, error, arg) => [
        { type: 'Review', id: 'LIST' },
        { type: 'Review', id: `PAGE_${arg.page || 1}` },
      ],
      keepUnusedDataFor: 300, // Keep cache for 5 minutes
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          dispatch(setReviewData(apiData));
          dispatch(setReviewMetaData(apiData?.data?.pagination));
        } catch (err) {
          console.error(err);
        }
      },
    }),

    // ADD A NEW REVIEW
    addReview: builder.mutation({
      query: ({ data }) => {
        return {
          url: "reviews",
          method: "POST",
          body: data
        };
      },
      // Remove cache invalidation to prevent refetching
    }),

    // UPDATE A REVIEW
    updateReview: builder.mutation({
      query: ({ data, reviewId }) => {
        return {
          url: `reviews/${reviewId}`,
          method: "PUT",
          body: data
        };
      },
      // Remove cache invalidation to prevent refetching
    }),

    // DELETE A REVIEW
    deleteReview: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `reviews/${reviewId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ['Reviews'],
    }),

    // TOGGLE REVIEW STATUS
    toggleReviewStatus: builder.mutation({
      query: ({ reviewId }) => {
        return {
          url: `reviews/${reviewId}/status`,
          method: 'PATCH',
        };
      },
      invalidatesTags: ['Reviews'],
    }),

  }),
});

export const {
  useGetAllReviewsQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
  useToggleReviewStatusMutation,
} = reviewApi;
