// redux-rtk/payment/paymentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentPayments: null, // সব student payment data
  selectedStudentPayment: null, // একজন student-এর payment data

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
    setStudentPaymentData(state, action) {
      state.studentPayments = action.payload;
    },
    setSelectedStudentPayment(state, action) {
      state.selectedStudentPayment = action.payload;
    },
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
  setStudentPaymentData,
  setStudentPaymentDataList,
  setSelectedStudentPayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;
