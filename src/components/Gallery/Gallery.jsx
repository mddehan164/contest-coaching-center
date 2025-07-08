import React, { useState, useEffect } from "react";
import { galleryData } from "../../data/galleryData";

const categories = ["All", "Success", "Campus", "Students", "Others"];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [displayData, setDisplayData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  // Load gallery data based on selected category
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      if (selectedCategory === "All") {
        setDisplayData(galleryData);
      } else {
        setDisplayData(galleryData.filter(item => item.category === selectedCategory));
      }
      setLoading(false);
    }, 500); // fake loading effect

    return () => clearTimeout(timeout);
  }, [selectedCategory]);

  // Handle full screen modal opening
  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">ফটো গ্যালারি</h2>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-3 border rounded-lg font-medium text-sm transition-all ${
              selectedCategory === cat
                ? "bg-headerColorHover text-white"
                : "bg-headerColor text-black hover:bg-headerColorHover"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-300 h-48 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayData.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg shadow-md relative group cursor-pointer"
              onClick={() => openModal(item.image)}
            >
              <img
                src={item.image}
                alt={`Gallery ${item.id}`}
                className="w-full h-full object-cover transition-all duration-300 transform group-hover:scale-105 group-hover:opacity-80"
              />
              {/* Fullscreen icon */}
              <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="text-white text-xl">
                  <i className="fas fa-expand"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full-screen Modal */}
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

export default Gallery;
