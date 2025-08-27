import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from '../api/apiSlice'
import authReducer from '../auth/authSlice'
import uiReducer from '../uiSlice'
import batchReducer from '../batch/batchSlice'
import courseReducer from '../course/courseSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    ui: uiReducer,
    batch: batchReducer,
    course: courseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.NODE_ENV !== 'production',
})