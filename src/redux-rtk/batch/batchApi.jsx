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
          method: "GET"
        };
      },
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

    // ADD A NEW BATCH
    addBatch: builder.mutation({
      query: ({ data }) => {
        return {
          url: "admin/batches",
          method: "POST",
          body: data
        };
      },
    }),

    // UPDATE A BATCH
    updateBatch: builder.mutation({
      query: ({ data, batchId }) => {
        return {
          url: `admin/batches/${batchId}`,
          method: "PUT",
          body: data
        };
      },
    }),

    // DELETE A BATCH
    deleteBatch: builder.mutation({
      query: ({ batchId }) => {
        return {
          url: `admin/batches/${batchId}`,
          method: "DELETE",
        };
      },
    }),

    toggleBatchStatus: builder.mutation({
      query: ({ batchId }) => {
        return {
          url: `admin/batches/${batchId}/toggle-status`,
          method: 'POST',
        };
      },
      // Invalidate the cache to refetch the updated data
      invalidatesTags: ['Batch'],
    }),

  }),
});

export const {
  useGetAllBatchsQuery,
  useAddBatchMutation,
  useDeleteBatchMutation,
  useUpdateBatchMutation,
  useToggleBatchStatusMutation
} = batchApi;