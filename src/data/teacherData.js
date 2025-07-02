// src/data/teacherData.js (Updated)

export const list = [
  {
    id: 101,
    name: "Mr. Rahman",
    subject: "Mathematics",
  },
  {
    id: 102,
    name: "Ms. Jahan",
    subject: "Physics",
  },
  {
    id: 103,
    name: "Mr. Karim",
    subject: "Chemistry",
  },
  {
    id: 104,
    name: "Ms. Fatema",
    subject: "Biology",
  },
  {
    id: 105,
    name: "Mr. Alam",
    subject: "ICT",
  },
  {
    id: 106,
    name: "Ms. Nahar",
    subject: "English",
  },
  {
    id: 107,
    name: "Mr. Hossain",
    subject: "Economics",
  },
  {
    id: 108,
    name: "Ms. Rima",
    subject: "History",
  },
  {
    id: 109,
    name: "Mr. Jalal",
    subject: "Accounting",
  },
  {
    id: 110,
    name: "Ms. Liza",
    subject: "Bangla",
  },
];

export const listDetails = [
  {
    // teacherId এর বদলে id ব্যবহার করা হয়েছে, ListDetails কম্পোনেন্টের Teacher UI সেকশনের সাথে মিলিয়ে
    id: 101,
    name: "Mr. Rahman",
    subject: "Mathematics",
    totalClasses: 5,
    totalPayment: 2500,
    paidAmount: 1500, // paidPayment এর বদলে paidAmount ব্যবহার করা হয়েছে
    dueAmount: 1000,
    paymentRecords: [
      {
        id: 1,
        classId: "Math-001",
        amount: 500,
        paymentDate: "12/06/25",
        status: "Paid",
      },
      {
        id: 2,
        classId: "Math-002",
        amount: 500,
        paymentDate: "13/06/25",
        status: "Paid",
      },
      {
        id: 3,
        classId: "Math-003",
        amount: 500,
        paymentDate: null,
        status: "Due",
      },
      {
        id: 4,
        classId: "Math-004",
        amount: 500,
        paymentDate: null,
        status: "Due",
      },
      {
        id: 5,
        classId: "Math-005",
        amount: 500,
        paymentDate: "18/06/25",
        status: "Paid",
      },
    ],
  },
  {
    // Teacher ID 102 এর জন্য ডামি ডেটা যোগ করা হয়েছে, যাতে এটিও রেন্ডার করা যায়
    id: 102,
    name: "Ms. Jahan",
    subject: "Physics",
    totalClasses: 3,
    totalPayment: 1500,
    paidAmount: 1000,
    dueAmount: 500,
    paymentRecords: [
      { id: 1, classId: "Phy-001", amount: 500, paymentDate: "10/06/25", status: "Paid" },
      { id: 2, classId: "Phy-002", amount: 500, paymentDate: "15/06/25", status: "Paid" },
      { id: 3, classId: "Phy-003", amount: 500, paymentDate: null, status: "Due" },
    ],
  },
  // এখানে অন্য শিক্ষকদের বিস্তারিত তথ্য যোগ করুন, নিশ্চিত করুন 'id' প্রপার্টিটি তাদের ID হবে
];