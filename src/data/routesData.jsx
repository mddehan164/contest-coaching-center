import { Error, RegisterForm } from "../components";
import { DCourse, DSlider, Help, Logout, Notice, Schedule, Settings, Student, Teacher } from "../dashboardPages";

import { Admission, Branches, Courses, Login } from "../pages";

export let mainPageRoutes = [
    {route: <Courses/>, path: "courses"}, {route: <Admission/>, path: "admission"}, {route: <Branches/>, path: "branches"}, {route: <Login/>, path: "login"}, {route: <RegisterForm/>, path: "register"}, {route: <Error/>, path: "*"},
];

export let dashboardPageRoutes = [
    {route: <Schedule/>, path: "schedule"}, {route: <Student/>, path: "student"}, {route: <Teacher/>, path: "teacher"}, {route: <DSlider/>, path: "slider"}, {route: <Notice/>, path: "notice"},{route: <DCourse/>, path: "course"}, {route: <Settings/>, path: "settings"}, {route: <Help/>, path: "help"}, {route: <Logout/>, path: "logout"},
];
