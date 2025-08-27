// src/components/StudentTeacherEditor.jsx
import CustomTable from "../shared/custom/CustomTable"
import React, { useState } from 'react';
import { DeleteSvg, EditSvg, EyeSvg } from "../utils/svgs";

const StudentTeacherEditor = ({ data, type, onSave, onDelete, onAdd }) => {
  const [entries, setEntries] = useState(data);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [searchText, setSearchText] = useState('');

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
    setShowForm(false);
    setIsEdit(false);
  };

  const handleEdit = () => {
    setIsEdit(true);
    setShowForm(true);
    setViewMode(false);
  };

  const handleAdd = () => {
    setSelectedEntry(getEmptyEntry());
    setIsEdit(false);
    setShowForm(true);
    setViewMode(false);
  };

  const confirmSave = () => {
    if (isEdit) {
      const updated = entries.map((e) => (e.id === selectedEntry.id ? selectedEntry : e));
      setEntries(updated);
      onSave && onSave(selectedEntry);
    } else {
      const newEntry = { ...selectedEntry, id: Date.now() + Math.floor(Math.random() * 1000) };
      const updated = [...entries, newEntry];
      setEntries(updated);
      onAdd && onAdd(newEntry);
    }
    setShowForm(false);
    setViewMode(false);
  };

  const confirmDelete = (entry) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updated = entries.filter((e) => e.id !== entry.id);
      setEntries(updated);
      onDelete && onDelete(entry.id);
    }
  };

  const renderFormField = (label, name, idx) => (
    <div className="mb-2" key={idx}>
      <label className="block font-medium text-sm">{label}</label>
      <input
        name={name}
        value={selectedEntry[name] || ''}
        onChange={handleInputChange}
        className="border p-1 rounded w-full"
      />
    </div>
  );

  const renderNestedFields = (key) => {
    if (!Array.isArray(selectedEntry[key])) return null;

    return (
      <div className="mt-4">
        <h3 className="font-semibold capitalize mb-2">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>
        {selectedEntry[key].map((item, i) => (
          <div key={i} className="grid grid-cols-4 gap-2 mb-2">
            {Object.entries(item).map(([field, val]) => (
              <input
                key={field + i}
                className="border p-1 rounded"
                placeholder={field.replace(/([A-Z])/g, ' $1')}
                value={val || ''}
                onChange={(e) => handleNestedChange(key, i, field, e.target.value)}
              />
            ))}
            <button onClick={() => handleRemoveNested(key, i)} className="bg-contestRed hover:bg-red-700 text-white rounded px-2">X</button>
          </div>
        ))}
        <button onClick={() => handleAddNested(key)} className="bg-headerColorHover text-white px-3 py-1 rounded">+ Add {key}</button>
      </div>
    );
  };

  const renderForm = () => (
    <div className="bg-white p-4 rounded shadow w-full">
      <h2 className="text-xl font-bold mb-4 text-[#102542]">{isEdit ? 'Edit' : 'Add'} {type === 'student' ? 'Student' : 'Teacher'}</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(getEmptyEntry()).map(([key, val]) => (
          Array.isArray(val)
            ? null
            : renderFormField(key.replace(/([A-Z])/g, ' $1'), key)
        ))}
      </div>
      {type === 'student' && (
        <>
          {renderNestedFields('installments')}
          {renderNestedFields('examResults')}
          {renderNestedFields('lectureSheets')}
        </>
      )}
      {type === 'teacher' && renderNestedFields('paymentRecords')}
      <div className="mt-6 flex gap-4">
        <button onClick={confirmSave} className="bg-[#4CAF50] text-white px-4 py-2 rounded">Save</button>
        <button onClick={() => { setShowForm(false); setViewMode(false); }} className="bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </div>
  );

  const renderViewDetails = () => (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl xl:text-3xl font-bold mb-4 text-[#102542]">{type === 'student' ? 'Student' : 'Teacher'} Details</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(selectedEntry).map(([key, value]) => (
          Array.isArray(value) ? null : (
            <div key={key}>
              <strong className="text-base md:text-lg text-gray-700">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
              </strong>
              <span className="ml-1 break-words">{value}</span>
            </div>
          )
        ))}
      </div>

      {type === 'student' && (
        <>
          {['installments', 'examResults', 'lectureSheets'].map((key) => (
            Array.isArray(selectedEntry[key]) && selectedEntry[key].length > 0 && (
              <div key={key} className="mt-4">
                <h3 className="font-semibold capitalize mb-2">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>
                <table className="table-auto border w-full text-base md:text-lg lg:text-xl text-center">
                  <thead className="bg-headerColor">
                    <tr>{Object.keys(selectedEntry[key][0]).map(h => <th key={h} className='px-2 py-1'>{h.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</th>)}</tr>
                  </thead>
                  <tbody>
                    {selectedEntry[key].map((item, i) => (
                      <tr key={i}>{Object.values(item).map((val, j) => <td key={j} className="border px-2 py-1 ">{val}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ))}
        </>
      )}

      {type === 'teacher' && Array.isArray(selectedEntry.paymentRecords) && selectedEntry.paymentRecords.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Payment Records</h3>
          <table className="table-auto border w-full text-base md:text-lg lg:text-xl">
            <thead className="bg-headerColor">
              <tr>{Object.keys(selectedEntry.paymentRecords[0]).map(h => <th key={h} className='px-2 py-1'>{h.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</th>)}</tr>
            </thead>
            <tbody>
              {selectedEntry.paymentRecords.map((item, i) => (
                <tr key={i}>{Object.values(item).map((val, j) => <td key={j} className="border px-2 py-1">{val}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <button onClick={handleEdit} className="bg-headerColorHover text-white px-4 py-2 rounded">Edit</button>
        <button onClick={() => setViewMode(false)} className="bg-gray-600 text-white px-4 py-2 rounded">Back</button>
      </div>
    </div>
  );

  const filteredEntries = entries.filter((entry, index, self) => {
    const match = Object.entries(entry).some(([key, val]) => {
      if (typeof val === 'string' || typeof val === 'number') {
        return val.toString().toLowerCase().includes(searchText.toLowerCase());
      }
      return false;
    });

    const firstIndex = self.findIndex(e => e.id === entry.id);
    return match && firstIndex === index; // remove duplicate ids
  });

  return (
    <div className="p-4 w-full">
      {!viewMode && !showForm && (
        <div>
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold text-[#102542]">{type === 'student' ? 'Student' : 'Teacher'} List</h2>
            <button onClick={handleAdd} className="bg-[#4CAF50] text-white px-4 py-1 rounded">+ Add</button>
          </div>

          <input
            type="text"
            placeholder="Search by any detail..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border px-3 py-2 mb-4 w-full rounded"
          />

          <CustomTable
            isPagination={true}
            columns={type === 'student' ?
              [
                "Name",
                "Roll",
                "Branch",
                "Actions"
              ]
              :
              [
                "ID",
                "Name",
                "Subject",
                "Actions"
              ]
            }
            dataLength={entries.length}
          >
            {filteredEntries.map((entry) => (
              <tr key={entry.id + '_' + entry.name} className="hover:bg-contestLight">
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
                <td className="border px-3 py-2 space-x-2 text-center w-[100px]">
                  <div className='flex items-center gap-x-3'>
                    <button
                      onClick={() => handleView(entry)}

                    >
                      <EyeSvg />
                    </button>
                    <button
                      onClick={() => confirmDelete(entry)}
                    >
                      <DeleteSvg />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </CustomTable>
        </div>
      )}

      {viewMode && selectedEntry && renderViewDetails()}
      {showForm && selectedEntry && renderForm()}
    </div>
  );
};

export default StudentTeacherEditor;
