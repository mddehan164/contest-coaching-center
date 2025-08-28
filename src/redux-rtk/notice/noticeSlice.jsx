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

const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    setNoticeDataList: (state, action) => {
      // directly assign plain list
      state.dataList = action.payload.data;
    },

    setNoticeData: (state, action) => {
      const { notices, pagination } = action.payload.data;

      const meta = {
        totalItems: pagination.total,
        totalPages: pagination.last_page,
        currentPage: pagination.current_page,
        pageSize: pagination.per_page,
        hasNextPage: pagination.current_page < pagination.last_page,
        hasPreviousPage: pagination.current_page > 1,
      };

      const result = setPaginatedDataFromApi({
        incomingData: notices,
        incomingMeta: meta,
        existingData: state.data,
        existingMeta: state.meta,
      });

      state.meta = result.meta;
      state.data = result.data;
      state.dataList = result.dataList;
    },

    addNewNoticeToList: (state, action) => {
      const newNotice = {
        ...action.payload,
      };

      const result = appendNewDataToPaginatedList({
        meta: state.meta,
        data: state.data,
        dataList: state.dataList,
        newItem: newNotice,
      });

      state.meta = result.meta;
      state.data = result.data;
      state.dataList = result.dataList;
    },

    updateNoticeInList: (state, action) => {
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

    removeNoticeFromList: (state, action) => {
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

    setNoticeMetaData: (state, action) => {
      state.meta = { ...state.meta, ...action.payload };
      const updateKey = Object.keys(action.payload)[0];
      if (updateKey === "currentPage") {
        state.dataList = state.data[`page${action.payload.currentPage}`] || [];
      }

      if (updateKey === "pageSize") {
        state.meta = { ...state.meta, pageSize: action.payload.pageSize };
      }
    },

    setSelectedNoticeData: (state, action) => {
      state.selectedData = action.payload;
    },

    setNoticeConfirmationModal: (state, action) => {
      state.isConfirmModalOpen = action.payload;
    },

    setAddNoticeModal: (state, action) => {
      state.isAddModalOpen = action.payload;
    },

    setEditNoticeModal: (state, action) => {
      state.isEditModalOpen = action.payload;
    },
    updateNoticeStatus: (state, action) => {
      const { noticeId, status } = action.payload;

      // Update in dataList
      state.dataList = state.dataList.map((item) =>
        item.encrypted_id === noticeId ? { ...item, status } : item
      );

      // Update in paginated data
      Object.keys(state.data).forEach((pageKey) => {
        state.data[pageKey] = state.data[pageKey].map((item) =>
          item.encrypted_id === noticeId ? { ...item, status } : item
        );
      });
    },
  },
});

export const {
  setNoticeDataList,
  setNoticeData,
  addNewNoticeToList,
  updateNoticeInList,
  removeNoticeFromList,
  setNoticeMetaData,
  setSelectedNoticeData,
  setNoticeConfirmationModal,
  setAddNoticeModal,
  setEditNoticeModal,
  updateNoticeStatus,
} = noticeSlice.actions;

export default noticeSlice.reducer;
