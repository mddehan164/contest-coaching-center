// data.js

export const list = [
  {
    id: 1,
    name: "Hasan",
    mobile: "01711111111",
    roll: 101,
    batch: 2025,
    branch: "Dhaka",
  },
  {
    id: 2,
    name: "Sumi",
    mobile: "01711111112",
    roll: 102,
    batch: 2025,
    branch: "Rajshahi",
  },
  {
    id: 3,
    name: "Rafi",
    mobile: "01711111113",
    roll: 103,
    batch: 2025,
    branch: "Khulna",
  },
  {
    id: 4,
    name: "Naznin",
    mobile: "01711111114",
    roll: 104,
    batch: 2025,
    branch: "Barisal",
  },
  {
    id: 5,
    name: "Hriday",
    mobile: "01711111115",
    roll: 105,
    batch: 2025,
    branch: "Sylhet",
  },
  {
    id: 6,
    name: "Shamima",
    mobile: "01711111116",
    roll: 106,
    batch: 2025,
    branch: "Dhaka",
  },
  {
    id: 7,
    name: "Saif",
    mobile: "01711111117",
    roll: 107,
    batch: 2025,
    branch: "Rajshahi",
  },
  {
    id: 8,
    name: "Lima",
    mobile: "01711111118",
    roll: 108,
    batch: 2025,
    branch: "Khulna",
  },
  {
    id: 9,
    name: "Ovi",
    mobile: "01711111119",
    roll: 109,
    batch: 2025,
    branch: "Barisal",
  },
  {
    id: 10,
    name: "Mira",
    mobile: "01711111120",
    roll: 110,
    batch: 2025,
    branch: "Sylhet",
  },
];

export const listDetails = [
  {
    roll: 101,
    name: "Hasan",
    group: "Science",
    fatherName: "Abul Kashem",
    motherName: "Rokeya Begum",
    mobile: "01711111111",
    gender: "Male",
    address: "Mirpur, Dhaka",
    sscResult: "GPA 5.00",
    hscResult: "GPA 5.00",
    totalFee: 3000,
    installments: [
      { installment: "1st", amount: 1000, status: "Paid", paymentDate: "12/06/25", nextPaymentDate: null },
      { installment: "2nd", amount: 1000, status: "Due", paymentDate: null, nextPaymentDate: "25/06/25" },
      { installment: "3rd", amount: 1000, status: "Due", paymentDate: null, nextPaymentDate: "10/07/25" },
    ],
    examResults: [
      { examName: "Bangla-001", marks: "45/50", position: "5th", highestMarks: 49 },
      { examName: "Math-002", marks: "48/50", position: "3rd", highestMarks: 50 },
      { examName: "GK-03", marks: "40/50", position: "7th", highestMarks: 48 },
    ],
    lectureSheets: [
      { name: "Bangla-001", status: "Given", givenDate: "12/06/25" },
      { name: "Math-002", status: "Given", givenDate: "14/06/25" },
      { name: "English-003", status: "Given", givenDate: "16/06/25" },
      { name: "Physics-004", status: "Not Given", givenDate: null },
      { name: "Chemistry-005", status: "Not Given", givenDate: null },
    ]
  }
];
