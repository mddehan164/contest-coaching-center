// data.js
const admissionFormFields = {
  branchOptions: ["CITY", "UNIVERSITY", "BANESWAR", "IDEAL HOME"],
  officeUseOnly: [
    { label: "Roll No", type: "text", key: "rollNo" },
    { label: "Group", type: "text", key: "group" },
    { label: "Batch", type: "text", key: "batch" },
    { label: "Admission Fee", type: "number", key: "admissionFee" },
    { label: "Deposit", type: "number", key: "deposit" },
    { label: "Date", type: "date", key: "date" }
  ],
  personalInfo: [
    { label: "Student’s Name (In English)", type: "text", key: "nameEnglish" },
    { label: "Student’s Name (In Bangla)", type: "text", key: "nameBangla" },
    { label: "NID/Birth Certificate No.", type: "text", key: "nidOrBirth" },
    { label: "Gender", type: "radio", key: "gender", options: ["Male", "Female"] },
    { label: "Blood Group", type: "text", key: "bloodGroup" },
    { label: "Father’s Name", type: "text", key: "fatherName" },
    { label: "Father’s Profession", type: "text", key: "fatherProfession" },
    { label: "Mother’s Name", type: "text", key: "motherName" },
    { label: "Mother’s Profession", type: "text", key: "motherProfession" },
    { label: "NID No. (Father)", type: "text", key: "fatherNid" },
    { label: "Contact Number (Student)", type: "text", key: "studentContact" },
    { label: "Contact Number (Mother)", type: "text", key: "motherContact" },
    { label: "Contact Number (Guardian)", type: "text", key: "guardianContact" },
    { label: "Present Address", type: "textarea", key: "presentAddress" },
    { label: "Permanent Address - Village", type: "text", key: "village" },
    { label: "Permanent Address - Thana", type: "text", key: "thana" },
    { label: "Permanent Address - Post Office", type: "text", key: "postOffice" },
    { label: "Permanent Address - District", type: "text", key: "district" },
    { label: "Name of College (In Bangla)", type: "text", key: "collegeName" }
  ],
  educationQualifications: [
    {
      exam: "S.S.C/Dhakhil",
      fields: [
        { label: "Board Roll", type: "text", key: "sscBoardRoll" },
        { label: "Registration No.", type: "text", key: "sscRegNo" },
        { label: "Board", type: "text", key: "sscBoard" },
        { label: "Passing Year", type: "number", key: "sscYear" },
        { label: "Group", type: "text", key: "sscGroup" },
        { label: "GPA", type: "text", key: "sscGpa" }
      ]
    },
    {
      exam: "H.S.C/Alim",
      fields: [
        { label: "Board Roll", type: "text", key: "hscBoardRoll" },
        { label: "Registration No.", type: "text", key: "hscRegNo" },
        { label: "Board", type: "text", key: "hscBoard" },
        { label: "Passing Year", type: "number", key: "hscYear" },
        { label: "Group", type: "text", key: "hscGroup" },
        { label: "GPA", type: "text", key: "hscGpa" }
      ]
    }
  ]
};

export default admissionFormFields;
