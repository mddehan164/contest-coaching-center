import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from '../api/apiSlice'
import authReducer from '../auth/authSlice'
import uiReducer from '../uiSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.NODE_ENV !== 'production',
})