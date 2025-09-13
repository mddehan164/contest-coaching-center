import { setBatchData, setBatchMetaData } from "./batchSlice";
import { apiSlice } from "../api/apiSlice";

export const batchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL BATCHES
    getAllBatchs: builder.query({
      query: (params = { page: 1, limit: 10 }) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `admin/batches/?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["Batches"],
      keepUnusedDataFor: 300, // Keep cache for 5 minutes
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          dispatch(setBatchData(apiData));
          dispatch(setBatchMetaData(apiData?.data?.pagination));
        } catch (err) {
          console.error(err);
        }
      },
    }),

    // get batch by courseId
    getAllBatchByCourse: builder.query({
      query: ({ batchId }) => {
        return {
          url: `admin/batches/${batchId}`,
          method: "GET",
        };
      },
    }),
    // ADD A NEW BATCH
    addBatch: builder.mutation({
      query: ({ data }) => {
        return {
          url: "admin/batches",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Batches"],
    }),

    // UPDATE A BATCH
    updateBatch: builder.mutation({
      query: ({ data, batchId }) => {
        return {
          url: `admin/batches/${batchId}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Batches"],
    }),

    // View by id
    getBatchById: builder.query({
      query: (batchId) => ({
        url: `admin/batches/${batchId}`,
        method: "GET", // সঠিক মেথড
      }),
      providesTags: ["Batches"], // চাইলে এটা যোগ করতে পারেন কাশ ইনভ্যালিডেশনের জন্য
      keepUnusedDataFor: 300, // ৫ মিনিট ক্যাশ রাখতে
    }),

    toggleBatchStatus: builder.mutation({
      query: ({ batchId }) => {
        return {
          url: `admin/batches/${batchId}/toggle-status`,
          method: "POST",
        };
      },
      // Invalidate the cache to refetch the updated data
      invalidatesTags: ["Batches"],
    }),
  }),
});

export const {
  useGetAllBatchsQuery,
  useAddBatchMutation,
  useDeleteBatchMutation,
  useGetBatchByIdQuery,
  useUpdateBatchMutation,
  useToggleBatchStatusMutation,
  useGetAllBatchByCourseQuery,
} = batchApi;
