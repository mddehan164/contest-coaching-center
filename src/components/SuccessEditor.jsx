import { useState } from "react";
import { successData } from "../data/SuccessfulStudentData";
import { FaEdit, FaTrash, FaEye, FaTimes } from "react-icons/fa";

const SuccessEditor = () => {
  const [people, setPeople] = useState(successData.mainData);
  const [newPerson, setNewPerson] = useState({
    img: "",
    title: "",
    subtitle: "",
    rank: "",
    description: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [previewFull, setPreviewFull] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setNewPerson({ ...newPerson, img: url });
      setPreviewImage(url);
    } else {
      setNewPerson({ ...newPerson, [name]: value });
    }
  };

  const handleAddOrEdit = () => {
    if (isEditing) {
      const updated = [...people];
      updated[editIndex] = newPerson;
      setPeople(updated);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setPeople([newPerson, ...people]);
    }
    setNewPerson({
      img: "",
      title: "",
      subtitle: "",
      rank: "",
      description: "",
    });
    setPreviewImage("");
  };

  const handleDelete = (index) => {
    const updated = [...people];
    updated.splice(index, 1);
    setPeople(updated);
  };

  const handleEdit = (index) => {
    const p = people[index];
    setNewPerson(p);
    setPreviewImage(p.img);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="p-4 space-y-8 xl:px-44 xl:text-xl">
      <h2 className="text-2xl font-semibold text-center">
        Add or Edit Successful Students
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2 col-span-2">
          <input
            type="file"
            name="img"
            onChange={handleInputChange}
            className="block w-full"
          />
          <input
            name="title"
            value={newPerson.title}
            onChange={handleInputChange}
            placeholder="Name"
            className="block w-full p-2 border rounded"
          />
          <input
            name="subtitle"
            value={newPerson.subtitle}
            onChange={handleInputChange}
            placeholder="Department/Year"
            className="block w-full p-2 border rounded"
          />
          <input
            name="rank"
            value={newPerson.rank}
            onChange={handleInputChange}
            placeholder="Rank"
            className="block w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={newPerson.description}
            onChange={handleInputChange}
            placeholder="Success Story"
            className="block w-full p-2 border rounded h-24"
          />
          <button
            onClick={handleAddOrEdit}
            className="bg-black text-white px-4 py-2 rounded"
          >
            {isEditing ? "Save Changes" : "Add"}
          </button>
        </div>

        <div className="border p-4 rounded">
          <h4 className="font-semibold mb-2">Preview</h4>
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-[80%] xl:w-[50%] mx-auto object-cover rounded-full aspect-square"
            />
          )}
          <p className="mt-2 font-bold">{newPerson.title}</p>
          <p className="text-sm">{newPerson.subtitle}</p>
          <p className="text-sm font-semibold">{newPerson.rank}</p>
          <p className="text-xs mt-2">{newPerson.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {people.map((person, index) => (
          <div
            key={index}
            className="border rounded shadow p-2 relative group bg-white"
          >
            <div className="w-full flex items-center justify-center aspect-square">
              <img
                src={person.img}
                alt={person.title}
                className="w-[80%] object-cover rounded-full"
                loading="lazy"
              />
            </div>
            <p className="text-sm font-bold mt-1">{person.title}</p>
            <p className="text-xs text-gray-600">{person.subtitle}</p>
            <p className="text-xs font-semibold">{person.rank}</p>
            <p className="text-xs mt-1 line-clamp-3">{person.description}</p>
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center space-y-2 transition">
              <button
                onClick={() => setPreviewFull(person)}
                className="bg-white text-black px-3 py-1 rounded flex items-center gap-1"
              >
                <FaEye /> Preview
              </button>
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
      <div className="text-center">
        <button
          className={`px-6 py-2 rounded bg-black text-white cursor-pointer`}
        >
          Save All Changes
        </button>
      </div>

      {previewFull && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 w-[90%] md:w-[70%] lg:w-[50%] relative flex flex-col gap-2 items-center">
            <button
              onClick={() => setPreviewFull(null)}
              className="absolute top-2 right-2 text-red-500 text-xl"
            >
              <FaTimes />
            </button>
            <img
              src={previewFull.img}
              alt={previewFull.title}
              className="w-[60%] aspect-square object-cover rounded mb-2"
              loading="lazy"
            />
            <h2 className="text-lg font-bold mb-2">{previewFull.title}</h2>
            <p className="text-sm">{previewFull.subtitle}</p>
            <p className="text-sm font-semibold">{previewFull.rank}</p>
            <p className="text-sm mt-2 whitespace-pre-line">
              {previewFull.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessEditor;
