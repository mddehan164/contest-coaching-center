import React, { useState } from "react";
import admissionFormFields from "../data/admissionData";
import logo from "../data/images/logo.png"

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
      className="w-full px-1 sm:px-5 md:px-10 lg:px-20 xl:px-44 py-5 max-w-7xl mx-auto bg-contestLight rounded-2xl space-y-6"
    >
      <div className="w-full border">
        <div className="flex justify-between items-center w-full tracking-[.1rem] font-extrabold border">
          <img src={logo} alt="" className="w-[30%] aspect-square rounded-full bg-white p-2"/>
          <div className="border w-[65%]">
            <h1 className="text-3xl text-center">CONTEST</h1>
        <h3 className="text-sm tracking-wide font-normal leading-[1.2] text-center">University Admission Coaching</h3>
          </div>
        </div>
        <div className="hidden">photo</div>
        <h4 className="text-center mt-2 font-bold w-full bg-headerColor p-1">Admission Form</h4>
      </div>

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
              className="w-full p-1 border border-gray-300 rounded-md"
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
                className="w-full p-1 border border-gray-300 rounded-md"
              ></textarea>
            ) : (
              <input
                type={field.type}
                name={field.key}
                onChange={handleChange}
                className="w-full p-1 border border-gray-300 rounded-md"
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
                  className="w-full p-1 border border-gray-300 rounded-md"
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