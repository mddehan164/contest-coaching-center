import { useState } from "react";
import { summary } from "../data/data";
import { FaEdit, FaTrash } from "react-icons/fa";
import QuickStat from "./QuickStat"; // Assuming you have QuickStat component

const SummaryEditor = () => {
  const [summaryData, setSummaryData] = useState(summary.data);
  const [newSummary, setNewSummary] = useState({ title: "", value: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSummary({ ...newSummary, [name]: value });
  };

  const handleEdit = (index) => {
    const currentSummary = summaryData[index];
    setNewSummary(currentSummary);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleSaveChanges = () => {
    const updatedSummary = [...summaryData];
    updatedSummary[editIndex] = newSummary;
    setSummaryData(updatedSummary);
    setIsEditing(false);
    setEditIndex(null);
    setNewSummary({ title: "", value: "" });
  };

  const handleDelete = (index) => {
    const updatedSummary = [...summaryData];
    updatedSummary.splice(index, 1);
    setSummaryData(updatedSummary);
  };

  return (
    <div className="p-4 space-y-8 xl:px-44 xl:text-xl">
      <h2 className="text-2xl font-semibold text-center xl:text-4xl">
        Edit Summary
      </h2>

      {/* Edit Section with Preview Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          <button
            onClick={handleSaveChanges}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>

        {/* Preview Section */}
        {isEditing && (
          <div className="bg-gray-100 p-4 rounded-md shadow-md w-full max-w-xs mx-auto">
            <h3 className="text-xl font-semibold text-center">Preview</h3>
            <QuickStat
              data={{ ...newSummary, icon: summaryData[editIndex]?.icon }}
            />
          </div>
        )}
      </div>

      {/* Recent Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className="border rounded shadow p-2 relative group bg-white"
          >
            <QuickStat data={item} />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center space-y-2 transition">
              <button
                onClick={() => handleEdit(index)}
                className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Save All Changes Button */}
      <div className="text-center mt-6">
        <button
          className="px-6 py-2 rounded bg-black text-white cursor-pointer"
          onClick={() => {
            alert("Are you sure wanna change?");
          }}
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
};

export default SummaryEditor;
