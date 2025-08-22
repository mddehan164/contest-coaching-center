import { setCourseData, setCourseMetaData } from "./courseSlice";
import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // GET ALL COURSES
    getAllCourses: builder.query({
      query: (params = { page: 1, limit: 10 }) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `admin/courses/?${queryString}`,
          method: "GET"
        };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          dispatch(setCourseData(apiData));
          dispatch(setCourseMetaData(apiData?.meta));
        } catch (err) {
          console.error(err);
        }
      },
    }),

    // ADD A NEW COURSE
    addCourse: builder.mutation({
      query: ({ data }) => {
        return {
          url: "admin/courses",
          method: "POST",
          body: data
        };
      },
    }),

    // UPDATE A COURSE
    updateCourse: builder.mutation({
      query: ({ data, courseId }) => {
        return {
          url: `admin/courses/${courseId}`,
          method: "PATCH",
          body: data
        };
      },
    }),

    // DELETE A COURSE
    deleteCourse: builder.mutation({
      query: ({ courseId }) => {
        return {
          url: `admin/courses/${courseId}`,
          method: "DELETE",
        };
      },
    }),


  }),
});

export const {
  useGetAllCoursesQuery,
  useAddCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} = courseApi;