import { setBranchData, setBranchMetaData } from "./branchSlice";
import { apiSlice } from "../api/apiSlice";

export const branchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // GET ALL BRANCHES
    getAllBranches: builder.query({
      query: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `branches${queryString ? `?${queryString}` : ''}`,
          method: "GET"
        };
      },
      providesTags: ['Branches'],
      keepUnusedDataFor: 300, // Keep cache for 5 minutes
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          dispatch(setBranchData(apiData));
          
          // Set meta data based on response
          if (apiData?.data?.showing_all) {
            dispatch(setBranchMetaData({
              totalItems: apiData.data.total,
              totalPages: 1,
              currentPage: 1,
              pageSize: apiData.data.total,
              hasNextPage: false,
              hasPreviousPage: false,
            }));
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),

    // ADD A NEW BRANCH
    addBranch: builder.mutation({
      query: ({ data }) => {
        return {
          url: "branches",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ['Branches'],
    }),

    // UPDATE A BRANCH
    updateBranch: builder.mutation({
      query: ({ data, branchId }) => {
        return {
          url: `branches/${branchId}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ['Branches'],
    }),

    // DELETE A BRANCH
    deleteBranch: builder.mutation({
      query: ({ branchId }) => {
        return {
          url: `branches/${branchId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ['Branches'],
    }),

    // TOGGLE BRANCH STATUS
    toggleBranchStatus: builder.mutation({
      query: ({ branchId }) => {
        return {
          url: `branches/${branchId}/status`,
          method: "PATCH",
        };
      },
      invalidatesTags: ['Branches'],
    }),

  }),
});

export const {
  useGetAllBranchesQuery,
  useAddBranchMutation,
  useDeleteBranchMutation,
  useUpdateBranchMutation,
  useToggleBranchStatusMutation,
} = branchApi;
