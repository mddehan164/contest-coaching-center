import { setTeacherData, setTeacherMetaData } from "./teacherSlice";
import { apiSlice } from "../api/apiSlice";

export const teacherApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // GET ALL BATCHES
    getAllTeachers: builder.query({
      query: (params = { page: 1, limit: 10 }) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `teachers/?${queryString}`,
          method: "GET"
        };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          dispatch(setTeacherData(apiData));
          dispatch(setTeacherMetaData(apiData?.data.pagination));
        } catch (err) {
          console.error(err);
        }
      },
    }),

    // ADD A NEW BATCH
    addTeacher: builder.mutation({
      query: ({ data }) => {
        return {
          url: "/teachers",
          method: "POST",
          body: data
        };
      },
    }),

    // UPDATE A BATCH
    updateTeacher: builder.mutation({
      query: ({ data, teacherId }) => {
        return {
          url: `teachers/${teacherId}`,
          method: "PUT",
          body: data
        };
      },
    }),

    // DELETE A BATCH
    deleteTeacher: builder.mutation({
      query: ({ teacherId }) => {
        return {
          url: `admin/teacheres/${teacherId}`,
          method: "DELETE",
        };
      },
    }),


  }),
});

export const {
  useGetAllTeachersQuery,
  useAddTeacherMutation,
  useDeleteTeacherMutation,
  useUpdateTeacherMutation,
} = teacherApi;