import { lazy } from "react";

// main pages
const Courses = lazy(() => import("../pages/Courses"));
const Admission = lazy(() => import("../pages/Admission"));
const BeforeVerify = lazy(() => import("../pages/BeforeVerify"));
const Branches = lazy(() => import("../pages/Branches"));
const Login = lazy(() => import("../pages/Login"));
const Profile = lazy(() => import("../pages/Profile"));
const Register = lazy(() => import("../pages/Register"));
const Verify = lazy(() => import("../pages/Verify"));
const GalleryMain = lazy(() => import("../components/Gallery/GalleryMain"));
const AllSuccessCard = lazy(() =>
  import("../components/successfullPerson/AllSuccessCard")
);
const CourseDetails = lazy(() => import("../components/courses/CourseDetails"));
const Error = lazy(() => import("../components/Error"));

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
// dashboard pages
const Schedule = lazy(() => import("../dashboardPages/Schedule"));
const Branch = lazy(() => import("../pages/Branch/Branch"));
const Student = lazy(() => import("../pages/Student/Student"));
const Batch = lazy(() => import("../pages/Batch/Batch"));
const Teacher = lazy(() => import("../pages/Teacher/Teacher"));
const Course = lazy(() => import("../pages/Course/Course"));
const Notice = lazy(() => import("../pages/Notice/Notice"));
const Review = lazy(() => import("../pages/Review/Review"));
const SuccessEditor = lazy(() => import("..//components/SuccessEditor"));
const StatsEditor = lazy(() => import("../components/StatsEditor "));
const SummaryEditor = lazy(() => import("../components/SummaryEditor"));
const ServiceEditor = lazy(() => import("../components/ServiceEditor"));
const GalleryEditor = lazy(() => import("../components//GalleryEditor"));
const BranchEditor = lazy(() => import("../components/BranchEditor"));
const Customise = lazy(() => import("../components/Customise"));
const Settings = lazy(() => import("../dashboardPages/Settings"));
const Help = lazy(() => import("../dashboardPages/Help"));
const Logout = lazy(() => import("../dashboardPages/Logout"));
const Payments = lazy(() => import("../dashboardPages/Payments"));
const TeacherPay = lazy(() => import("../components/Payment/TeacherPay"));
const StudentPay = lazy(() => import("../components/Payment/StudentPay"));

export let dashboardPageRoutes = [
  { element: <Schedule />, path: "schedule" },
  { element: <Branch />, path: "branch" },
  { element: <Student />, path: "student" },
  { element: <Batch />, path: "batch" },
  { element: <Teacher />, path: "teacher" },
  { element: <Course />, path: "course" },
  { element: <Notice />, path: "notice" },
  { element: <Review />, path: "review" },
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
  { element: <TeacherPay />, path: "teacher-pay" },
  { element: <StudentPay />, path: "student-pay" },
];
