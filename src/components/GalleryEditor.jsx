import React, { useState } from "react";
import { galleryData } from "../data/galleryData"; // Import gallery data
import { motion } from "framer-motion"; // For drag-and-drop

const GalleryEditor = () => {
  const [images, setImages] = useState(galleryData); // Use gallery data as initial images
  const [selectedImages, setSelectedImages] = useState([]); // State to track selected images
  const [isModalOpen, setIsModalOpen] = useState(false); // Full-screen modal state
  const [modalImage, setModalImage] = useState(null); // Image to show in the modal

  // Handle multiple image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      src: URL.createObjectURL(file),
      name: file.name,
      category: "Others", // Default category for uploaded images
    }));

    setImages((prevImages) => [...newImages, ...prevImages]); // Newly uploaded images at the top
  };

  // Handle selecting images with checkbox
  const toggleSelectImage = (imageId) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(imageId)
        ? prevSelected.filter((id) => id !== imageId)
        : [...prevSelected, imageId]
    );
  };

  // Handle delete of selected images
  const deleteSelectedImages = () => {
    setImages((prevImages) =>
      prevImages.filter((image) => !selectedImages.includes(image.id))
    );
    setSelectedImages([]); // Clear selection after delete
  };

  // Handle individual image delete
  const deleteImage = (imageId) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image.id !== imageId)
    );
  };

  // Handle Preview Image in Modal
  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  // Handle image drag-and-drop
  const handleDragEnd = (e, index) => {
    const newImages = [...images];
    const [removedImage] = newImages.splice(index, 1);  // Remove the dragged image
    newImages.splice(e.target.getAttribute('data-index'), 0, removedImage); // Insert at the new position
    setImages(newImages);
  };

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Gallery Editor</h2>

      {/* Image Upload Section */}
      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="file-input"
        />
      </div>

      {/* Delete Selected Images */}
      {selectedImages.length > 0 && (
        <div className="mb-4">
          <button
            onClick={deleteSelectedImages}
            className="bg-red-500 text-white py-2 px-4 rounded-md"
          >
            Delete Selected Images
          </button>
        </div>
      )}

      {/* Recently Uploaded Gallery Display */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Recent Gallery</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images
            .sort((a, b) => b.id - a.id) // Sort by ID to show the newest first
            .map((image, index) => (
              <motion.div
                key={image.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md"
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                onDragEnd={(e) => handleDragEnd(e, index)}
              >
                <img
                  src={image.image}  // Correctly use the 'image' from galleryData
                  alt="photo"
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    selectedImages.includes(image.id) ? "opacity-70" : ""
                  }`}
                  onClick={() => openModal(image.image)} // Open full-screen modal
                />

                {/* Hover Actions */}
                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                  <div className="flex space-x-4">
                    <button
                      className="text-white text-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Edit the image
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="text-white text-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteImage(image.id); // Delete the specific image on hover delete
                      }}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>

                {/* Checkbox positioned at the top-left corner */}
                <div className="absolute top-2 left-2 z-10">
                  <input
                    type="checkbox"
                    checked={selectedImages.includes(image.id)}
                    onChange={() => toggleSelectImage(image.id)} // Toggle select
                    className="text-white"
                  />
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Image Preview Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div className="relative">
            <img
              src={modalImage}
              alt="Full-screen view"
              className="max-w-full max-h-full object-contain"
            />
            {/* Cancel Button */}
            <button
              className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 p-2 rounded-lg"
              onClick={closeModal}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryEditor;
