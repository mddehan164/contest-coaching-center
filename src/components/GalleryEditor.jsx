import React, { useState } from "react";
import { galleryData } from "../data/galleryData";

const GalleryEditor = () => {
  const [images, setImages] = useState(galleryData);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [editingImageId, setEditingImageId] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [newImage, setNewImage] = useState([]);
  const [tempEditedImage, setTempEditedImage] = useState(null);
  const [isActionTaken, setIsActionTaken] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [imageToDeleteId, setImageToDeleteId] = useState(null); // for single delete
  const [isSaveAllModalOpen, setIsSaveAllModalOpen] = useState(false);


  const filteredImages =
    selectedFilter === "All"
      ? images
      : images.filter((img) => img.category === selectedFilter);

      const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter((file) => {
          const isValidType = file.type.startsWith("image/");
          const isValidSize = file.size <= 4 * 1024 * 1024; // ✅ 4MB
          return isValidType && isValidSize;
        });

        if (validFiles.length === 0) {
          alert("Only images under 4MB (jpg, png, webp, etc.) are allowed.");
          return;
        }

        // ⛔️ Don't upload now — just store temporarily
        const uploaded = validFiles.map((file) => ({
          id: Date.now() + Math.random(),
          src: URL.createObjectURL(file),
          category: "", // ❌ category will be assigned when saved
        }));

        setNewImage(uploaded);
        setIsActionTaken(true); // ✅ enable Add button manually
      };

  const toggleSelectImage = (imageId, e) => {
    e.stopPropagation(); // ✅ prevent opening modal
    setSelectedImages((prevSelected) =>
      prevSelected.includes(imageId)
        ? prevSelected.filter((id) => id !== imageId)
        : [...prevSelected, imageId]
    );
    setIsActionTaken(true);
  };

  const deleteImage = (imageId) => {
    setImageToDeleteId(imageId);
    setActionType("deleteSingle");
    setIsConfirmationModalOpen(true);
  };

  const openModal = (imageSrc, e) => {
    if (e.target.type === "checkbox") return; // ✅ don't open modal from checkbox
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
    setModalImage(null);
  };

  const handleEditImage = (imageId, currentCategory) => {
    setEditingImageId(imageId);
    setNewCategory(currentCategory);
    setTempEditedImage(images.find((img) => img.id === imageId));
  };

  const handleFileChange = (e) => {
    const updatedImage = e.target.files[0];
    if (updatedImage) {
      setTempEditedImage({
        ...tempEditedImage,
        src: URL.createObjectURL(updatedImage),
        category: newCategory,
      });
    }
  };

  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);
    setIsActionTaken(true);
  };

  const saveEditedImage = () => {
    if (tempEditedImage && newCategory) {
      const updated = {
        ...tempEditedImage,
        category: newCategory,
      };

      setImages((prevImages) =>
        prevImages.map((image) =>
          image.id === editingImageId ? updated : image
        )
      );
    }
    resetEditModal();
  };

  const handleFinalUpload = () => {
    if (!newCategory || newImage.length === 0) return;

    const categorizedImages = newImage.map((img) => ({
      ...img,
      category: newCategory,
    }));

    setImages((prev) => [...categorizedImages, ...prev]);
    setNewImage([]);
    setNewCategory("");
    setIsActionTaken(false);
  };


  const saveChanges = () => {
    if (actionType === "delete") {
      setImages((prevImages) =>
        prevImages.filter((image) => !selectedImages.includes(image.id))
      );
      setSelectedImages([]);
    } else if (actionType === "deleteSingle" && imageToDeleteId !== null) {
      setImages((prevImages) =>
        prevImages.filter((image) => image.id !== imageToDeleteId)
      );
      setImageToDeleteId(null);
    } else if (actionType === "add") {
      handleFinalUpload();
    } else if (actionType === "edit") {
      saveEditedImage();
    }
    setIsConfirmationModalOpen(false);
    setIsActionTaken(false);
  };

  const cancelAction = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleConfirmAction = (type) => {
    setActionType(type);
    setIsConfirmationModalOpen(true);
  };

  const resetEditModal = () => {
    setEditingImageId(null);
    setTempEditedImage(null);
    setNewCategory("");
    setIsModalOpen(false);
  };

  return (
    <div className="w-full mx-auto p-4 xl:px-44">
      <h2 className="text-2xl font-bold text-center mb-6">Gallery Editor</h2>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {["All", "Success", "Campus", "Students", "Others"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-4 py-2 rounded-md ${
              selectedFilter === cat ? "bg-headerColorHover text-white" : "bg-headerColor"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          multiple
          className="block w-full text-sm text-gray-500
               file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-50 file:text-headerColorHover
               hover:file:bg-blue-100 cursor-pointer"
        />
        <select
          value={newCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 border border-gray-300 mt-2"
        >
          <option value="">Select Category</option>
          <option value="Success">Success</option>
          <option value="Campus">Campus</option>
          <option value="Students">Students</option>
          <option value="Others">Others</option>
        </select>
        <button
          onClick={() => handleConfirmAction("add")}
          className="bg-headerColor hover:bg-headerColorHover text-white py-2 px-4 mt-4 rounded-md cursor-pointer"
          disabled={!isActionTaken || !newCategory}
        >
          Add Image
        </button>
      </div>

      {/* Delete Selected */}
      {selectedImages.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => handleConfirmAction("delete")}
            className="bg-contestRed text-white py-2 px-4 rounded-md"
          >
            Delete Selected Images
          </button>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {filteredImages
          .sort((a, b) => b.id - a.id)
          .map((image) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md"
              onClick={(e) => openModal(image.src, e)}
            >
              <img
                src={image.src}
                alt="photo"
                className="w-full h-[200px] object-contain bg-black transition-all duration-300"
              />
              <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                <div className="flex space-x-4">
                  <button
                    className="text-white text-sm px-4 rounded-md py-2 bg-headerColorHover"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditImage(image.id, image.category);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-white text-sm px-4 rounded-md py-2 bg-contestRed"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteImage(image.id);
                    }}
                  >
                    Delete
                  </button>
                  <input
                    type="checkbox"
                    checked={selectedImages.includes(image.id)}
                    onClick={(e) => toggleSelectImage(image.id, e)}
                    className="absolute top-2 right-2"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center"
          onClick={(e) => closeModal(e)}
        >
          <div className="relative">
            <img
              src={modalImage}
              alt="Full-screen"
              className="max-w-screen max-h-screen object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 p-2 rounded-lg"
              onClick={(e) => closeModal(e)}
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold">Are you sure?</h3>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={saveChanges}
                className="bg-headerColor text-white py-2 px-4 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={cancelAction}
                className="bg-contestRed text-white py-2 px-4 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingImageId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold">Edit Image</h3>
            <div className="mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300"
              />
              <select
                value={newCategory}
                onChange={handleCategoryChange}
                className="w-full p-2 border border-gray-300 mt-4"
              >
                <option value="">Select Category</option>
                <option value="Success">Success</option>
                <option value="Campus">Campus</option>
                <option value="Students">Students</option>
                <option value="Others">Others</option>
              </select>
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={() => {
                    setActionType("edit");
                    saveChanges();
                  }}
                  className="bg-headerColor text-white py-2 px-4 rounded-md"
                >
                  Save
                </button>
                <button
                  onClick={resetEditModal}
                  className="bg-contestRed text-white py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        {isSaveAllModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-xl font-semibold mb-4">Save All Changes?</h3>
              <p className="text-gray-700 mb-6">Are you sure you want to save all current changes permanently?</p>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-headerColor text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    // 👉 Do your save logic here
                    console.log("✅ Final Save Confirmed!");
                    setIsSaveAllModalOpen(false);
                  }}
                >
                  Confirm
                </button>
                <button
                  className="bg-contestRed text-white px-4 py-2 rounded-md"
                  onClick={() => setIsSaveAllModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-full text-end mt-10"><button className="hover:bg-black bg-zinc-800 px-5 py-2 rounded-md text-white hover:text-headerColor" onClick={() => setIsSaveAllModalOpen(true)}>Save All Changes</button></div>
    </div>
  );
};

export default GalleryEditor;
