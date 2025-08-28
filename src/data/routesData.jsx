import {
  AllSuccessCard,
  BranchEditor,
  CourseDetails,
  Customise,
  Error,
  GalleryEditor,
  GalleryMain,
  ServiceEditor,
  StatsEditor,
  SuccessEditor,
  SummaryEditor,
} from "../components";
import {
  DCourse,
  DSlider,
  Help,
  Logout,
  Notice,
  Payments,
  Schedule,
  Settings,
} from "../dashboardPages";

import {
  Admission,
  BeforeVerify,
  Branches,
  Courses,
  Login,
  Profile,
  Register,
  Verify,
} from "../pages";
import Batch from "../pages/Batch/Batch";
import { Course } from "../pages/Course";
import Student from "../pages/Student/Student";
import { Teacher } from "../pages/Teacher";
// import { Student } from "../pages/Student";

export let mainPageRoutes = [
  { element: <Courses />, path: "courses" },
  { element: <Admission />, path: "admission" },
  { element: <GalleryMain />, path: "gallery" },
  { element: <Branches />, path: "branches" },
  { element: <AllSuccessCard />, path: "all-success" },
  { element: <CourseDetails />, path: "courses/:id" },
  { element: <Login />, path: "login" },
  { element: <Register />, path: "register" },
  { element: <Profile />, path: "profile" },
  { element: <BeforeVerify />, path: "before-verify" },
  { element: <Verify />, path: "verify/:id/:hash" },
  { element: <Error />, path: "*" },
];

export let dashboardPageRoutes = [
  { element: <Schedule />, path: "schedule" },
  { element: <Student />, path: "student" },
  { element: <Batch />, path: "batch" },
  { element: <Teacher />, path: "teacher" },
  { element: <Course />, path: "course" },
  { element: <DSlider />, path: "slider" },
  { element: <Notice />, path: "notice" },
  { element: <DCourse />, path: "course-editor" },
  { element: <SuccessEditor />, path: "success-editor" },
  { element: <StatsEditor />, path: "stats-editor" },
  { element: <ServiceEditor />, path: "service-editor" },
  { element: <SummaryEditor />, path: "summary-editor" },
  { element: <GalleryEditor />, path: "gallery-editor" },
  { element: <BranchEditor />, path: "branch-editor" },
  { element: <Customise />, path: "customise" },
  { element: <Settings />, path: "settings" },
  { element: <Help />, path: "help" },
  { element: <Logout />, path: "logout" },
  { element: <Payments />, path: "payments" },
];
