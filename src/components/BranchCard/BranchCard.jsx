import { useState } from "react";
import { branchData } from "../../data/branchData";
import "./BranchCard.css";

const BranchCard = () => {
  const [fullscreenImg, setFullscreenImg] = useState(null);
  const [slideIndex, setSlideIndex] = useState({}); // প্রতিটি branch এর আলাদা slide index

  const openFullscreen = (img) => {
    setFullscreenImg(img);
  };

  const closeFullscreen = () => {
    setFullscreenImg(null);
  };

  // নির্দিষ্ট branch এর index বাড়ানো/কমানোর ফাংশন
  const changeSlide = (branchId, imagesLength, direction) => {
    setSlideIndex((prev) => {
      const currentIndex = prev[branchId] || 0;
      let newIndex =
        direction === "prev"
          ? (currentIndex - 1 + imagesLength) % imagesLength
          : (currentIndex + 1) % imagesLength;

      return { ...prev, [branchId]: newIndex };
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10 p-4 max-w-7xl max-sm:px-20">
      {branchData.map((branch) => {
        const currentSlide = slideIndex[branch.id] || 0;
        return (
          <div
            key={branch.id}
            className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition-all bg-white flex flex-col md:flex-row"
          >
            {/* Slider Section */}
            <div className="md:w-1/2 w-full relative flex items-center justify-center bg-gray-200">
              <button
                className="absolute left-2 text-3xl text-gray-600 hover:text-black font-bold z-10"
                onClick={() =>
                  changeSlide(branch.id, branch.images.length, "prev")
                }
              >
                &#8592;
              </button>
              <img
                src={branch.images[currentSlide]}
                alt={`Slide ${currentSlide}`}
                className="w-64 h-64 object-contain rounded cursor-pointer"
                onClick={() => openFullscreen(branch.images[currentSlide])}
                loading="lazy"
              />
              <button
                className="absolute right-2 text-3xl text-gray-600 hover:text-black font-bold z-10"
                onClick={() =>
                  changeSlide(branch.id, branch.images.length, "next")
                }
              >
                &#8594;
              </button>
            </div>

            {/* Info Section */}
            <div className="md:w-1/2 w-full p-4 flex flex-col justify-center space-y-2">
              <h2 className="text-2xl font-bold lg:text-2xl text-headerColorHover">
                {branch.district}
              </h2>
              <p className="text-gray-500 font-medium lg:text-xl">
                {branch.address}
              </p>
              <p className="text-gray-400 text-sm xl:text-lg">
                {branch.description}
              </p>
            </div>
          </div>
        );
      })}

      {/* Fullscreen View */}
      {fullscreenImg && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center px-4">
          <button
            onClick={closeFullscreen}
            className="absolute top-6 right-6 text-white text-4xl font-bold z-50"
          >
            &times;
          </button>
          <img
            src={fullscreenImg}
            alt="Full View"
            className="max-w-screen max-h-screen object-contain rounded shadow-lg"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};

export default BranchCard;
