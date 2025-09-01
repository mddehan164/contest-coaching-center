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

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    setBranchDataList: (state, action) => {
      // directly assign plain list
      state.dataList = action.payload.data;
    },

    setBranchData: (state, action) => {
      const { branches, total, showing_all } = action.payload.data;

      // For branches, if showing_all is true, we don't have pagination
      if (showing_all) {
        state.dataList = branches;
        state.meta = {
          totalItems: total,
          totalPages: 1,
          currentPage: 1,
          pageSize: total,
          hasNextPage: false,
          hasPreviousPage: false,
        };
        state.data = { page1: branches };
      } else {
        // If pagination is implemented later
        const meta = {
          totalItems: total,
          totalPages: Math.ceil(total / 10),
          currentPage: 1,
          pageSize: 10,
          hasNextPage: total > 10,
          hasPreviousPage: false,
        };

        const result = setPaginatedDataFromApi({
          incomingData: branches,
          incomingMeta: meta,
          existingData: state.data,
          existingMeta: state.meta,
        });

        state.meta = result.meta;
        state.data = result.data;
        state.dataList = result.dataList;
      }
    },

    addNewBranchToList: (state, action) => {
      const newBranch = {
        ...action.payload,
      };

      const result = appendNewDataToPaginatedList({
        meta: state.meta,
        data: state.data,
        dataList: state.dataList,
        newItem: newBranch,
      });

      state.meta = result.meta;
      state.data = result.data;
      state.dataList = result.dataList;
    },

    updateBranchInList: (state, action) => {
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

    removeBranchFromList: (state, action) => {
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

    setBranchMetaData: (state, action) => {
      state.meta = { ...state.meta, ...action.payload };
      const updateKey = Object.keys(action.payload)[0];
      if (updateKey === "currentPage") {
        state.dataList = state.data[`page${action.payload.currentPage}`] || [];
      }

      if (updateKey === "pageSize") {
        state.meta = { ...state.meta, pageSize: action.payload.pageSize };
      }
    },

    setSelectedBranchData: (state, action) => {
      state.selectedData = action.payload;
    },

    setBranchConfirmationModal: (state, action) => {
      state.isConfirmModalOpen = action.payload;
    },

    setAddBranchModal: (state, action) => {
      state.isAddModalOpen = action.payload;
    },

    setEditBranchModal: (state, action) => {
      state.isEditModalOpen = action.payload;
    },
  },
});

export const {
  setBranchDataList,
  setBranchData,
  addNewBranchToList,
  updateBranchInList,
  removeBranchFromList,
  setBranchMetaData,
  setSelectedBranchData,
  setBranchConfirmationModal,
  setAddBranchModal,
  setEditBranchModal,
} = branchSlice.actions;

export default branchSlice.reducer;
