import React, { useState } from "react";
import admissionFormFields from "../data/admissionData";
import logo from "../assets/images/logo.png"

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
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full px-1 sm:px-5 md:px-10 lg:px-20 xl:px-20 py-5 max-w-7xl mx-auto bg-contestLight rounded-2xl space-y-6 relative"
    >
      <div className="w-full">
        <div className="flex justify-between items-center w-full tracking-[.6rem] font-extrabold sm:justify-start md:py-6 md:px-3">
          <img src={logo} alt="" className="w-[25%] aspect-square rounded-full bg-white p-2 sm:w-[15%] md:w-[12%]"/>
          <div className="w-[50%]">
            <h1 className="text-3xl text-center sm:text-6xl">CONTEST</h1>
        <h3 className="text-sm tracking-wide font-normal leading-[1.2] text-center sm:text-2xl sm:tracking-normal text-contestRed">University Admission Coaching</h3>
          </div>
        </div>
        <div className="hidden sm:block w-28 aspect-square absolute bg-white top-6 right-12 md:w-36 md:right-20 xl:right-26 xl:w-44">
              <div className="flex items-center justify-center">
                <h5 className="mt-10 font-bold text-sm md:text-lg xl:text-xl xl:mt-20 lg:mt-16 text-gray-400 ">Upload Photo</h5>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-20"
              />
          </div>
        </div>
        <h4 className="text-center mt-2 font-bold w-full bg-headerColor p-1 lg:text-lg xl:text-xl">Admission Form</h4>
      </div>

      {/* Photo Upload */}
      <div className="sm:hidden">
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
        <div className="w-full text-center text-white">
          <h4 className="bg-headerColorHover py-1 w-1/3 rounded-3xl font-medium sm:w-1/4">For Office</h4>
        </div>
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

        <div className="w-full text-center text-white sm:pt-6">
          <h4 className="bg-headerColorHover py-1 w-1/2 rounded-3xl font-medium sm:w-1/4">Personal Information</h4>
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

      <div className="w-full text-center text-white pt-5">
          <h4 className="bg-headerColorHover py-1 w-[70%] rounded-3xl font-medium sm:w-1/3">Educational Qualifications</h4>
      </div>

      {/* Educational Qualifications */}
      {admissionFormFields.educationQualifications.map((exam) => (
        <div key={exam.exam}>
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

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-headerColor text-white px-8 py-2 rounded-md hover:bg-headerColorHover transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AdmissionForm;