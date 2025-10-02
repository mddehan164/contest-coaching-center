// src/redux/slices/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  message: "",
  isMenuOpen: false,
  activeTab: "Admission",
  showConfirm: false,
  // New states from ContextProvider
  isActiveMenu: false,
  scrollAnimatedSections: {},
  isExpand: false,
  email: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setShowConfirm: (state, action) => {
      state.showConfirm = action.payload;
    },
    clearUI: (state) => {
      state.isLoading = false;
      state.message = "";
    },
    // New actions from ContextProvider
    setIsActiveMenu: (state, action) => {
      state.isActiveMenu = action.payload;
    },
    toggleActiveMenu: (state) => {
      state.isActiveMenu = !state.isActiveMenu;
    },
    setScrollAnimatedSections: (state, action) => {
      state.scrollAnimatedSections = {
        ...state.scrollAnimatedSections,
        ...action.payload,
      };
    },
    setIsExpand: (state, action) => {
      state.isExpand = action.payload;
    },
    toggleExpand: (state) => {
      state.isExpand = !state.isExpand;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const {
  setLoading,
  setMessage,
  toggleMenu,
  setActiveTab,
  setShowConfirm,
  clearUI,
  setIsActiveMenu,
  toggleActiveMenu,
  setScrollAnimatedSections,
  setIsExpand,
  toggleExpand,
  setEmail,
} = uiSlice.actions;

export default uiSlice.reducer;

// Selectors
export const selectIsLoading = (state) => state.ui.isLoading;
export const selectMessage = (state) => state.ui.message;
export const selectIsMenuOpen = (state) => state.ui.isMenuOpen;
export const selectActiveTab = (state) => state.ui.activeTab;
export const selectShowConfirm = (state) => state.ui.showConfirm;
export const selectIsActiveMenu = (state) => state.ui.isActiveMenu;
export const selectScrollAnimatedSections = (state) =>
  state.ui.scrollAnimatedSections;
export const selectIsExpand = (state) => state.ui.isExpand;
export const selectEmail = (state) => state.ui.email;
