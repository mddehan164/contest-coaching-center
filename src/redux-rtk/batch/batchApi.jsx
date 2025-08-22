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
          dispatch(setBatchMetaData(apiData?.meta));
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
          method: "PATCH",
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


  }),
});

export const {
  useGetAllBatchsQuery,
  useAddBatchMutation,
  useDeleteBatchMutation,
  useUpdateBatchMutation,
} = batchApi;