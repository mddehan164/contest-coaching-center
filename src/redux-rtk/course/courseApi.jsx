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
      providesTags: ['Courses'],
      keepUnusedDataFor: 300, // Keep cache for 5 minutes
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          dispatch(setCourseData(apiData));
          dispatch(setCourseMetaData(apiData?.data.pagination));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    getBranches: builder.query({
      query: () => '/branches',
      providesTags: ['Branches'],
    }),

    // Get Batches for a Course
    getCourseBatches: builder.query({
      query: (encrypted_course_id) => `admin/courses/${encrypted_course_id}/batches`,
      // Add proper error handling and caching
      providesTags: (result, error, encrypted_course_id) => [
        { type: 'CourseBatches', id: encrypted_course_id }
      ],
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
      invalidatesTags: ['Courses'],
    }),

    // UPDATE A COURSE
    updateCourse: builder.mutation({
      query: ({ data, courseId }) => {
        return {
          url: `admin/courses/${courseId}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ['Courses'],
    }),

    // DELETE A COURSE
    deleteCourse: builder.mutation({
      query: ({ courseId }) => {
        return {
          url: `admin/courses/${courseId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ['Courses'],
    }),

    toggleCourseStatus: builder.mutation({
      query: ({ courseId }) => {
        return {
          url: `admin/courses/${courseId}/toggle-status`,
          method: 'POST',
        };
      },
      // Invalidate the cache to refetch the updated data
      invalidatesTags: ['Courses'],
    }),


  }),
});

export const {
  useGetAllCoursesQuery,
  useAddCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
  useGetCourseBatchesQuery,
  useGetBranchesQuery,
  useToggleCourseStatusMutation
} = courseApi;