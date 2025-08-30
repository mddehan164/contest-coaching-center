import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataList: [],
  meta: {
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1,
  },
  selectedData: null,
  isAddModalOpen: false,
  isEditModalOpen: false,
  isConfirmModalOpen: false,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setReviewData: (state, action) => {
      state.dataList = action.payload?.data?.reviews || [];
    },
    setReviewMetaData: (state, action) => {
      state.meta = action.payload || initialState.meta;
    },
    setSelectedReviewData: (state, action) => {
      state.selectedData = action.payload;
    },
    setAddReviewModal: (state, action) => {
      state.isAddModalOpen = action.payload;
    },
    setEditReviewModal: (state, action) => {
      state.isEditModalOpen = action.payload;
    },
    setReviewConfirmationModal: (state, action) => {
      state.isConfirmModalOpen = action.payload;
    },
    addNewReviewToList: (state, action) => {
      // The API returns { data: { review: reviewObject } }
      const newReview = action.payload?.data?.review || action.payload;
      state.dataList.unshift(newReview);
    },
    updateReviewInList: (state, action) => {
      // The API returns { data: { review: reviewObject } }
      const updatedReview = action.payload?.data?.review || action.payload;
      const index = state.dataList.findIndex(
        (item) => item.encrypted_id === updatedReview.encrypted_id
      );
      if (index !== -1) {
        state.dataList[index] = updatedReview;
      }
    },
    viewReviewFromList: (state, action) => {
      state.dataList = state.dataList.filter(
        (item) => item.encrypted_id !== action.payload.id
      );
    },
  },
});

export const {
  setReviewData,
  setReviewMetaData,
  setSelectedReviewData,
  setAddReviewModal,
  setEditReviewModal,
  setReviewConfirmationModal,
  addNewReviewToList,
  updateReviewInList,
  viewReviewFromList,
} = reviewSlice.actions;

export default reviewSlice.reducer;
