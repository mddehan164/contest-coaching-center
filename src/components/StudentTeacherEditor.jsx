// src/components/StudentTeacherEditor.jsx

import React, { useState, useRef } from 'react';

const StudentTeacherEditor = ({ data, type, onSave, onAdd }) => {
  const [entries, setEntries] = useState(data);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageError, setImageError] = useState('');
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const fileInputRef = useRef(null);

  // Function to fetch batches for selected course
  // const fetchBatchesForCourse = async (courseId) => {
  //   try {
  //     const response = await fetch(`/api/courses/${courseId}/batches`);
  //     const data = await response.json();
  //     setBatches(data);
  //   } catch (error) {
  //     console.error('Error fetching batches:', error);
  //     setBatches([]);
  //   }
  // };

  // // Function to fetch all courses
  // const fetchCourses = async () => {
  //   try {
  //     const response = await fetch('/api/courses');
  //     const data = await response.json();
  //     setCourses(data);
  //   } catch (error) {
  //     console.error('Error fetching courses:', error);
  //     setCourses([]);
  //   }
  // };

  // Fetch courses when component mounts
  // React.useEffect(() => {
  //   fetchCourses();
  // }, []);

  // Constants
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  
  // Dummy Course Data
  const DUMMY_COURSES = [
    { id: 1, name: 'HSC 2024 Regular' },
    { id: 2, name: 'HSC 2025 Regular' },
    { id: 3, name: 'HSC Special Batch' },
    { id: 4, name: 'SSC 2024 Regular' },
    { id: 5, name: 'SSC 2025 Regular' }
  ];

  // Dummy Batch Data
  const DUMMY_BATCHES = {
    1: [ // HSC 2024 Regular batches
      { id: 1, name: 'HSC 24 Morning' },
      { id: 2, name: 'HSC 24 Evening' }
    ],
    2: [ // HSC 2025 Regular batches
      { id: 3, name: 'HSC 25 Morning A' },
      { id: 4, name: 'HSC 25 Morning B' },
      { id: 5, name: 'HSC 25 Evening' }
    ],
    3: [ // HSC Special batches
      { id: 6, name: 'HSC Special Morning' },
      { id: 7, name: 'HSC Special Evening' }
    ],
    4: [ // SSC 2024 Regular batches
      { id: 8, name: 'SSC 24 Morning' },
      { id: 9, name: 'SSC 24 Evening' }
    ],
    5: [ // SSC 2025 Regular batches
      { id: 10, name: 'SSC 25 Morning' },
      { id: 11, name: 'SSC 25 Evening' }
    ]
  };
  
  const GENDER_OPTIONS = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const GROUP_OPTIONS = [
    { value: 'science', label: 'Science' },
    { value: 'arts', label: 'Arts' },
    { value: 'commerce', label: 'Commerce' }
  ];


  const getEmptyEntry = () => {
    return type === 'student'
      ? {
          name: '',
          image: '',
          course_id: '',
          batch_id: '',
          father_name: '',
          mother_name: '',
          gender: 'male',
          group: 'science',
          mobile: '',
          address: '',
          ssc_result: '',
          hsc_result: '',
          total_amount: '',
          status: 1
        }
      : {
          name: '',
          image: '',
          subject: '',
          gender: 'male',
          mobile: '',
          address: '',
          course_id: '',
          batch_id: '',
          status: 1
        };
  };

  const validateImage = (file) => {
    setImageError('');
    
    if (!file) {
      setImageError('Please select an image file.');
      return false;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setImageError('Please upload a valid image file (JPG, PNG, or WebP).');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setImageError('Image size should be less than 5MB.');
      return false;
    }

    return true;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    setImageError('');

    if (!file) return;

    if (validateImage(file)) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setSelectedEntry(prev => ({ ...prev, image: file }));
    }

    // Reset file input
    e.target.value = '';
  };

  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;

    if (name === 'image' && files?.[0]) {
      handleImageUpload(e);
      return;
    }

    let processedValue = value;

    // Process the value based on field type
    if (name === 'course_id') {
      processedValue = value ? parseInt(value) : '';
      // Clear batch when course changes
      setSelectedEntry(prev => ({
        ...prev,
        [name]: processedValue,
        batch_id: '' // Reset batch when course changes
      }));
      return;
    } else if (name === 'batch_id') {
      processedValue = value ? parseInt(value) : '';
    } else if (name === 'status') {
      processedValue = value === '1' ? 1 : 0;
    } else if (['ssc_result', 'hsc_result', 'total_amount'].includes(name)) {
      processedValue = value === '' ? '' : parseFloat(value);
    }

    // Handle different input types
    switch(name) {
      case 'course_id':
        processedValue = value;
        // Clear batch selection when course changes
        setSelectedEntry(prev => ({ ...prev, [name]: value, batch_id: '' }));
        // Fetch batches for selected course
        if (value) {
          // fetchBatchesForCourse(value);
        } else {
          setBatches([]);
        }
        return;
      
      case 'status':
        processedValue = parseInt(value);
        break;
      
      case 'ssc_result':
      case 'hsc_result':
      case 'total_amount':
        processedValue = value === '' ? '' : parseFloat(value);
        break;
      
      default:
        processedValue = value;
    }

    setSelectedEntry(prev => ({ ...prev, [name]: processedValue }));
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
    // Set image preview if entry has image
    if (entry.image) {
      setImagePreview(typeof entry.image === 'string' ? entry.image : URL.createObjectURL(entry.image));
    } else {
      setImagePreview('');
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
    setShowForm(true);
    setViewMode(false);
    
    // Convert status to number format (0 or 1)
    const entryToEdit = {
      ...selectedEntry,
      status: typeof selectedEntry.status === 'boolean' 
        ? (selectedEntry.status ? 1 : 0) 
        : (selectedEntry.status === 1 || selectedEntry.status === '1' ? 1 : 0)
    };
    
    setSelectedEntry(entryToEdit);
    
    // Preserve existing image when editing
    if (selectedEntry?.image) {
      setImagePreview(typeof selectedEntry.image === 'string' ? selectedEntry.image : URL.createObjectURL(selectedEntry.image));
    }
  };

  const handleAdd = () => {
    setSelectedEntry(getEmptyEntry());
    setIsEdit(false);
    setShowForm(true);
    setViewMode(false);
    setImageFile(null);
    setImagePreview('');
    setImageError('');
  };

  const confirmSave = () => {
    // Ensure course_id and batch_id are numbers
    const processedEntry = {
      ...selectedEntry,
      course_id: selectedEntry.course_id ? parseInt(selectedEntry.course_id) : '',
      batch_id: selectedEntry.batch_id ? parseInt(selectedEntry.batch_id) : ''
    };

    if (isEdit) {
      const updated = entries.map((e) => (e.id === selectedEntry.id ? processedEntry : e));
      setEntries(updated);
      onSave && onSave(processedEntry);
    } else {
      const newEntry = { 
        ...processedEntry, 
        id: Date.now() + Math.floor(Math.random() * 1000)
      };
      const updated = [...entries, newEntry];
      setEntries(updated);
      onAdd && onAdd(newEntry);
    }

    // Debug log to verify data
    // console.log('Saved entry:', processedEntry);
    
    setShowForm(false);
    setViewMode(false);
  };

  // const confirmDelete = (entry) => {
  //   if (window.confirm('Are you sure you want to delete this entry?')) {
  //     const updated = entries.filter((e) => e.id !== entry.id);
  //     setEntries(updated);
  //     onDelete && onDelete(entry.id);
  //   }
  // };

  const renderImageUpload = () => (
    <div className="relative mb-6 w-full">
      <div className="flex items-start space-x-4">
        <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400">
              No Image
            </div>
          )}
        </div>
        <div className="flex-1">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            {imagePreview ? 'Change Image' : 'Upload Image'}
          </button>
          {imageError && (
            <p className="mt-2 text-sm text-red-500">{imageError}</p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            Supported formats: JPG, PNG, WebP (max 5MB)
          </p>
        </div>
      </div>
    </div>
  );

  const renderFormField = (name, idx) => {
    const label = name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Special field rendering based on field name
    switch(name) {
      case 'gender':
        return (
          <div className="mb-2" key={idx}>
            <label className="block font-medium text-sm">{label}</label>
            <select
              name={name}
              value={selectedEntry[name] || ''}
              onChange={handleInputChange}
              className="border p-1 rounded w-full"
            >
              {GENDER_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'group':
        return (
          <div className="mb-2" key={idx}>
            <label className="block font-medium text-sm">{label}</label>
            <select
              name={name}
              value={selectedEntry[name] || ''}
              onChange={handleInputChange}
              className="border p-1 rounded w-full"
            >
              {GROUP_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'course_id':
        return (
          <div className="mb-2" key={idx}>
            <label className="block font-medium text-sm">Course</label>
            <select
              name={name}
              value={selectedEntry[name] || ''}
              onChange={handleInputChange}
              className="border p-1 rounded w-full"
            >
              <option value="">Select Course</option>
              {DUMMY_COURSES.map(course => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
        );

      case 'batch_id':
        return (
          <div className="mb-2" key={idx}>
            <label className="block font-medium text-sm">Batch</label>
            <select
              name={name}
              value={selectedEntry[name] || ''}
              onChange={handleInputChange}
              className="border p-1 rounded w-full"
              disabled={!selectedEntry.course_id}
            >
              <option value="">Select Batch</option>
              {DUMMY_BATCHES[selectedEntry.course_id]?.map(batch => (
                <option key={batch.id} value={batch.id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>
        );

      case 'status':
        return (
          <div className="mb-2" key={idx}>
            <label className="block font-medium text-sm">{label}</label>
            <select
              name={name}
              value={selectedEntry[name]}
              onChange={handleInputChange}
              className="border p-1 rounded w-full"
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Current Status: {selectedEntry[name] === 1 || selectedEntry[name] === true ? 'Active' : 'Inactive'}
            </p>
          </div>
        );

      case 'ssc_result':
      case 'hsc_result':
        return (
          <div className="mb-2" key={idx}>
            <label className="block font-medium text-sm">{label}</label>
            <input
              type="number"
              name={name}
              value={selectedEntry[name] || ''}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              max="5"
              className="border p-1 rounded w-full"
            />
          </div>
        );

      case 'total_amount':
        return (
          <div className="mb-2" key={idx}>
            <label className="block font-medium text-sm">{label}</label>
            <input
              type="number"
              name={name}
              value={selectedEntry[name] || ''}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              className="border p-1 rounded w-full"
            />
          </div>
        );

      case 'mobile':
        return (
          <div className="mb-2" key={idx}>
            <label className="block font-medium text-sm">{label}</label>
            <input
              type="tel"
              name={name}
              value={selectedEntry[name] || ''}
              onChange={handleInputChange}
              pattern="[0-9]{11}"
              placeholder="01XXXXXXXXX"
              className="border p-1 rounded w-full"
            />
          </div>
        );

      default:
        return (
          <div className="mb-2" key={idx}>
            <label className="block font-medium text-sm">{label}</label>
            <input
              type="text"
              name={name}
              value={selectedEntry[name] || ''}
              onChange={handleInputChange}
              className="border p-1 rounded w-full"
            />
          </div>
        );
    }
  };

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
      <h2 className="text-xl font-bold mb-4 text-[#102542]">
        {isEdit ? `Edit ${type === 'student' ? 'Student' : 'Teacher'}` : `Add New ${type === 'student' ? 'Student' : 'Teacher'}`}
      </h2>
      
      {/* Image Upload Section */}
      {renderImageUpload()}

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(getEmptyEntry()).map(([key, val]) => (
          Array.isArray(val) || key === 'image'
            ? null
            : renderFormField(key.replace(/([A-Z])/g, ' $1'), key)
        ))}
      </div>
      {type === 'student' && (
        <>
          {/* {renderNestedFields('installments')}
          {renderNestedFields('examResults')}
          {renderNestedFields('lectureSheets')} */}
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
      <h2 className="text-xl xl:text-3xl font-bold mb-4 text-[#102542]">
        {type === 'student' ? 'Student' : 'Teacher'} Details
      </h2>
      
      {/* Image Preview in View Mode */}
      <div className="mb-6">
        {imagePreview ? (
          <div className="w-32 h-32 rounded-lg overflow-hidden">
            <img
              src={imagePreview}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(selectedEntry).map(([key, value]) => (
          Array.isArray(value) || key === 'image' ? null : (
            <div key={key}>
              <strong className="text-base md:text-lg text-gray-700">
                {key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').replace(/^./, str => str.toUpperCase())}:
              </strong>
              <span className="ml-1 break-words">
                {key === 'status' ? 
                  (value === 1 || value === true ? 
                    <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-800">Active</span> : 
                    <span className="px-2 py-1 rounded text-sm bg-red-100 text-red-800">Inactive</span>
                  ) :
                  key === 'gender' ? 
                    GENDER_OPTIONS.find(opt => opt.value === value)?.label || value :
                  key === 'group' ?
                    GROUP_OPTIONS.find(opt => opt.value === value)?.label || value :
                  key === 'course_id' ?
                    DUMMY_COURSES.find(c => c.id === value)?.name || value :
                  key === 'batch_id' ?
                    DUMMY_BATCHES[selectedEntry.course_id]?.find(b => b.id === value)?.name || value :
                    value
                }
              </span>
            </div>
          )
        ))}
      </div>
{/* 
      {type === 'student' && selectedEntry?.installments?.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Payment Installments</h3>
          <table className="table-auto border w-full">
            <thead className="bg-headerColor text-white">
              <tr>
                <th className="px-2 py-1">Installment</th>
                <th className="px-2 py-1">Amount</th>
                <th className="px-2 py-1">Status</th>
                <th className="px-2 py-1">Payment Date</th>
                <th className="px-2 py-1">Next Payment</th>
              </tr>
            </thead>
            <tbody>
              {selectedEntry.installments.map((item, i) => (
                <tr key={i}>
                  {Object.values(item).map((val, j) => (
                    <td key={j} className="border px-2 py-1">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}

      {/* {type === 'teacher' && selectedEntry?.paymentRecords?.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Payment Records</h3>
          <table className="table-auto border w-full">
            <thead className="bg-headerColor text-white">
              <tr>
                <th className="px-2 py-1">Class ID</th>
                <th className="px-2 py-1">Amount</th>
                <th className="px-2 py-1">Payment Date</th>
                <th className="px-2 py-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {selectedEntry.paymentRecords.map((item, i) => (
                <tr key={i}>
                  {Object.values(item).map((val, j) => (
                    <td key={j} className="border px-2 py-1">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}

      <div className="mt-6 flex gap-4">
        <button onClick={handleEdit} className="bg-headerColorHover text-white px-4 py-2 rounded">Edit</button>
        <button onClick={() => setViewMode(false)} className="bg-gray-600 text-white px-4 py-2 rounded">Back</button>
      </div>
    </div>
  );

      <div className="mt-6 flex gap-4">
        <button onClick={handleEdit} className="bg-headerColorHover text-white px-4 py-2 rounded">Edit</button>
        <button onClick={() => setViewMode(false)} className="bg-gray-600 text-white px-4 py-2 rounded">Back</button>
      </div>


  const getFilteredEntries = () => {
    // Sort only by ID to maintain constant serial numbers
    const sortedEntries = [...entries].sort((a, b) => a.id - b.id);
    const searchLower = searchText.toLowerCase();

    return sortedEntries.filter((entry, index, self) => {
      // Include serial number in search
      const serialNumber = String(index + 1).padStart(2, '0');
      if (searchText && serialNumber.includes(searchLower)) {
        return true;
      }

      // Get batch name for search
      const batchName = DUMMY_BATCHES[entry.course_id]?.find(b => b.id === entry.batch_id)?.name || '';
      const courseName = DUMMY_COURSES.find(c => c.id === entry.course_id)?.name || '';
      
      // Include status text in search
      const statusText = entry.status ? 'active' : 'inactive';
      
      // Add additional searchable fields
      const searchableFields = {
        ...entry,
        batchName,
        courseName,
        statusText,
        gender: GENDER_OPTIONS.find(opt => opt.value === entry.gender)?.label || '',
        group: GROUP_OPTIONS.find(opt => opt.value === entry.group)?.label || ''
      };

      // Search in all fields
      const match = Object.entries(searchableFields).some(([key, val]) => {
        if (typeof val === 'string' || typeof val === 'number') {
          return val.toString().toLowerCase().includes(searchLower);
        }
        return false;
      });

      const firstIndex = self.findIndex(e => e.id === entry.id);
      return match && firstIndex === index; // remove duplicate ids
    });
  };

  const filteredEntries = getFilteredEntries();

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

          <table className="w-full table-auto border">
            <thead className="bg-[#102542] text-white">
              <tr>
                {type === 'student' ? (
                  <>
                    <th className="border px-3 py-2 w-16">SN</th>
                    <th className="border px-3 py-2">Name</th>
                    <th className="border px-3 py-2">Batch</th>
                    <th className="border px-3 py-2">Mobile</th>
                    <th className="border px-3 py-2">Status</th>
                  </>
                ) : (
                  <>
                    <th className="border px-3 py-2">SN</th>
                    <th className="border px-3 py-2">Name</th>
                    <th className="border px-3 py-2">Subject</th>
                    <th className="border px-3 py-2">Batch</th>
                    <th className="border px-3 py-2">Status</th>
                  </>
                )}
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry, index) => (
                <tr key={entry.id + '_' + entry.name} 
                    className={`hover:bg-contestLight ${!entry.status ? 'text-gray-500 bg-gray-50' : ''}`}>
                  {type === 'student' ? (
                    <>
                      <td className="border px-3 py-2 text-center w-16 font-medium">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="border px-3 py-2">{entry.name}</td>
                      <td className="border px-3 py-2">
                        {(() => {
                          const course = DUMMY_COURSES.find(c => c.id === parseInt(entry.course_id));
                          const batch = course ? DUMMY_BATCHES[course.id]?.find(b => b.id === parseInt(entry.batch_id)) : null;
                          return batch ? batch.name : '-';
                        })()}
                      </td>
                      <td className="border px-3 py-2">{entry.mobile || '-'}</td>
                      <td className="border px-3 py-2">
                        <span className={`px-2 py-1 rounded text-sm ${entry.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {entry.status ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border px-3 py-2 text-center w-16 font-medium">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="border px-3 py-2">{entry.name}</td>
                      <td className="border px-3 py-2">{entry.subject}</td>
                      <td className="border px-3 py-2">
                        {(() => {
                          const course = DUMMY_COURSES.find(c => c.id === parseInt(entry.course_id));
                          const batch = course ? DUMMY_BATCHES[course.id]?.find(b => b.id === parseInt(entry.batch_id)) : null;
                          return batch ? batch.name : '-';
                        })()}
                      </td>
                      <td className="border px-3 py-2">
                        <span className={`px-2 py-1 rounded text-sm ${entry.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {entry.status ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </>
                  )}
                  <td className="border px-3 py-2 space-x-2 text-center">
                    <button onClick={() => handleView(entry)} className="bg-headerColor hover:bg-headerColorHover text-white px-3 py-1 rounded">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewMode && selectedEntry && renderViewDetails()}
      {showForm && selectedEntry && renderForm()}
    </div>
  );
};

export default StudentTeacherEditor;
