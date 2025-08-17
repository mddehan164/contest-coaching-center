import React, { useState } from "react";
import { noticeData, noticeBtnData } from "../data/data";
import { FaEdit, FaTrash, FaDownload } from "react-icons/fa";

const NoticeManager = () => {
  const [type, setType] = useState("Admission");
  const [notices, setNotices] = useState(noticeData.notices);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ title: "", date: "", pdf: null });

  const keyMap = {
    Admission: "admissionNotices",
    Administration: "administrationNotices",
    Department: "departmentNotices",
  };

  const currentNotices = notices[keyMap[type]].slice(1); // skip currentDate

  const handleAddOrUpdate = () => {
    if (
      !formData.title ||
      !formData.date ||
      (!formData.pdf && editIndex === null)
    ) {
      return alert("Fill all fields");
    }

    if (
      formData.pdf &&
      (formData.pdf.type !== "application/pdf" ||
        formData.pdf.size > 5 * 1024 * 1024)
    ) {
      return alert("Only PDF files under 5MB allowed");
    }

    const newNotice = {
      title: formData.title,
      date: formData.date,
      link: formData.pdf
        ? URL.createObjectURL(formData.pdf)
        : currentNotices[editIndex].link,
    };

    const updatedNotices = [...notices[keyMap[type]]];
    if (editIndex !== null) {
      updatedNotices[editIndex + 1] = newNotice; // +1 to skip currentDate
    } else {
      updatedNotices.splice(1, 0, newNotice); // add after currentDate
    }

    setNotices({ ...notices, [keyMap[type]]: updatedNotices });
    setFormData({ title: "", date: "", pdf: null });
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;
    const updated = [...notices[keyMap[type]]];
    updated.splice(index + 1, 1); // +1 to skip currentDate
    setNotices({ ...notices, [keyMap[type]]: updated });
  };

  const handleEdit = (index) => {
    const notice = currentNotices[index];
    setFormData({ title: notice.title, date: notice.date, pdf: null });
    setEditIndex(index);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {noticeBtnData.btnName.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => {
              setType(btn);
              setEditIndex(null);
              setFormData({ title: "", date: "", pdf: null });
            }}
            className={`px-4 py-2 rounded text-white font-medium ${
              type === btn ? "bg-headerColorHover" : "bg-headerColor"
            }`}
          >
            {btn}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-bold text-center">
          {editIndex !== null ? "Edit Notice" : "Add Notice"}
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFormData({ ...formData, pdf: e.target.files[0] })}
          className="w-full p-2 border rounded"
        />

        <button
          onClick={handleAddOrUpdate}
          className="w-full bg-headerColorHover text-white font-bold py-2 px-4 rounded hover:bg-headerColor transition"
        >
          {editIndex !== null ? "Update Notice" : "Add Notice"}
        </button>
      </div>

      {/* Notice List */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-3">Recent {type} Notices</h3>
        <ul className="space-y-3">
          {currentNotices.map((notice, idx) => (
            <li
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between border p-3 rounded bg-gray-50"
            >
              <div>
                <p className="font-medium">{notice.title}</p>
                <p className="text-sm text-gray-500">{notice.date}</p>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <a
                  href={notice.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaDownload />
                </a>
                <button
                  onClick={() => handleEdit(idx)}
                  className="text-green-600 hover:text-green-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(idx)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NoticeManager;
