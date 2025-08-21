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
  Schedule,
  Settings,
  Student,
  Teacher,
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

export let mainPageRoutes = [
  { route: <Courses />, path: "courses" },
  { route: <Admission />, path: "admission" },
  { route: <GalleryMain />, path: "gallery" },
  { route: <Branches />, path: "branches" },
  { route: <AllSuccessCard />, path: "all-success" },
  { route: <CourseDetails />, path: "/courses/:id" },
  { route: <Login />, path: "login" },
  { route: <Register />, path: "register" },
  { route: <Profile />, path: "profile" },
  { route: <BeforeVerify />, path: "before-verify" },
  { route: <Verify />, path: "verify/:id/:hash" },
  { route: <Error />, path: "*" },
];

export let dashboardPageRoutes = [
  // Student accessible routes
  { route: <Schedule />, path: "schedule", adminOnly: false },
  { route: <Settings />, path: "settings", adminOnly: false },
  { route: <Help />, path: "help", adminOnly: false },
  { route: <Logout />, path: "logout", adminOnly: false },

  // Admin only routes
  { route: <Student />, path: "student", adminOnly: true },
  { route: <Teacher />, path: "teacher", adminOnly: true },
  { route: <DSlider />, path: "slider", adminOnly: true },
  { route: <Notice />, path: "notice", adminOnly: true },
  { route: <DCourse />, path: "course-editor", adminOnly: true },
  { route: <SuccessEditor />, path: "success-editor", adminOnly: true },
  { route: <StatsEditor />, path: "stats-editor", adminOnly: true },
  { route: <ServiceEditor />, path: "service-editor", adminOnly: true },
  { route: <SummaryEditor />, path: "summary-editor", adminOnly: true },
  { route: <GalleryEditor />, path: "gallery-editor", adminOnly: true },
  { route: <BranchEditor />, path: "branch-editor", adminOnly: true },
  { route: <Customise />, path: "customise", adminOnly: true },
];
