import React from "react";

const ListDetails = ({ data, onBack }) => {
  if (!data) return null;

  // Type detection without "type" field
  const isStudent = data.roll && data.installments;
  const isTeacher = data.subject && data.paymentRecords;

  return (
    <div className="p-4 border rounded-md shadow-md mt-6 bg-white w-full max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-4 bg-headerColorHover text-white px-4 py-2 rounded hover:bg-headerColor"
      >
        ← Back to List
      </button>

      {/* Student UI */}
      {isStudent && (
        <>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Student Details</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm sm:text-sm md:text-lg">
              <p><strong>Name:</strong> {data.name}</p>
              <p><strong>Roll:</strong> {data.roll}</p>
              <p><strong>Group:</strong> {data.group}</p>
              <p><strong>Father's Name:</strong> {data.fatherName}</p>
              <p><strong>Mother's Name:</strong> {data.motherName}</p>
              <p><strong>Mobile Number:</strong> {data.mobile}</p>
              <p><strong>Gender:</strong> {data.gender}</p>
              <p><strong>Address:</strong> {data.address}</p>
              <p><strong>SSC Result:</strong> {data.sscResult}</p>
              <p><strong>HSC Result:</strong> {data.hscResult}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Payment Summary</h3>
            <p className="mb-2"><strong>Total Fee:</strong> {data.totalFee} TK</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border md:text-lg">
                <thead>
                  <tr className="bg-headerColor">
                    <th className="border p-2">Installment</th>
                    <th className="border p-2">Amount</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Payment Date</th>
                    <th className="border p-2">Next Payment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.installments.map((item, idx) => (
                    <tr key={idx}>
                      <td className="border p-2">{item.installment}</td>
                      <td className="border p-2">{item.amount}</td>
                      <td className={`border p-2 ${item.status === 'Due' ? 'text-red-500' : 'text-green-600'}`}>{item.status}</td>
                      <td className="border p-2">{item.paymentDate || '--'}</td>
                      <td className="border p-2">{item.nextPaymentDate || '--'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Exam Results</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border md:text-lg">
                <thead>
                  <tr className="bg-headerColor">
                    <th className="border p-2">Exam Name</th>
                    <th className="border p-2">Marks</th>
                    <th className="border p-2">Position</th>
                    <th className="border p-2">Highest Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {data.examResults.map((exam, idx) => (
                    <tr key={idx}>
                      <td className="border p-2">{exam.examName}</td>
                      <td className="border p-2">{exam.marks}</td>
                      <td className="border p-2">{exam.position}</td>
                      <td className="border p-2">{exam.highestMarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Lecture Sheets</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border md:text-lg">
                <thead>
                  <tr className="bg-headerColor">
                    <th className="border p-2">Lecture Sheet Name</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Given Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.lectureSheets.map((sheet, idx) => (
                    <tr key={idx}>
                      <td className="border p-2">{sheet.name}</td>
                      <td className={`border p-2 ${sheet.status === 'Not Given' ? 'text-red-500' : 'text-green-600'}`}>{sheet.status}</td>
                      <td className="border p-2">{sheet.givenDate || '--'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Teacher UI */}
      {isTeacher && (
        <>
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Teacher Details</h2>
          <div className="mb-6 grid md:grid-cols-2 gap-4 text-sm md:text-lg">
            <p><strong>Teacher ID:</strong> {data.id}</p>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Subject:</strong> {data.subject}</p>
            <p><strong>Total Classes:</strong> {data.totalClasses}</p>
            <p><strong>Total Payment:</strong> {data.totalPayment} TK</p>
            <p><strong>Paid Amount:</strong> {data.paidAmount} TK</p>
            <p><strong>Due Amount:</strong> {data.dueAmount} TK</p>
          </div>

          <h3 className="text-lg font-semibold mb-2">Payment Records</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border lg:text-lg">
              <thead>
                <tr className="bg-headerColor">
                  <th className="border p-2">#</th>
                  <th className="border p-2">Class ID</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Payment Date</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.paymentRecords.map((rec, idx) => (
                  <tr key={idx}>
                    <td className="border p-2">{idx + 1}</td>
                    <td className="border p-2">{rec.classId}</td>
                    <td className="border p-2">{rec.amount} TK</td>
                    <td className="border p-2">{rec.paymentDate || '--'}</td>
                    <td className={`border p-2 ${rec.status === 'Due' ? 'text-red-500' : 'text-green-600'}`}>{rec.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ListDetails;
