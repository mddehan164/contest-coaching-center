import React, { useState } from 'react';
import { noticeData } from '../data/data';
import NoticeHeader from './notice/NoticeHeader';
import NoticeBody from './notice/NoticeBody';

const EditNotices = () => {
  const [type, setType] = useState('Admission');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [pdf, setPdf] = useState(null);
  const [_, setRerender] = useState(false); // Used to trigger re-render of NoticeMain

  const handleSave = () => {
    if (!title || !date || !pdf) return alert('Fill all fields');
    if (pdf.type !== 'application/pdf' || pdf.size > 5 * 1024 * 1024) {
      return alert('Only PDF files allowed under 5MB');
    }

    const newNotice = {
      date,
      title,
      link: URL.createObjectURL(pdf),
    };

    const keyMap = {
      Admission: 'admissionNotices',
      Administration: 'administrationNotices',
      Department: 'departmentNotices'
    };

    const key = keyMap[type];
    noticeData.notices[key].splice(1, 0, newNotice); // Insert after currentDate

    alert('Notice added. This is client-side only.');
    setTitle('');
    setDate('');
    setPdf(null);
    setRerender(prev => !prev); // Trigger re-render of NoticeMain
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Edit Notice Form */}
        <div className="p-4 bg-white rounded-xl shadow-md space-y-4">
          <h2 className="text-2xl font-bold text-center">Edit Notices</h2>

          <div className="space-y-2">
            <label className="block font-medium">Add Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter notice title"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Add Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Choose Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              {noticeData.btnData.btnName.map((btn, idx) => (
                <option key={idx} value={btn}>{btn}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Upload PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdf(e.target.files[0])}
              className="w-full"
            />
            {pdf && (
              <p className="text-sm text-gray-600">Selected: {pdf.name}</p>
            )}
          </div>

          <div className="pt-4">
            <button
              onClick={handleSave}
              className="w-full bg-headerColorHover text-white font-bold py-2 px-4 rounded hover:bg-headerColor transition"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Preview Notice Panel */}
        <div>
          <NoticeHeader/>
          <NoticeBody/>
        </div>
      </div>
    </div>
  );
};

export default EditNotices;
