import React, { useState } from 'react';
import { summary } from '../data/data';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SummaryEditor = () => {
  const [summaryData, setSummaryData] = useState(summary.data);
  const [newSummary, setNewSummary] = useState({ title: '', value: '', icon: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSummary({ ...newSummary, [name]: value });
  };

  const handleAddOrEdit = () => {
    if (isEditing) {
      const updatedSummary = [...summaryData];
      updatedSummary[editIndex] = newSummary;
      setSummaryData(updatedSummary);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setSummaryData([newSummary, ...summaryData]);
    }
    setNewSummary({ title: '', value: '', icon: '' });
  };

  const handleDelete = (index) => {
    const updatedSummary = [...summaryData];
    updatedSummary.splice(index, 1);
    setSummaryData(updatedSummary);
  };

  const handleEdit = (index) => {
    const currentSummary = summaryData[index];
    setNewSummary(currentSummary);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="p-4 space-y-8 xl:px-44 xl:text-xl">
      <h2 className="text-2xl font-semibold text-center">Add or Edit Summary</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <input
            name="title"
            value={newSummary.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="block w-full p-2 border rounded"
          />
          <input
            name="value"
            value={newSummary.value}
            onChange={handleInputChange}
            placeholder="Value"
            className="block w-full p-2 border rounded"
          />
          <input
            name="icon"
            value={newSummary.icon}
            onChange={handleInputChange}
            placeholder="Icon"
            className="block w-full p-2 border rounded"
          />
          <button onClick={handleAddOrEdit} className="bg-black text-white px-4 py-2 rounded">
            {isEditing ? 'Save Changes' : 'Add'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {summaryData.map((item, index) => (
          <div key={index} className="border rounded shadow p-2 relative group bg-white">
            <div className="w-full text-center">
              {/* You can add icons based on the value here */}
              <div className="text-4xl">{item.icon}</div>
            </div>
            <p className="text-sm font-bold mt-1">{item.title}</p>
            <p className="text-xs">{item.value}</p>
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center space-y-2 transition">
              <button onClick={() => handleEdit(index)} className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1">
                <FaEdit /> Edit
              </button>
              <button onClick={() => handleDelete(index)} className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1">
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button className="px-6 py-2 rounded bg-black text-white cursor-pointer">Save All Changes</button>
      </div>
    </div>
  );
};

export default SummaryEditor;
