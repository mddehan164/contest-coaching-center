// src/redux/slices/uiSlice.js
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoading: false,
  message: "",
  isMenuOpen: false,
  activeTab: "Admission",
  showConfirm: false,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setMessage: (state, action) => {
      state.message = action.payload
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    },
    setShowConfirm: (state, action) => {
      state.showConfirm = action.payload
    },
    clearUI: (state) => {
      state.isLoading = false
      state.message = ""
    },
  },
})

export const {
  setLoading,
  setMessage,
  toggleMenu,
  setActiveTab,
  setShowConfirm,
  clearUI,
} = uiSlice.actions

export default uiSlice.reducer

export const selectIsLoading = (state) => state.ui.isLoading
export const selectMessage = (state) => state.ui.message
export const selectIsMenuOpen = (state) => state.ui.isMenuOpen