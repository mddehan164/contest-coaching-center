import { useState } from "react";
import { services } from "../data/data"; // Assuming you have a services data file
import {
  FaBookOpen,
  FaHeadphones,
  FaFileAlt,
  FaQuestion,
  FaSms,
  FaChartBar,
} from "react-icons/fa";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";

const iconMap = {
  library: FaBookOpen,
  teacher: GiTeacher,
  audio: FaHeadphones,
  video: MdOutlineVideoLibrary,
  system: FaFileAlt,
  qa: FaQuestion,
  sms: FaSms,
  report: FaChartBar,
};

const iconOptions = [
  { value: "library", icon: FaBookOpen },
  { value: "teacher", icon: GiTeacher },
  { value: "audio", icon: FaHeadphones },
  { value: "video", icon: MdOutlineVideoLibrary },
  { value: "system", icon: FaFileAlt },
  { value: "qa", icon: FaQuestion },
  { value: "sms", icon: FaSms },
  { value: "report", icon: FaChartBar },
];

const ServiceEditor = () => {
  const [newService, setNewService] = useState({
    title: "",
    selectedIcon: iconOptions[0], // Default to first icon option
  });

  const [servicesData, setServicesData] = useState(services); // Initial services data

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({ ...prev, [name]: value }));
  };

  // Handle icon selection
  const handleIconChange = (icon) => {
    setNewService((prev) => ({ ...prev, selectedIcon: icon }));
  };

  // Add new service to the list
  const handleAddService = () => {
    const { title, selectedIcon } = newService;

    if (!title.trim()) {
      alert("Please provide a title");
      return;
    }

    // Add the new service with selected icon
    const newServiceObj = {
      title,
      icon: selectedIcon.icon,
    };

    setServicesData((prev) => [...prev, newServiceObj]);

    // Reset form after adding
    setNewService({
      title: "",
      selectedIcon: iconOptions[0], // Reset to default icon
    });
  };

  // Edit existing service
  const handleEditService = (index) => {
    const service = servicesData[index];
    setNewService({
      title: service.title,
      selectedIcon:
        iconOptions.find((icon) => icon.icon === service.icon) ||
        iconOptions[0],
    });
  };

  // Delete a service
  const handleDeleteService = (index) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      const updatedServices = [...servicesData];
      updatedServices.splice(index, 1);
      setServicesData(updatedServices);
    }
  };

  return (
    <div className="container mx-auto p-6 xl:px-44 text-center">
      <h2 className="text-2xl font-bold text-center mb-6">Service Editor</h2>

      {/* Service Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="title"
          value={newService.title}
          onChange={handleInputChange}
          placeholder="Service Title"
          className="p-2 border rounded"
        />

        {/* Icon Picker */}
        <div className="col-span-2 flex gap-4 justify-center mb-4">
          {iconOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => handleIconChange(option)}
              className={`p-4 border rounded-full cursor-pointer ${
                newService.selectedIcon.value === option.value
                  ? "bg-blue-200"
                  : ""
              }`}
            >
              <option.icon className="text-3xl text-center" />
            </div>
          ))}
        </div>

        <button
          onClick={handleAddService}
          className="col-span-2 bg-blue-500 text-white p-2 rounded mt-4"
        >
          Add Service
        </button>
      </div>

      {/* Preview Service */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold">Preview</h3>
        <div className="rounded-full w-28 h-28 flex items-center justify-center mx-auto text-headerColorHover bg-headerColor mb-4">
          <newService.selectedIcon.icon className="text-3xl" />
        </div>
        <p className="font-semibold">{newService.title || "No Title"}</p>
      </div>

      {/* Displaying Services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {servicesData.map((service, index) => (
          <div key={index} className="p-4 border rounded shadow-lg">
            <div className="rounded-full w-28 h-28 flex items-center justify-center text-headerColorHover bg-headerColor mx-auto">
              <service.icon className="text-3xl" />
            </div>
            <p className="text-center mt-4 font-semibold">{service.title}</p>
            <div className="flex gap-2 justify-center mt-3">
              <button
                onClick={() => handleEditService(index)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteService(index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="bg-black text-white hover:bg-zinc-900 w-1/2 my-10 px-1 py-3 rounded-md"
        onClick={() => {
          alert("Wanna Sure Save Changes");
        }}
      >
        Save Changes
      </button>
    </div>
  );
};

export default ServiceEditor;
