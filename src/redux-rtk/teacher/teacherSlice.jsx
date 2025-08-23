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

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setTeacherDataList: (state, action) => {
      // directly assign plain list
      state.dataList = action.payload.data;
    },

    setTeacherData: (state, action) => {
      const { teacher, pagination } = action.payload.data;

      const meta = {
        totalItems: pagination.total,
        totalPages: pagination.last_page,
        currentPage: pagination.current_page,
        pageSize: pagination.per_page,
        hasNextPage: pagination.current_page < pagination.last_page,
        hasPreviousPage: pagination.current_page > 1,
      };

      const result = setPaginatedDataFromApi({
        incomingData: teacher,
        incomingMeta: meta,
        existingData: state.data,
        existingMeta: state.meta,
      });

      state.meta = result.meta;
      state.data = result.data;
      state.dataList = result.dataList;
    },

    addNewTeacherToList: (state, action) => {
      const newTeacher = {
        ...action.payload,
      };

      const result = appendNewDataToPaginatedList({
        meta: state.meta,
        data: state.data,
        dataList: state.dataList,
        newItem: newTeacher,
      });

      state.meta = result.meta;
      state.data = result.data;
      state.dataList = result.dataList;
    },

    updateTeacherInList: (state, action) => {
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

    removeTeacherFromList: (state, action) => {
      const result = removeDataFromPaginatedList({
        meta: state.meta,
        data: state.data,
        dataList: state.dataList,
        idToRemove: action.payload.id,
      });

      state.meta = result.meta;
      state.data = result.data;
      state.dataList = result.dataList;
    },

    setTeacherMetaData: (state, action) => {
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

    setSelectedTeacherData: (state, action) => {
      state.selectedData = action.payload;
    },

    setTeacherConfirmationModal: (state, action) => {
      state.isConfirmModalOpen = action.payload;
    },

    setAddTeacherModal: (state, action) => {
      state.isAddModalOpen = action.payload;
    },

    setEditTeacherModal: (state, action) => {
      state.isEditModalOpen = action.payload;
    },
  },
});

export const {
  setTeacherDataList,
  setTeacherData,
  addNewTeacherToList,
  updateTeacherInList,
  removeTeacherFromList,
  setTeacherMetaData,
  setSelectedTeacherData,
  setTeacherConfirmationModal,
  setAddTeacherModal,
  setEditTeacherModal,
} = teacherSlice.actions;

export default teacherSlice.reducer;
