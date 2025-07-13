// src/components/StudentTeacherEditor.jsx

import React, { useState } from 'react';

const StudentTeacherEditor = ({ data, type, onSave, onDelete, onAdd }) => {
  const [entries, setEntries] = useState(data);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const getEmptyEntry = () => {
    return type === 'student'
      ? {
          name: '', mobile: '', batch: '', branch: '', roll: '', group: '',
          fatherName: '', motherName: '', gender: '', address: '',
          sscResult: '', hscResult: '', totalFee: '',
          installments: [], examResults: [], lectureSheets: []
        }
      : {
          name: '', subject: '', totalClasses: '', totalPayment: '',
          paidAmount: '', dueAmount: '', paymentRecords: []
        };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (key, index, field, value) => {
    const updated = [...selectedEntry[key]];
    updated[index][field] = value;
    setSelectedEntry((prev) => ({ ...prev, [key]: updated }));
  };

  const handleAddNested = (key) => {
    const newItem = key === 'installments'
      ? { installment: '', amount: '', status: '', paymentDate: '', nextPaymentDate: '' }
      : key === 'examResults'
      ? { examName: '', marks: '', position: '', highestMarks: '' }
      : key === 'lectureSheets'
      ? { name: '', status: '', givenDate: '' }
      : { id: '', classId: '', amount: '', paymentDate: '', status: '' };

    setSelectedEntry((prev) => ({ ...prev, [key]: [...prev[key], newItem] }));
  };

  const handleRemoveNested = (key, index) => {
    const updated = [...selectedEntry[key]];
    updated.splice(index, 1);
    setSelectedEntry((prev) => ({ ...prev, [key]: updated }));
  };

  const handleView = (entry) => {
    setSelectedEntry(entry);
    setViewMode(true);
  };

  const handleEdit = () => {
    setIsEdit(true);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedEntry(getEmptyEntry());
    setIsEdit(false);
    setShowForm(true);
  };

  const confirmSave = () => {
    if (isEdit) {
      const updated = entries.map((e) => (e.id === selectedEntry.id ? selectedEntry : e));
      setEntries(updated);
      onSave && onSave(selectedEntry);
    } else {
      const newEntry = { ...selectedEntry, id: Date.now() };
      const updated = [...entries, newEntry];
      setEntries(updated);
      onAdd && onAdd(newEntry);
    }
    setShowForm(false);
    setShowConfirm(false);
    setViewMode(false);
  };

  const confirmDelete = (entry) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updated = entries.filter((e) => e.id !== entry.id);
      setEntries(updated);
      onDelete && onDelete(entry.id);
    }
  };

  const renderFormField = (label, name) => (
    <div className="mb-2">
      <label className="block font-medium text-sm">{label}</label>
      <input name={name} value={selectedEntry[name]} onChange={handleInputChange} className="border p-1 rounded w-full" />
    </div>
  );

  const renderViewDetails = () => (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-[#102542]">{type === 'student' ? 'Student' : 'Teacher'} Details</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(selectedEntry).map(([key, value]) => (
          Array.isArray(value) ? null : (
            <div key={key}>
              <strong className="text-sm text-gray-700">{key}:</strong> <span>{value}</span>
            </div>
          )
        ))}
      </div>

      <div className="mt-4">
        {(type === 'student') && (
          <>
            <h3 className="font-semibold">Installments</h3>
            <table className="table-auto border w-full text-sm mb-4">
              <thead className="bg-gray-100">
                <tr>{['installment', 'amount', 'status', 'paymentDate', 'nextPaymentDate'].map(h => <th key={h} className="border px-2 py-1">{h}</th>)}</tr>
              </thead>
              <tbody>
                {selectedEntry.installments.map((item, i) => (
                  <tr key={i}>{Object.values(item).map((val, j) => <td key={j} className="border px-2 py-1">{val}</td>)}</tr>
                ))}
              </tbody>
            </table>

            <h3 className="font-semibold">Exam Results</h3>
            <table className="table-auto border w-full text-sm mb-4">
              <thead className="bg-gray-100">
                <tr>{['examName', 'marks', 'position', 'highestMarks'].map(h => <th key={h} className="border px-2 py-1">{h}</th>)}</tr>
              </thead>
              <tbody>
                {selectedEntry.examResults.map((item, i) => (
                  <tr key={i}>{Object.values(item).map((val, j) => <td key={j} className="border px-2 py-1">{val}</td>)}</tr>
                ))}
              </tbody>
            </table>

            <h3 className="font-semibold">Lecture Sheets</h3>
            <table className="table-auto border w-full text-sm">
              <thead className="bg-gray-100">
                <tr>{['name', 'status', 'givenDate'].map(h => <th key={h} className="border px-2 py-1">{h}</th>)}</tr>
              </thead>
              <tbody>
                {selectedEntry.lectureSheets.map((item, i) => (
                  <tr key={i}>{Object.values(item).map((val, j) => <td key={j} className="border px-2 py-1">{val}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {(type === 'teacher') && (
          <>
            <h3 className="font-semibold">Payment Records</h3>
            <table className="table-auto border w-full text-sm">
              <thead className="bg-gray-100">
                <tr>{['classId', 'amount', 'status', 'paymentDate'].map(h => <th key={h} className="border px-2 py-1">{h}</th>)}</tr>
              </thead>
              <tbody>
                {selectedEntry.paymentRecords.map((item, i) => (
                  <tr key={i}>{['classId', 'amount', 'status', 'paymentDate'].map(field => (
                    <td key={field} className="border px-2 py-1">{item[field]}</td>
                  ))}</tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <button onClick={handleEdit} className="bg-[#4CAF50] text-white px-4 py-2 rounded">Edit</button>
        <button onClick={() => setViewMode(false)} className="bg-gray-600 text-white px-4 py-2 rounded">Back</button>
      </div>
    </div>
  );

  return (
    <div className="p-4 w-full">
      {!viewMode && !showForm && (
        <div>
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold text-[#102542]">{type === 'student' ? 'Student' : 'Teacher'} List</h2>
            <button onClick={handleAdd} className="bg-[#4CAF50] text-white px-4 py-1 rounded">+ Add</button>
          </div>

          <table className="w-full table-auto border">
            <thead className="bg-[#102542] text-white">
              <tr>
                {type === 'student' ? (
                  <>
                    <th className="border px-3 py-2">Name</th>
                    <th className="border px-3 py-2">Roll</th>
                    <th className="border px-3 py-2">Branch</th>
                  </>
                ) : (
                  <>
                    <th className="border px-3 py-2">ID</th>
                    <th className="border px-3 py-2">Name</th>
                    <th className="border px-3 py-2">Subject</th>
                  </>
                )}
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-100">
                  {type === 'student' ? (
                    <>
                      <td className="border px-3 py-2">{entry.name}</td>
                      <td className="border px-3 py-2">{entry.roll}</td>
                      <td className="border px-3 py-2">{entry.branch}</td>
                    </>
                  ) : (
                    <>
                      <td className="border px-3 py-2">{entry.id}</td>
                      <td className="border px-3 py-2">{entry.name}</td>
                      <td className="border px-3 py-2">{entry.subject}</td>
                    </>
                  )}
                  <td className="border px-3 py-2 space-x-2">
                    <button onClick={() => handleView(entry)} className="bg-[#2196F3] text-white px-3 py-1 rounded">View</button>
                    <button onClick={() => confirmDelete(entry)} className="bg-[#f44336] text-white px-3 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewMode && !showForm && selectedEntry && renderViewDetails()}
      {showForm && selectedEntry && renderForm()}
    </div>
  );
};

export default StudentTeacherEditor;
