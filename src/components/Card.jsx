import React from 'react';
import MainBtn from './mainBtn';
import { useNavigate } from 'react-router-dom';

const Card = ({ data}) => {
  const navigate = useNavigate();

  const handleClick = (btn) => {
    if (btn === 'Details') {
      navigate(`/courses/${data.id}`);
    }
  };
  const bulletStyles = {
  circle: 'list-disc',
  arrow: 'list-[">>"]',
  decimal: 'list-decimal',
  roman: 'list-[upper-roman]',
  alpha: 'list-[upper-alpha]'
};

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs max-sm:mx-auto  hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer xl:mt-6">
      {/* Title */}
      {data.titleStatus && data.btnData?.btnName?.[0] && (
        <div className="bg-headerColor text-white font-bold text-center py-2 xl:text-xl">
          {data.btnData.btnName[0]}
        </div>
      )}
      
      {/* Image */}
      {data.image && (
        <img
          src={data.image}
          alt="Card"
          className="w-full h-auto object-cover"
        />
      )}

      {/* Body List */}
      <div className="p-4 md:p-2 xl:p-4">
          <ul className={`${bulletStyles[data.bulletType || 'circle']} list-inside text-sm text-gray-700 space-y-1`}>
            {data.body.map((item, index) => (
              <li key={index} className={`${data.btnData.btnStyle.fontBold ? "sm:font-bold xl:font-extrabold" : ""}`}>
                {item}
              </li>
            ))}
          </ul>

        {data.offer ? (
            <p className="text-xs mt-4">
              <span className="line-through text-red-600 mr-1 sm:text-lg">৳ {data.price}</span> &nbsp;
              <span className="text-headerColorHover font-semibold sm:text-lg">৳  {data.offerPrice}</span>
            </p>
          ) : (
            <p className="text-xs mt-2 text-headerColorHover font-semibold sm:text-lg">৳&nbsp;{data.price}</p>
          )}
        </div>

      {/* Button (if needed below) */}
      <div className="p-4 w-full flex justify-between items-center">
        {data.btnData.btnStyle.btnStatus && data.btnData.btnName.map((name, idx) => (
          <MainBtn
            key={idx}
            data={name}
            btnStyle={data.btnData.btnStyle}
            onClick={() => handleClick(name)}
          />
        ))}
      </div>
    </div>
  );
};

export default Card;
