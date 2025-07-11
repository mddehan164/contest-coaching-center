import React, { useState } from 'react';
import { courseData } from '../data/courseData';
import { FaEdit, FaTrash, FaEye, FaTimes } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const bulletStyles = {
  circle: 'list-disc',
  arrow: 'list-[">"]',
  decimal: 'list-decimal',
  roman: 'list-[upper-roman]',
  alpha: 'list-[upper-alpha]'
};

const CourseEditor = () => {
  const [courses, setCourses] = useState(courseData.courses);
  const [newCourse, setNewCourse] = useState({
    title: '',
    shortDesc: '',
    details: '',
    bulletType: 'circle',
    regularPrice: '',
    offer: false,
    offerPrice: '',
    image: ''
  });
  const [previewImage, setPreviewImage] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [previewFull, setPreviewFull] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setNewCourse({ ...newCourse, [name]: checked });
    } else if (type === 'file') {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setNewCourse({ ...newCourse, image: url });
      setPreviewImage(url);
    } else {
      setNewCourse({ ...newCourse, [name]: value });
    }
    setIsChanged(true);
  };

  const handleAddOrEditCourse = () => {
    const newBody = newCourse.shortDesc.split('\n').map(line => line.trim()).filter(Boolean);
    const course = {
      unit: newCourse.title,
      body: newBody,
      image: newCourse.image,
      regularPrice: newCourse.regularPrice,
      offer: newCourse.offer,
      offerPrice: newCourse.offerPrice,
      btnData: {
        btnName: ['Enroll Now', 'Details'],
        btnStyle: {
          btnBgColor: 'headerColor',
          btnHoverColor: 'headerColorHover',
          btnStatus: true
        }
      },
      bulletType: newCourse.bulletType
    };

    if (isEditing) {
      const updatedCourses = [...courses];
      updatedCourses[editIndex] = course;
      setCourses(updatedCourses);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setCourses([course, ...courses]);
    }

    setNewCourse({
      title: '',
      shortDesc: '',
      details: '',
      bulletType: 'circle',
      regularPrice: '',
      offer: false,
      offerPrice: '',
      image: ''
    });
    setPreviewImage('');
    setIsChanged(true);
  };

  const handleDelete = (index) => {
    const newCourses = [...courses];
    newCourses.splice(index, 1);
    setCourses(newCourses);
    setIsChanged(true);
  };

  const handleEdit = (index) => {
    const course = courses[index];
    setNewCourse({
      title: course.unit,
      shortDesc: course.body.join('\n'),
      details: course.body[1] || '',
      bulletType: course.bulletType || 'circle',
      regularPrice: course.regularPrice || '',
      offer: course.offer || false,
      offerPrice: course.offerPrice || '',
      image: course.image
    });
    setPreviewImage(course.image);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleSaveAll = () => {
    if (isChanged) setShowAlert(true);
  };

  const confirmSave = () => {
    setShowAlert(false);
    setIsChanged(false);
    alert('Changes saved successfully!');
  };

  return (
    <div className="p-4 space-y-8">
      <h2 className="text-2xl font-semibold text-center">Add or Edit Courses</h2>

      {/* Form Section */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2 col-span-2">
          <h3 className="text-xl font-semibold">Add a New Course</h3>
          <input type="file" name="image" onChange={handleInputChange} className="block w-full" />
          <input name="title" value={newCourse.title} onChange={handleInputChange} placeholder="Title" className="block w-full p-2 border rounded" />
          <textarea name="shortDesc" value={newCourse.shortDesc} onChange={handleInputChange} placeholder="Short Description (one per line)" className="block w-full p-2 border rounded h-24" />
          <textarea name="details" value={newCourse.details} onChange={handleInputChange} placeholder="Detail Description" className="block w-full p-2 border rounded h-20" />
          <select name="bulletType" value={newCourse.bulletType} onChange={handleInputChange} className="block w-full p-2 border rounded">
            <option value="circle">Circle</option>
            <option value="arrow">Arrow</option>
            <option value="decimal">Decimal</option>
            <option value="roman">Roman</option>
            <option value="alpha">Alpha</option>
          </select>
          <input name="regularPrice" value={newCourse.regularPrice} onChange={handleInputChange} placeholder="Regular Price" className="block w-full p-2 border rounded" />
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="offer" checked={newCourse.offer} onChange={handleInputChange} />
              <span>Offer</span>
            </label>
            {newCourse.offer && (
              <input name="offerPrice" value={newCourse.offerPrice} onChange={handleInputChange} placeholder="Offer Price" className="p-2 border rounded" />
            )}
          </div>
          <button onClick={handleAddOrEditCourse} className="bg-black text-white px-4 py-2 rounded">
            {isEditing ? 'Save Changes' : 'Add'}
          </button>
        </div>

        {/* Preview */}
        <div className="border p-4 rounded">
          <h4 className="font-semibold mb-2">Preview</h4>
          {previewImage && <img src={previewImage} alt="Preview" className="w-full aspect-[3/2] object-cover rounded" />}
          <p className="mt-2 font-bold">{newCourse.title}</p>
          <ul className={`${bulletStyles[newCourse.bulletType]} list-inside text-sm space-y-1`}>
            {newCourse.shortDesc.split('\n').map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          {newCourse.offer ? (
            <p className="text-sm mt-2">
              <span className="line-through text-gray-500 mr-2">৳{newCourse.regularPrice}</span>
              <span className="text-red-500 font-semibold">৳{newCourse.offerPrice}</span>
            </p>
          ) : (
            <p className="text-sm mt-2">৳{newCourse.regularPrice}</p>
          )}
          <div className="flex gap-2 mt-2">
            <button className="text-white bg-headerColor px-2 py-1 text-xs rounded">Enroll Now</button>
            <button className="text-white bg-headerColorHover px-2 py-1 text-xs rounded">Details</button>
          </div>
        </div>
      </div>

      {/* Recent Courses */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Recent Courses</h3>
        <Swiper slidesPerView={1.2} spaceBetween={10} navigation modules={[Navigation]} breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}>
          {courses.map((course, index) => (
            <SwiperSlide key={index}>
              <div className="relative group border rounded p-2 shadow hover:shadow-lg">
                <img src={course.image} alt={course.unit} className="w-full aspect-[3/2] object-cover rounded" />
                <p className="text-sm font-semibold mt-1">{course.unit}</p>
                <ul className={`${bulletStyles[course.bulletType || 'circle']} list-inside text-xs space-y-1`}>
                  {course.body.map((line, idx) => <li key={idx}>{line}</li>)}
                </ul>
                {course.offer ? (
                  <p className="text-xs mt-2">
                    <span className="line-through text-gray-500 mr-1">৳{course.regularPrice}</span>
                    <span className="text-red-500 font-semibold">৳{course.offerPrice}</span>
                  </p>
                ) : (
                  <p className="text-xs mt-2">৳{course.regularPrice}</p>
                )}
                <div className="flex gap-2 mt-2">
                  <button className="text-white bg-headerColor px-2 py-1 text-xs rounded">Enroll Now</button>
                  <button className="text-white bg-headerColorHover px-2 py-1 text-xs rounded">Details</button>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center space-y-2 transition">
                  <button onClick={() => setPreviewFull(course)} className="bg-white text-black px-3 py-1 rounded flex items-center gap-1"><FaEye /> Preview</button>
                  <button onClick={() => handleEdit(index)} className="bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"><FaEdit /> Edit</button>
                  <button onClick={() => handleDelete(index)} className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"><FaTrash /> Delete</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="text-center">
        <button onClick={handleSaveAll} disabled={!isChanged} className={`px-6 py-2 rounded ${isChanged ? 'bg-black text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}>Save All Changes</button>
      </div>

      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-xl space-y-4 w-[90%] max-w-md text-center">
            <p className="text-lg font-semibold">Do you want to save the changes?</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setShowAlert(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={confirmSave} className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Preview */}
      {previewFull && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 w-[90%] md:w-[70%] lg:w-[50%] relative">
            <button onClick={() => setPreviewFull(null)} className="absolute top-2 right-2 text-red-500 text-xl"><FaTimes /></button>
            <img src={previewFull.image} alt={previewFull.unit} className="w-full aspect-[3/2] object-cover rounded mb-2" />
            <h2 className="text-lg font-bold mb-2">{previewFull.unit}</h2>
            <ul className={`${bulletStyles[previewFull.bulletType || 'circle']} list-inside space-y-1 ml-4`}>
              {previewFull.body.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
            {previewFull.offer ? (
              <p className="text-sm mt-2">
                <span className="line-through text-gray-500 mr-2">৳{previewFull.regularPrice}</span>
                <span className="text-red-500 font-semibold">৳{previewFull.offerPrice}</span>
              </p>
            ) : (
              <p className="text-sm mt-2">৳{previewFull.regularPrice}</p>
            )}
            <div className="flex gap-2 mt-4">
              <button className="text-white bg-headerColor px-4 py-1 rounded">Enroll Now</button>
              <button className="text-white bg-headerColorHover px-4 py-1 rounded">Details</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseEditor;