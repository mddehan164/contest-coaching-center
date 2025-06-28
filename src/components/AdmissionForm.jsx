import React, { useState } from "react";
import admissionFormFields from "../data/admissionData";

const AdmissionForm = () => {
  const [formData, setFormData] = useState({});
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handlePhotoUpload = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = { ...formData, photo };
    console.log("Submitted Data:", submissionData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto bg-white shadow-lg rounded-2xl space-y-6"
    >
      <h1 className="text-3xl font-bold text-center text-blue-700">Admission Form</h1>

      {/* Photo Upload */}
      <div>
        <label className="block text-sm font-semibold mb-2">Upload Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Branch Options */}
      <div className="flex flex-wrap gap-4">
        {admissionFormFields.branchOptions.map((branch) => (
          <label key={branch} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="branch"
              value={branch}
              onChange={(e) => handleRadioChange("branch", e.target.value)}
              className="accent-blue-600"
            />
            {branch}
          </label>
        ))}
      </div>

      {/* Office Use Only */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {admissionFormFields.officeUseOnly.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium mb-1">{field.label}</label>
            <input
              type={field.type}
              name={field.key}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {admissionFormFields.personalInfo.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium mb-1">{field.label}</label>
            {field.type === "radio" ? (
              <div className="flex flex-wrap gap-4">
                {field.options.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name={field.key}
                      value={opt}
                      onChange={(e) => handleRadioChange(field.key, e.target.value)}
                      className="accent-blue-600"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ) : field.type === "textarea" ? (
              <textarea
                name={field.key}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              ></textarea>
            ) : (
              <input
                type={field.type}
                name={field.key}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            )}
          </div>
        ))}
      </div>

      {/* Educational Qualifications */}
      {admissionFormFields.educationQualifications.map((exam) => (
        <div key={exam.exam} className="pt-6">
          <h2 className="text-lg font-semibold mb-2 border-b pb-1">{exam.exam}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {exam.fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium mb-1">{field.label}</label>
                <input
                  type={field.type}
                  name={field.key}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AdmissionForm;