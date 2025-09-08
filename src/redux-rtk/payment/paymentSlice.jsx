// redux-rtk/payment/paymentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // UI control states
  showPopup: true,
  showStickyBtn: false,

  // Filter states (MAIN)
  courseId: null,
  batchId: null,
  search: "",

  // Draft states (for popup)
  draftCourse: null,
  draftBatch: null,
  draftQuery: "",

  // Additional state for course encrypted ID
  selectedCourseEncryptedId: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setShowPopup: (state, action) => {
      state.showPopup = action.payload;
    },
    setShowStickyBtn: (state, action) => {
      state.showStickyBtn = action.payload;
    },
    setCourseId: (state, action) => {
      state.courseId = action.payload;
    },
    setBatchId: (state, action) => {
      state.batchId = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setDraftCourse: (state, action) => {
      state.draftCourse = action.payload;
    },
    setDraftBatch: (state, action) => {
      state.draftBatch = action.payload;
    },
    setDraftQuery: (state, action) => {
      state.draftQuery = action.payload;
    },
    setSelectedCourseEncryptedId: (state, action) => {
      state.selectedCourseEncryptedId = action.payload;
    },
    // Combined action to apply filters
    applyFilters: (state, action) => {
      const { courseId, batchId, search } = action.payload;
      state.courseId = courseId;
      state.batchId = batchId;
      state.search = search;
    },
    // Reset all filters
    resetFilters: (state) => {
      state.courseId = null;
      state.batchId = null;
      state.search = "";
      state.draftCourse = null;
      state.draftBatch = null;
      state.draftQuery = "";
      state.selectedCourseEncryptedId = null;
    },
  },
});

export const {
  setShowPopup,
  setShowStickyBtn,
  setCourseId,
  setBatchId,
  setSearch,
  setDraftCourse,
  setDraftBatch,
  setDraftQuery,
  setSelectedCourseEncryptedId,
  applyFilters,
  resetFilters,
} = paymentSlice.actions;

export default paymentSlice.reducer;
