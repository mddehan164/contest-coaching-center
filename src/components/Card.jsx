import React from "react";
import MainBtn from "./mainBtn";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/formatters";

const Card = ({ data, btn = { btnName: [], btnStyle: {} } }) => {
  const navigate = useNavigate();

  const handleButtonClick = (buttonName) => {
    if (buttonName === "Details" && data?.id) {
      navigate(`/courses/${data.id}`);
    }
  };

  const renderPrice = () => {
    if (!data?.price) return null;

    return (
      <div className="space-y-1">
        <p className="text-lg font-semibold text-gray-900">
          {data.offer_price ? (
            <>
              <span className="text-red-500">
                ৳{formatCurrency(data.offer_price)}
              </span>
              <span className="ml-2 text-sm line-through text-gray-500">
                ৳{formatCurrency(data.price)}
              </span>
            </>
          ) : (
            <span>৳{formatCurrency(data.price)}</span>
          )}
        </p>
      </div>
    );
  };

  if (!data) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {data.image && (
        <img
          src={data.image}
          alt={data.title || "Course image"}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">
          {data.title || "Untitled Course"}
        </h3>
        {data.short_des && (
          <p className="text-gray-600 mb-4">{data.short_des}</p>
        )}

        {/* Price Section */}
        {renderPrice()}

        {/* Group Badge */}
        {data.group && (
          <div className="mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
              {data.group}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        {btn.btnName && btn.btnName.length > 0 && (
          <div className="flex space-x-2">
            {btn.btnName.map((buttonName, index) => (
              <MainBtn
                key={index}
                btnStyle={btn.btnStyle || {}}
                onClick={() => handleButtonClick(buttonName)}
              >
                {buttonName}
              </MainBtn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
