import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";

export const persons = [
  { title: "Teachers Payments", icon: GiTeacher, link: "teacher-pay" },
  { title: "Students Payments", icon: PiStudentFill, link: "student-pay" },
];

export const studentPaymentsData = [
  {
    id: 1,
    name: "John Doe",
    course_fee: 150,
    payable_amount: 120,
    course_title: "Pythone Programming",
    batch_title: "Batch A",
    payment_date: "2024-06-15",
    status: 1,
  },
  {
    id: 2,
    name: "Jane Smith",
    course_fee: 200,
    payable_amount: 180,
    course_title: "Web Development",
    batch_title: "Batch B",
    payment_date: "2024-06-15",
    status: 0,
  },
];
