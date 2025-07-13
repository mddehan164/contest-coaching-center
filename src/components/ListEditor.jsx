// File: ListEditor.jsx
import React, { useState } from 'react';
import { listDetails as studentList } from '../data/studentData';
import { listDetails as teacherList } from '../data/teacherData';

const ListEditor = () => {
  const [viewType, setViewType] = useState(null); // 'student' | 'teacher'
  const [selectedItem, setSelectedItem] = useState(null);

  const renderStudentList = () => (
    <div className="bg-blue-100 rounded shadow p-4 my-6">
      <h2 className="text-xl font-bold mb-2">Student List</h2>
      <input
        type="text"
        placeholder="Search by name, roll, branch..."
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-sky-500 text-white">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Roll</th>
            <th className="p-2">Branch</th>
            <th className="p-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student) => (
            <tr key={student.id} className="text-center border-t">
              <td className="p-2">{student.id}</td>
              <td className="p-2">{student.name}</td>
              <td className="p-2">{student.roll}</td>
              <td className="p-2">{student.branch}</td>
              <td className="p-2 text-sky-600 cursor-pointer" onClick={() => { setSelectedItem(student); setViewType('student'); }}>View</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTeacherList = () => (
    <div className="bg-blue-100 rounded shadow p-4 my-6">
      <h2 className="text-xl font-bold mb-2">Teacher List</h2>
      <input
        type="text"
        placeholder="Search by name, subject..."
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-sky-500 text-white">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Subject</th>
            <th className="p-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {teacherList.map((teacher) => (
            <tr key={teacher.id} className="text-center border-t">
              <td className="p-2">{teacher.id}</td>
              <td className="p-2">{teacher.name}</td>
              <td className="p-2">{teacher.subject}</td>
              <td className="p-2 text-sky-600 cursor-pointer" onClick={() => { setSelectedItem(teacher); setViewType('teacher'); }}>View</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderStudentDetails = (s) => (
    <div className="bg-white p-4 rounded shadow max-w-4xl mx-auto">
      <button className="mb-4 text-blue-600" onClick={() => setSelectedItem(null)}>&larr; Back to List</button>
      <h2 className="text-xl font-bold mb-2">Student Details</h2>
      <div className="grid grid-cols-2 gap-2">
        <div><strong>Name:</strong> {s.name}</div>
        <div><strong>Roll:</strong> {s.roll}</div>
        <div><strong>Group:</strong> {s.group}</div>
        <div><strong>Father's Name:</strong> {s.fatherName}</div>
        <div><strong>Mother's Name:</strong> {s.motherName}</div>
        <div><strong>Mobile:</strong> {s.mobile}</div>
        <div><strong>Address:</strong> {s.address}</div>
        <div><strong>Gender:</strong> {s.gender}</div>
        <div><strong>SSC Result:</strong> {s.sscResult}</div>
        <div><strong>HSC Result:</strong> {s.hscResult}</div>
        <div><strong>Total Fee:</strong> {s.totalFee} TK</div>
      </div>

      <h3 className="font-semibold mt-4 mb-2">Payment Summary</h3>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>Installment</th><th>Amount</th><th>Status</th><th>Payment Date</th><th>Next Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {s.installments.map((i, idx) => (
            <tr key={idx} className="text-center border-t">
              <td>{i.installment}</td><td>{i.amount}</td><td>{i.status}</td><td>{i.paymentDate || '--'}</td><td>{i.nextPaymentDate || '--'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="font-semibold mt-4 mb-2">Exam Results</h3>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>Exam Name</th><th>Marks</th><th>Position</th><th>Highest Marks</th>
          </tr>
        </thead>
        <tbody>
          {s.examResults.map((e, idx) => (
            <tr key={idx} className="text-center border-t">
              <td>{e.examName}</td><td>{e.marks}</td><td>{e.position}</td><td>{e.highestMarks}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="font-semibold mt-4 mb-2">Lecture Sheets</h3>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>Lecture Sheet Name</th><th>Status</th><th>Given Date</th>
          </tr>
        </thead>
        <tbody>
          {s.lectureSheets.map((l, idx) => (
            <tr key={idx} className="text-center border-t">
              <td>{l.name}</td><td>{l.status}</td><td>{l.givenDate || '--'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTeacherDetails = (t) => (
    <div className="bg-white p-4 rounded shadow max-w-3xl mx-auto">
      <button className="mb-4 text-blue-600" onClick={() => setSelectedItem(null)}>&larr; Back to List</button>
      <h2 className="text-xl font-bold mb-2">Teacher Details</h2>
      <div className="grid grid-cols-2 gap-2">
        <div><strong>Teacher ID:</strong> {t.id}</div>
        <div><strong>Name:</strong> {t.name}</div>
        <div><strong>Subject:</strong> {t.subject}</div>
        <div><strong>Total Classes:</strong> {t.totalClasses}</div>
        <div><strong>Total Payment:</strong> {t.totalPayment} TK</div>
        <div><strong>Paid Amount:</strong> {t.paidAmount} TK</div>
        <div><strong>Due Amount:</strong> {t.dueAmount} TK</div>
      </div>

      <h3 className="font-semibold mt-4 mb-2">Payment Records</h3>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>#</th><th>Class ID</th><th>Amount</th><th>Payment Date</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {t.paymentRecords.map((r, idx) => (
            <tr key={idx} className="text-center border-t">
              <td>{r.id}</td><td>{r.classId}</td><td>{r.amount} TK</td><td>{r.paymentDate || '--'}</td><td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-4">
      {!selectedItem && (
        <>
          {renderStudentList()}
          {renderTeacherList()}
        </>
      )}
      {selectedItem && viewType === 'student' && renderStudentDetails(selectedItem)}
      {selectedItem && viewType === 'teacher' && renderTeacherDetails(selectedItem)}
    </div>
  );
};

export default ListEditor;
