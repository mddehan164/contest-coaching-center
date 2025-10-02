import { useState, useEffect } from "react";
// import { galleryData } from "../../data/galleryData";

const categories = ["All", "Success", "Campus", "Student", "Others"];

const Gallery = ({ galleryData, loading }) => {
  const [selectedCategory, setSelectedCategory] = useState("All".toLowerCase());
  const [displayData, setDisplayData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  // Load gallery data based on selected category
  useEffect(() => {
    if (selectedCategory === "All".toLowerCase()) {
      setDisplayData(galleryData?.filter((data) => data.status === 1));
    } else {
      setDisplayData(
        galleryData?.filter(
          (item) =>
            item.category === selectedCategory.toLowerCase() &&
            item.status === 1
        )
      );
    }
  }, [selectedCategory, galleryData]);

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
      <div className="flex sm:justify-center gap-3 flex-wrap mb-5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat.toLowerCase())}
            className={`px-6 py-3 border rounded-lg font-medium text-sm transition-all ${
              selectedCategory === cat.toLowerCase()
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-400 h-48 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : displayData.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-red-500 text-lg mb-2">
            কোনো ছবি পাওয়া যায়নি
          </div>
          <p className="text-gray-400">এই বিভাগে কোনো ছবি আপলোড করা হয়নি।</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {displayData.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg shadow-md relative group cursor-pointer"
              onClick={() => openModal(item.src)}
            >
              <img
                src={item.src}
                alt={`Gallery ${item.id}`}
                className="w-full aspect-video object-contain bg-zinc-900 transition-all duration-300 transform group-hover:scale-105 group-hover:opacity-80"
                loading="lazy"
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
              className="max-w-screen max-h-screen object-contain"
              loading="lazy"
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
