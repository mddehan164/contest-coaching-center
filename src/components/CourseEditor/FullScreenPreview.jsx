import React from "react";
import { FaTimes } from "react-icons/fa";

const FullScreenPreview = ({ previewFull, bulletStyles, onClose }) => {
  if (!previewFull) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 w-[90%] md:w-[70%] lg:w-[50%] relative h-[calc(100vh-50px)] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 text-xl"
        >
          <FaTimes />
        </button>
        {previewFull.image && (
          <img
            src={previewFull.image}
            alt={previewFull.unit || "Preview image"}
            className="w-full aspect-[3/2] object-cover rounded mb-2"
          />
        )}
        {previewFull.unit && (
          <h2 className="text-lg font-bold mb-2">{previewFull.unit}</h2>
        )}
        {previewFull.body && previewFull.body.length > 0 && (
          <ul
            className={`${
              bulletStyles[previewFull.bulletType || "circle"]
            } list-inside space-y-1 ml-4`}
          >
            {previewFull.body.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
        {previewFull.price &&
          (previewFull.offer ? (
            <p className="text-sm mt-2">
              <span className="line-through text-red-600 mr-2">
                ৳{previewFull.price}
              </span>
              {previewFull.offerPrice && (
                <span className="text-headerColorHover font-semibold">
                  ৳{previewFull.offerPrice}
                </span>
              )}
            </p>
          ) : (
            <p className="text-sm mt-2 text-headerColorHover font-semibold">
              ৳{previewFull.price}
            </p>
          ))}
        <div className="flex gap-2 mt-4">
          <button className="text-white bg-headerColor px-4 py-1 rounded">
            Enroll Now
          </button>
          <button className="text-white bg-headerColorHover px-4 py-1 rounded">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullScreenPreview;
