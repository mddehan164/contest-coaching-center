// src/components/TeacherDetailsEditor.jsx

import React, { useState, useEffect } from 'react';

const TeacherDetailsEditor = ({ teacher, onSave, onDelete }) => {
  const [editTeacher, setEditTeacher] = useState({ ...teacher });
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    setEditTeacher({ ...teacher });
  }, [teacher]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditTeacher((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (index, field, value) => {
    const updatedRecords = [...editTeacher.paymentRecords];
    updatedRecords[index][field] = value;
    setEditTeacher((prev) => ({ ...prev, paymentRecords: updatedRecords }));
  };

  const handleAddRecord = () => {
    const newRecord = {
      id: editTeacher.paymentRecords.length + 1,
      classId: '',
      amount: '',
      paymentDate: '',
      status: 'Due',
    };
    setEditTeacher((prev) => ({
      ...prev,
      paymentRecords: [...prev.paymentRecords, newRecord],
    }));
  };

  const handleRemoveRecord = (index) => {
    const updatedRecords = [...editTeacher.paymentRecords];
    updatedRecords.splice(index, 1);
    setEditTeacher((prev) => ({ ...prev, paymentRecords: updatedRecords }));
  };

  const handleConfirmSave = () => {
    setShowConfirmation(false);
    onSave(editTeacher);
  };

  return (
    <div className="p-4 border rounded-xl shadow bg-white w-full">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Edit Teacher Info</h2>

      <div className="grid grid-cols-2 gap-4">
        <input name="name" value={editTeacher.name} onChange={handleChange} placeholder="Name" className="input" />
        <input name="subject" value={editTeacher.subject} onChange={handleChange} placeholder="Subject" className="input" />
        <input name="totalClasses" value={editTeacher.totalClasses} onChange={handleChange} placeholder="Total Classes" className="input" />
        <input name="totalPayment" value={editTeacher.totalPayment} onChange={handleChange} placeholder="Total Payment" className="input" />
        <input name="paidAmount" value={editTeacher.paidAmount} onChange={handleChange} placeholder="Paid Amount" className="input" />
        <input name="dueAmount" value={editTeacher.dueAmount} onChange={handleChange} placeholder="Due Amount" className="input" />
      </div>

      <h3 className="text-lg mt-6 mb-2 font-semibold">Payment Records</h3>
      {editTeacher.paymentRecords.map((record, index) => (
        <div key={index} className="grid grid-cols-5 gap-2 mb-2">
          <input value={record.classId} onChange={(e) => handleNestedChange(index, 'classId', e.target.value)} placeholder="Class ID" className="input" />
          <input value={record.amount} onChange={(e) => handleNestedChange(index, 'amount', e.target.value)} placeholder="Amount" className="input" />
          <input value={record.paymentDate || ''} onChange={(e) => handleNestedChange(index, 'paymentDate', e.target.value)} placeholder="Payment Date" className="input" />
          <select value={record.status} onChange={(e) => handleNestedChange(index, 'status', e.target.value)} className="input">
            <option>Paid</option>
            <option>Due</option>
          </select>
          <button onClick={() => handleRemoveRecord(index)} className="text-red-500">Remove</button>
        </div>
      ))}
      <button onClick={handleAddRecord} className="text-blue-600 mb-4">+ Add Record</button>

      <div className="flex justify-end gap-4">
        <button onClick={() => setShowConfirmation(true)} className="bg-green-500 px-4 py-2 rounded text-white">Save</button>
        <button onClick={onDelete} className="bg-red-500 px-4 py-2 rounded text-white">Delete</button>
      </div>

      {showConfirmation && (
        <div className="mt-4 p-4 border rounded bg-yellow-100">
          <p className="text-yellow-700">Are you sure you want to save changes?</p>
          <div className="flex gap-4 mt-2">
            <button onClick={handleConfirmSave} className="bg-green-500 px-3 py-1 rounded text-white">Yes</button>
            <button onClick={() => setShowConfirmation(false)} className="bg-gray-400 px-3 py-1 rounded text-white">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDetailsEditor;

// Tailwind utility class "input" is assumed to be a custom style like:
// input: "border rounded p-2 w-full"
// You can define it in a CSS file or Tailwind plugin to simplify reuse.
