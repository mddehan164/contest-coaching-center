// dashboardData.js

export const statsData = [
  {
    id: 1,
    title: "Total Students",
    value: 120,
    icon: "user",
    color1: "bg-blue-300",    color2: "bg-blue-400",    color3: "bg-blue-500",
  },
  {
    id: 2,
    title: "Total Teachers",
    value: 10,
    icon: "user",
    color1: "bg-lime-200",    color2: "bg-lime-300",    color3: "bg-lime-400",
  },
  {
    id: 4,
    title: "Total Users",
    value: 150,
    icon: "user",
    color1: "bg-emerald-200",    color2: "bg-emerald-300",    color3: "bg-emerald-400",
  },
  {
    id: 3,
    title: "Upcoming Exams",
    value: 3,
    icon: "calendar",
    color1: "bg-orange-300",    color2: "bg-orange-400",    color3: "bg-orange-500",
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

export const notifications = [
  {id: 1, title: "Hasan Recently Enrolled a Physics course.", date: "02/07/25", new: true},
  {id: 2, title: "Redwan comment on your notice feed back." ,date: "05/07/25", new: true},
  {id: 3, title: "Sumi recently sign up on our field" ,date: "06/07/25" },
  {id: 4, title: "You exam result is pending to publish" ,date: "09/07/25" }
]
