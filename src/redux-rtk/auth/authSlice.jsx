// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  authChecked: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload
      state.user = user
      state.accessToken = accessToken
      state.isAuthenticated = !!accessToken
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
    },
    setAuthChecked: (state) => {
      state.authChecked = true
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
  },
})

export const { setCredentials, logout, setAuthChecked, updateUser } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectAuthChecked = (state) => state.auth.authChecked