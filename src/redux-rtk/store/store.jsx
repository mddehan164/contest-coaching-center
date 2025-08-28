import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authReducer from "../auth/authSlice";
import uiReducer from "../uiSlice";
import batchReducer from "../batch/batchSlice";
import courseReducer from "../course/courseSlice";
import studentReducer from "../student/studentSlice";
import teacherReducer from "../teacher/teacherSlice";
import noticeReducer from "../notice/noticeSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    ui: uiReducer,
    batch: batchReducer,
    course: courseReducer,
    student: studentReducer,
    teacher: teacherReducer,
    notice: noticeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.NODE_ENV !== "production",
});
