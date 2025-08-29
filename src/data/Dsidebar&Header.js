import { MdOutlineMessage, MdOutlineNotificationsActive, MdOutlineRateReview } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { FaRegUserCircle, FaBook } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import { RiSecurePaymentFill } from "react-icons/ri";

export const headerData = {
  logo: {
    image: logo,
    title: "Contest",
    subtitle: "Admin",
  },
  icons: [
    { icon: MdOutlineMessage, link: "/message" },
    { icon: MdOutlineNotificationsActive, link: "/notification", new: true },
    { icon: BsCart4, link: "/cart" },
    { icon: FaRegUserCircle, link: "/user" },
  ],
};

import { RiDashboardHorizontalFill } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { GiTeacher } from "react-icons/gi";
import { GrSchedules } from "react-icons/gr";
import { MdSettings } from "react-icons/md";
import { MdOutlineLiveHelp } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { CgWebsite } from "react-icons/cg";
import { MdBatchPrediction } from "react-icons/md";
import { AiOutlineNotification } from "react-icons/ai";

export const sidebarData = [
  {
    title: "Menu",
    items: [
      {
        icon: RiDashboardHorizontalFill,
        title: "Dashboard",
        link: "/dashboard",
      },
      { icon: SiGoogleclassroom, title: "Student", link: "student" },
      { icon: GiTeacher, title: "Teacher", link: "teacher" },
      { icon: FaBook, title: "Courses", link: "course" },
      { icon: MdBatchPrediction, title: "Batches", link: "batch" },
      { icon: AiOutlineNotification, title: "Notices", link: "notice" },
      { icon: MdOutlineRateReview, title: "Reviews", link: "review" },
      { icon: CgWebsite, title: "Customise", link: "customise" },
      { icon: GrSchedules, title: "Schedule", link: "schedule" },
      { icon: RiSecurePaymentFill, title: "Payments", link: "payments" },
    ],
  },
  {
    title: "General",
    items: [
      { icon: MdSettings, title: "Settings", link: "settings" },
      { icon: MdOutlineLiveHelp, title: "Help", link: "help" },
      { icon: GrLogout, title: "Logout", link: "logout" },
    ],
  },
];
