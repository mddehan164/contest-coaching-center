import { createSlice } from "@reduxjs/toolkit";
import {
  appendNewDataToPaginatedList,
  removeDataFromPaginatedList,
  setPaginatedDataFromApi,
  updateDataInDataList,
  updateDataInPaginatedPages,
} from "../utils/reduxHelper";

const initialState = {
  dataList: [],
  data: {},
  selectedData: null,

  isAddModalOpen: false,
  isEditModalOpen: false,
  isConfirmModalOpen: false,

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

    removeCourseFromList: (state, action) => {
      const result = removeDataFromPaginatedList({
        meta: state.meta,
        data: state.data,
        dataList: state.dataList,
        idToRemove: action.payload.id, // your API uses "id" not "_id"
      });

      state.meta = result.meta;
      state.data = result.data;
      state.dataList = result.dataList;
    },

    setCourseMetaData: (state, action) => {
      state.meta = { ...state.meta, ...action.payload };
      const updateKey = Object.keys(action.payload)[0];
      if (updateKey === "currentPage") {
        state.dataList =
          state.data[`page${action.payload.currentPage}`] || [];
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
      state.dataList = state.dataList.map(item =>
        item.encrypted_id === courseId ? { ...item, status } : item
      );

      // Update in paginated data
      Object.keys(state.data).forEach(pageKey => {
        state.data[pageKey] = state.data[pageKey].map(item =>
          item.encrypted_id === courseId ? { ...item, status } : item
        );
      });
    },
  },
});

export const {
  setCourseDataList,
  setCourseData,
  addNewCourseToList,
  updateCourseInList,
  removeCourseFromList,
  setCourseMetaData,
  setSelectedCourseData,
  setCourseConfirmationModal,
  setAddCourseModal,
  setEditCourseModal,
  updateCourseStatus
} = courseSlice.actions;

export default courseSlice.reducer;
