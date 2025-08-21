import React, { useState } from "react";
import {
  courseHeroData,
  courseTemplate,
  sampleCourse,
} from "../../data/courseData";
import HeroSection from "./HeroSection";
import HeroEditModal from "./HeroEditModal";
import CourseForm from "./CourseForm";
import RecentCourses from "./RecentCourses";
import FullScreenPreview from "./FullScreenPreview";
import MarkdownEditor from "../MarkdownEditor";

const CourseEditor = () => {
  const [courses, setCourses] = useState([sampleCourse]);
  const [newCourse, setNewCourse] = useState({
    ...courseTemplate,
    branch_id: [1], // default branch
    group: "science", // default group
  });
  const [previewImage, setPreviewImage] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [previewFull, setPreviewFull] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [hero, setHero] = useState(courseHeroData);
  const [showHeroModal, setShowHeroModal] = useState(false);
  const [formHero, setFormHero] = useState({
    title: "",
    subtitle: "",
    des: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setNewCourse({ ...newCourse, [name]: checked });
    } else if (type === "file") {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setNewCourse({ ...newCourse, image: url });
      setPreviewImage(url);
    } else {
      setNewCourse({ ...newCourse, [name]: value });
    }
    setIsChanged(true);
  };

  const handleAddOrEditCourse = (e) => {
    e.preventDefault();
    if (isEditing && editIndex !== null) {
      const updatedCourses = [...courses];
      updatedCourses[editIndex] = newCourse;
      setCourses(updatedCourses);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setCourses([...courses, newCourse]);
    }
    setNewCourse({
      title: "",
      shortDesc: "",
      details: "",
      bulletType: "circle",
      price: "",
      offer: false,
      offerPrice: "",
      image: "",
    });
    setPreviewImage("");
    setIsChanged(true);
  };

  const handleEdit = (index) => {
    setNewCourse(courses[index]);
    setPreviewImage(courses[index].image);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
    setIsChanged(true);
  };

  const handleSaveAll = () => {
    setShowAlert(true);
  };

  const confirmSave = () => {
    // Implement your save logic here
    setShowAlert(false);
    setIsChanged(false);
  };

  const handleHeroSave = () => {
    setHero(formHero);
    setShowHeroModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormHero({ ...formHero, image: url });
    }
  };

  return (
    <div className="p-4 space-y-8">
      <h2 className="text-2xl font-semibold text-center">
        Add or Edit Courses
      </h2>
      <HeroSection hero={hero} onEdit={() => setShowHeroModal(true)} />
      {showHeroModal && (
        <HeroEditModal
          formHero={formHero}
          setFormHero={setFormHero}
          onClose={() => setShowHeroModal(false)}
          onSave={handleHeroSave}
          handleImageUpload={handleImageUpload}
        />
      )}
      <CourseForm
        newCourse={newCourse}
        handleInputChange={handleInputChange}
        handleAddOrEditCourse={handleAddOrEditCourse}
        isEditing={isEditing}
        previewImage={previewImage}
        bulletStyles={bulletStyles}
      />
      <RecentCourses
        courses={courses}
        bulletStyles={bulletStyles}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPreview={setPreviewFull}
      />
      <div className="text-center">
        <button
          onClick={handleSaveAll}
          disabled={!isChanged}
          className={`px-6 py-2 rounded ${
            isChanged
              ? "bg-black text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Save All Changes
        </button>
      </div>
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-xl space-y-4 w-[90%] max-w-md text-center">
            <p className="text-lg font-semibold">
              Do you want to save the changes?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowAlert(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmSave}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {previewFull && (
        <FullScreenPreview
          previewFull={previewFull}
          bulletStyles={bulletStyles}
          onClose={() => setPreviewFull(null)}
        />
      )}
    </div>
  );
};

export default CourseEditor;
