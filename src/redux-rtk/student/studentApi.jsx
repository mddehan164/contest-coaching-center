import { setStudentData, setStudentMetaData } from "./studentSlice";
import { apiSlice } from "../api/apiSlice";

export const studentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // GET ALL BATCHES
    getAllStudents: builder.query({
      query: (params = { page: 1, limit: 10 }) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `students/?${queryString}`,
          method: "GET"
        };
      },
      providesTags: ['Students'],
      keepUnusedDataFor: 300, // Keep cache for 5 minutes
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          dispatch(setStudentData(apiData));
          dispatch(setStudentMetaData(apiData?.data.pagination));
        } catch (err) {
          console.error(err);
        }
      },
    }),

    // ADD A NEW BATCH
    addStudent: builder.mutation({
      query: ({ data }) => {
        return {
          url: "students",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ['Students'],
    }),

    // UPDATE A BATCH
    updateStudent: builder.mutation({
      query: ({ data, studentId }) => {
        return {
          url: `students/${studentId}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ['Students'],
    }),

    // DELETE A BATCH
    deleteStudent: builder.mutation({
      query: ({ studentId }) => {
        return {
          url: `admin/studentes/${studentId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ['Students'],
    }),


  }),
});

export const {
  useGetAllStudentsQuery,
  useAddStudentMutation,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} = studentApi;