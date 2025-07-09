// dashboardData.js

import {
  User,
  Layers,
  Calendar,
  DollarSign,
  BookOpen,
  ClipboardList,
  FileText,
  Users,
} from "lucide-react";

export const statsData = [
  {
    id: 1,
    title: "Total Students",
    value: 120,
    icon: "user",
    color: "bg-blue-600",
  },
  {
    id: 2,
    title: "Total Teachers",
    value: 10,
    icon: "users",
    color: "bg-green-600",
  },
  {
    id: 3,
    title: "Upcoming Exams",
    value: 3,
    icon: "calendar",
    color: "bg-yellow-500",
  },
  {
    id: 4,
    title: "Monthly Revenue",
    value: "৳ 75,000",
    icon: "dollar-sign",
    color: "bg-purple-600",
  },
];

export const recentEnrollments = [
  {
    id: 1,
    name: "Hasan",
    batch: "Batch 2025",
    status: "Active",
    date: "01/07/25",
  },
  {
    id: 2,
    name: "Sumi",
    batch: "Batch 2025",
    status: "Active",
    date: "03/07/25",
  },
  {
    id: 3,
    name: "Rafi",
    batch: "Batch 2025",
    status: "Inactive",
    date: "05/07/25",
  },
];

export const notices = [
  { id: 1, title: "Exam Routine Published", date: "02/07/25" },
  { id: 2, title: "New Batch Admission Open", date: "01/07/25" },
  { id: 3, title: "Monthly Fee Reminder", date: "30/06/25" },
];

export const upcomingExams = [
  { id: 1, title: "Physics Mock Test", date: "12/07/25" },
  { id: 2, title: "Math Evaluation Test", date: "15/07/25" },
  { id: 3, title: "English Grammar Quiz", date: "20/07/25" },
];

export const adminShortcuts = [
  { id: 1, label: "Students", icon: User, route: "/admin/students" },
  { id: 2, label: "Teachers", icon: Users, route: "/admin/teachers" },
  { id: 3, label: "Exams", icon: FileText, route: "/admin/exams" },
  { id: 4, label: "Notices", icon: ClipboardList, route: "/admin/notices" },
  { id: 5, label: "Lecture Sheets", icon: BookOpen, route: "/admin/lectures" },
];

