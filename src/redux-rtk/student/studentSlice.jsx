import { createSlice } from "@reduxjs/toolkit";
import {
  appendNewDataToPaginatedList,
  viewDataFromPaginatedList,
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

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudentDataList: (state, action) => {
      // directly assign plain list
      state.dataList = action.payload.data;
    },

    setStudentData: (state, action) => {
      const { students, pagination } = action.payload.data;

      const meta = {
        totalItems: pagination.total,
        totalPages: pagination.last_page,
        currentPage: pagination.current_page,
        pageSize: pagination.per_page,
        hasNextPage: pagination.current_page < pagination.last_page,
        hasPreviousPage: pagination.current_page > 1,
      };

      const result = setPaginatedDataFromApi({
        incomingData: students,
        incomingMeta: meta,
        existingData: state.data,
        existingMeta: state.meta,
      });

      state.meta = result.meta;
      state.data = result.data;
      state.dataList = result.dataList;
    },

    addNewStudentToList: (state, action) => {
      const newStudent = {
        ...action.payload,
      };

      const result = appendNewDataToPaginatedList({
        meta: state.meta,
        data: state.data,
        dataList: state.dataList,
        newItem: newStudent,
      });

      state.meta = result.meta;
      state.data = result.data;
      state.dataList = result.dataList;
    },

    updateStudentInList: (state, action) => {
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

    viewStudentFromList: (state, action) => {
      const result = viewDataFromPaginatedList({
        meta: state.meta,
        data: state.data,
        dataList: state.dataList,
        idToRemove: action.payload.id,
      });

      state.meta = result.meta;
      state.data = result.data;
      state.dataList = result.dataList;
    },

    setStudentMetaData: (state, action) => {
      state.meta = { ...state.meta, ...action.payload };
      const updateKey = Object.keys(action.payload)[0];
      if (updateKey === "currentPage") {
        state.dataList = state.data[`page${action.payload.currentPage}`] || [];
      }

      if (updateKey === "pageSize") {
        state.meta = { ...state.meta, pageSize: action.payload.pageSize };
      }
    },

    setSelectedStudentData: (state, action) => {
      state.selectedData = action.payload;
    },

    setStudentConfirmationModal: (state, action) => {
      state.isConfirmModalOpen = action.payload;
    },

    setAddStudentModal: (state, action) => {
      state.isAddModalOpen = action.payload;
    },

    setEditStudentModal: (state, action) => {
      state.isEditModalOpen = action.payload;
    },
  },
});

export const {
  setStudentDataList,
  setStudentData,
  addNewStudentToList,
  updateStudentInList,
  viewStudentFromList,
  setStudentMetaData,
  setSelectedStudentData,
  setStudentConfirmationModal,
  setAddStudentModal,
  setEditStudentModal,
} = studentSlice.actions;

export default studentSlice.reducer;
