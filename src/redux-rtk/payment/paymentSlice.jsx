// redux-rtk/payment/paymentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentPayments: [],
  selectedStudent: null, // এই state টি selected student store করবে
  filters: {
    course: null,
    batch: null,
    search: "",
  },
  // UI control states
  showPopup: true,
  showStickyBtn: false,
  // Additional state for course encrypted ID
  selectedCourseEncryptedId: null,
  // Loading states
  loading: {
    courses: false,
    batches: false,
    students: false,
  },
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setStudentPaymentData: (state, action) => {
      state.studentPayments = action.payload || [];
    },
    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload; // Student object টি store হবে
    },
    clearSelectedStudent: (state) => {
      state.selectedStudent = null; // Selected student clear করার option
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { course: null, batch: null, search: "" };
    },
    setShowPopup: (state, action) => {
      state.showPopup = action.payload;
    },
    setShowStickyBtn: (state, action) => {
      state.showStickyBtn = action.payload;
    },
    setSelectedCourseEncryptedId: (state, action) => {
      state.selectedCourseEncryptedId = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = { ...state.loading, ...action.payload };
    },
  },
});

export const {
  setShowPopup,
  setShowStickyBtn,
  setSelectedStudent,
  clearSelectedStudent, // নতুন action export
  setStudentPaymentData,
  setFilters,
  clearFilters,
  setSelectedCourseEncryptedId,
  setLoading,
} = paymentSlice.actions;

export default paymentSlice.reducer;
