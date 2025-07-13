import React, { useState, useEffect } from 'react';

const StudentDetailsEditor = ({ student, onSave, onDelete }) => {
  const [formData, setFormData] = useState({});
  const [confirmSave, setConfirmSave] = useState(false);

  useEffect(() => {
    setFormData(student);
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedChange = (field, index, key, value) => {
    const updated = [...formData[field]];
    updated[index][key] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const addNestedItem = (field, defaultItem) => {
    const updated = [...(formData[field] || []), defaultItem];
    setFormData({ ...formData, [field]: updated });
  };

  const removeNestedItem = (field, index) => {
    const updated = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updated });
  };

  const handleSave = () => {
    setConfirmSave(true);
  };

  const confirmAndSave = () => {
    onSave(formData);
    setConfirmSave(false);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full">
      <h2 className="text-xl font-bold mb-4">Edit Student</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(formData).map(([key, value]) => {
          if (key === 'id') return null;
          if (Array.isArray(value)) return null;
          return (
            <input
              key={key}
              type="text"
              name={key}
              value={value || ''}
              onChange={handleChange}
              placeholder={key}
              className="border rounded p-2"
            />
          );
        })}
      </div>

      {/* Installments */}
      <div className="mt-6">
        <h3 className="font-semibold">Installments</h3>
        {(formData.installments || []).map((item, i) => (
          <div key={i} className="flex gap-2 my-2">
            {Object.entries(item).map(([k, v]) => (
              <input
                key={k}
                type="text"
                value={v || ''}
                onChange={(e) => handleNestedChange('installments', i, k, e.target.value)}
                placeholder={k}
                className="border p-1"
              />
            ))}
            <button onClick={() => removeNestedItem('installments', i)} className="text-red-500">X</button>
          </div>
        ))}
        <button
          onClick={() => addNestedItem('installments', { installment: '', amount: '', status: '', paymentDate: '', nextPaymentDate: '' })}
          className="text-sm text-blue-600 mt-2"
        >Add Installment</button>
      </div>

      {/* Exam Results */}
      <div className="mt-6">
        <h3 className="font-semibold">Exam Results</h3>
        {(formData.examResults || []).map((item, i) => (
          <div key={i} className="flex gap-2 my-2">
            {Object.entries(item).map(([k, v]) => (
              <input
                key={k}
                type="text"
                value={v || ''}
                onChange={(e) => handleNestedChange('examResults', i, k, e.target.value)}
                placeholder={k}
                className="border p-1"
              />
            ))}
            <button onClick={() => removeNestedItem('examResults', i)} className="text-red-500">X</button>
          </div>
        ))}
        <button
          onClick={() => addNestedItem('examResults', { examName: '', marks: '', position: '', highestMarks: '' })}
          className="text-sm text-blue-600 mt-2"
        >Add Exam</button>
      </div>

      {/* Lecture Sheets */}
      <div className="mt-6">
        <h3 className="font-semibold">Lecture Sheets</h3>
        {(formData.lectureSheets || []).map((item, i) => (
          <div key={i} className="flex gap-2 my-2">
            {Object.entries(item).map(([k, v]) => (
              <input
                key={k}
                type="text"
                value={v || ''}
                onChange={(e) => handleNestedChange('lectureSheets', i, k, e.target.value)}
                placeholder={k}
                className="border p-1"
              />
            ))}
            <button onClick={() => removeNestedItem('lectureSheets', i)} className="text-red-500">X</button>
          </div>
        ))}
        <button
          onClick={() => addNestedItem('lectureSheets', { name: '', status: '', givenDate: '' })}
          className="text-sm text-blue-600 mt-2"
        >Add Sheet</button>
      </div>

      {/* Save & Delete */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >Save Changes</button>
        <button
          onClick={() => onDelete(student.id)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >Delete</button>
      </div>

      {/* Confirmation */}
      {confirmSave && (
        <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded">
          <p>Are you sure you want to save these changes?</p>
          <div className="mt-2 flex gap-3">
            <button onClick={confirmAndSave} className="bg-green-600 text-white px-3 py-1 rounded">Yes</button>
            <button onClick={() => setConfirmSave(false)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetailsEditor;
