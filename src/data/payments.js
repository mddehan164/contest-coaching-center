import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";

export const persons = [
  { title: "Teachers Payments", icon: GiTeacher, link: "teacher-pay" },
  { title: "Students Payments", icon: PiStudentFill, link: "student-pay" },
];

export let studentPaymentsData = [
  {
    id: 1,
    name: "Hasan",
    course_fee: 150,
    payable_amount: 120,
    course_title: "Pythone Programming",
    batch_title: "Batch A",
    payment_date: "2024-06-15",
    status: 1,
  },
  {
    id: 4,
    name: "Sumi",
    course_fee: 200,
    payable_amount: 180,
    course_title: "Web Development",
    batch_title: "Batch B",
    payment_date: "2024-06-15",
    status: 0,
  },
];

export let teacherPaymentsData = [
  {
    id: 101,
    name: "Mr. Rahman",
    subject: "Mathematics",
    class_fee: 150,
    course_title: "Pythone Programming",
    batch_title: "Batch A",
    payment_date: "2024-06-15",
    status: 1,
  },
  {
    id: 102,
    name: "Ms. Jahan",
    subject: "Physics",
    class_fee: 200,
    course_title: "Web Development",
    batch_title: "Batch B",
    payment_date: "2024-06-15",
    status: 0,
  },
  {
    id: 103,
    name: "Mr. Karim",
    subject: "Chemistry",
    class_fee: 200,
    course_title: "Web Development",
    batch_title: "Batch B",
    payment_date: "2024-06-15",
    status: 0,
  },
  {
    id: 104,
    name: "Ms. Fatema",
    subject: "Biology",
    class_fee: 200,
    course_title: "Web Development",
    batch_title: "Batch B",
    payment_date: "2024-06-15",
    status: 0,
  },
  {
    id: 105,
    name: "Ms. Jahan",
    subject: "Physics",
    class_fee: 200,
    course_title: "Web Development",
    batch_title: "Batch B",
    payment_date: "2024-06-15",
    status: 0,
  },
];
