// redux-rtk/payment/paymentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentPayments: [],
  selectedStudent: null,
  selectedStudentData: {},
  showDetailsModal: false,
  isOpenAddModal: false,
  isOpenEditModal: false, // 🆕 Edit modal state
  editingPaymentData: null, // 🆕 Edit data state
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
      state.selectedStudent = action.payload;
    },
    clearSelectedStudent: (state) => {
      state.selectedStudent = null;
    },
    setFilters: (state, action) => {
      // যদি course change হয়
      if (action.payload.course !== undefined) {
        state.filters.course = action.payload.course;
        state.filters.batch = null; // নতুন course হলে batch reset করো
        state.selectedCourseEncryptedId = action.payload.course; // sync করো
      }
      if (action.payload.batch !== undefined) {
        state.filters.batch = action.payload.batch;
      }
      if (action.payload.search !== undefined) {
        state.filters.search = action.payload.search;
      }
    },
    setIsOpenEditModal: (state, action) => {
      state.isOpenEditModal = action.payload;
    },
    setEditingPaymentData: (state, action) => {
      state.editingPaymentData = action.payload;
    },
    setSelectedStudentData: (state, action) => {
      state.selectedStudentData = action.payload;
    },
    setShowDetailsModal: (state, action) => {
      state.showDetailsModal = action.payload;
    },
    setIsOpenAddModal: (state, action) => {
      state.isOpenAddModal = action.payload;
    },
    clearFilters: (state) => {
      state.filters = { course: null, batch: null, search: "" };
      state.selectedCourseEncryptedId = null;
      state.selectedStudent = null; // student selection ও clear করুন
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
  clearSelectedStudent,
  setStudentPaymentData,
  setFilters,
  clearFilters,
  setSelectedCourseEncryptedId,
  setLoading,
  setSelectedStudentData,
  setShowDetailsModal,
  setIsOpenAddModal,
  setIsOpenEditModal, // 🆕 Export new actions
  setEditingPaymentData, // 🆕 Export new actions
} = paymentSlice.actions;

export default paymentSlice.reducer;
