import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  appendNewDataToPaginatedList,
  viewDataFromPaginatedList,
  setPaginatedDataFromApi,
  updateDataInDataList,
  updateDataInPaginatedPages,
} from "../utils/reduxHelper";
import {
  fetchCourses as fetchCoursesApi,
  fetchCourseById,
} from "../../services/course";

// Async thunk: fetch one page
export const fetchCoursesPage = createAsyncThunk(
  "courses/fetchCoursesPage",
  async ({ page = 1, pageSize = 10 }) => {
    const res = await fetchCoursesApi(page, pageSize);
    // ধরে নিচ্ছি API returns response.data.courses এবং pagination
    return {
      courses: res.data.courses,
      pagination: res.data.pagination,
      page,
    };
  }
);
export const fetchCourseByIdThunk = createAsyncThunk(
  "course/fetchCourseById",
  async (id) => {
    const response = await fetchCourseById(id);
    return response;
  }
);

const initialState = {
  dataList: [],
  data: {},
  selectedData: null,
  encryptedId: {},
  allCoursesLoaded: false,
  course: null,
  loading: false,
  error: null,
  isAddModalOpen: false,
  isEditModalOpen: false,
  isConfirmModalOpen: false,
  pages: {}, // page number গুলো key, value হবে array of course objects

  meta: {
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseDataList: (state, action) => {
      // directly assign plain list
      state.dataList = action.payload.data;
    },
    setCurrentPage: (state, action) => {
      state.meta.currentPage = action.payload;
    },
    setEncryptedId: (state, action) => {
      state.encryptedId = action.payload;
    },

    setCourseData: (state, action) => {
      const { courses, pagination } = action.payload.data;

      const meta = {
        totalItems: pagination.total,
        totalPages: pagination.last_page,
        currentPage: pagination.current_page,
        pageSize: pagination.per_page,
        hasNextPage: pagination.current_page < pagination.last_page,
        hasPreviousPage: pagination.current_page > 1,
      };

      const result = setPaginatedDataFromApi({
        incomingData: courses,
        incomingMeta: meta,
        existingData: state.data,
        existingMeta: state.meta,
      });

      state.meta = result.meta;
      state.data = result.data;
      state.dataList = result.dataList;
    },

    addNewCourseToList: (state, action) => {
      const newCourse = {
        ...action.payload,
      };

      const result = appendNewDataToPaginatedList({
        meta: state.meta,
        data: state.data,
        dataList: state.dataList,
        newItem: newCourse,
      });

      state.meta = result.meta;
      state.data = result.data;
      state.dataList = result.dataList;
    },

    updateCourseInList: (state, action) => {
      state.dataList = updateDataInDataList({
        dataList: state.dataList,
        updatedItem: action.payload,
      });

      state.data = updateDataInPaginatedPages({
        data: state.data,
        meta: state.meta,
        updatedItem: action.payload,
      });
    },

    viewCourseFromList: (state, action) => {
      const result = viewDataFromPaginatedList({
        meta: state.meta,
        data: state.data,
        dataList: state.dataList,
        idToView: action.payload.id, // your API uses "id" not "_id"
      });

      state.meta = result.meta;
      state.data = result.data;
      state.dataList = result.dataList;
    },

    setCourseMetaData: (state, action) => {
      state.meta = { ...state.meta, ...action.payload };
      const updateKey = Object.keys(action.payload)[0];
      if (updateKey === "currentPage") {
        state.dataList = state.data[`page${action.payload.currentPage}`] || [];
      }

      if (updateKey === "pageSize") {
        state.meta = { ...state.meta, pageSize: action.payload.pageSize };
      }
    },

    setSelectedCourseData: (state, action) => {
      state.selectedData = action.payload;
    },

    setCourseConfirmationModal: (state, action) => {
      state.isConfirmModalOpen = action.payload;
    },

    setAddCourseModal: (state, action) => {
      state.isAddModalOpen = action.payload;
    },

    setEditCourseModal: (state, action) => {
      state.isEditModalOpen = action.payload;
    },
    updateCourseStatus: (state, action) => {
      const { courseId, status } = action.payload;

      // Update in dataList
      state.dataList = state.dataList.map((item) =>
        item.encrypted_id === courseId ? { ...item, status } : item
      );

      // Update in paginated data
      Object.keys(state.data).forEach((pageKey) => {
        state.data[pageKey] = state.data[pageKey].map((item) =>
          item.encrypted_id === courseId ? { ...item, status } : item
        );
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ আগের fetchCoursesPage cases
      .addCase(fetchCoursesPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoursesPage.fulfilled, (state, action) => {
        const { page, courses, pagination } = action.payload;
        state.pages[page] = courses;
        state.meta = {
          totalItems: pagination.total,
          totalPages: pagination.last_page,
          currentPage: pagination.current_page,
          pageSize: pagination.per_page,
          hasNextPage: pagination.current_page < pagination.last_page,
          hasPreviousPage: pagination.current_page > 1,
        };
        state.loading = false;
      })
      .addCase(fetchCoursesPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ✅ নতুন fetchCourseByIdThunk cases
      .addCase(fetchCourseByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.course = null; // নতুন load এর আগে reset
      })
      .addCase(fetchCourseByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        // এখানে API response কেমন তার উপর নির্ভর করছে
        // 👉 যদি response এর মধ্যে "data" থাকে:
        state.course = action.payload.data;

        // 👉 আর যদি সরাসরি course object ফেরত দেয়, তাহলে এইটা use করবে:
        // state.course = action.payload;
      })
      .addCase(fetchCourseByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setCourseDataList,
  setCourseData,
  addNewCourseToList,
  updateCourseInList,
  viewCourseFromList,
  setCourseMetaData,
  setSelectedCourseData,
  setCourseConfirmationModal,
  setAddCourseModal,
  setEditCourseModal,
  updateCourseStatus,
  setCurrentPage,
  setEncryptedId,
} = courseSlice.actions;

export default courseSlice.reducer;
