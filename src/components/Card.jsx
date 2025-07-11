import React from 'react';
import MainBtn from './mainBtn';

const Card = ({ data }) => {
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
        <ul className="text-sm text-gray-700 space-y-1">
          {data.body.map((item, index) => (
            <li key={index} className="flex items-center xl:text-lg">
              <span className="mr-2 text-black font-bold">&raquo;</span>
              <span className={`${data.btnData.btnStyle.fontBold ? "sm:font-bold xl:font-extrabold" : ""}`}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button (if needed below) */}
      <div className="p-4 w-full flex justify-between items-center">
        {data.btnData.btnStyle.btnStatus && data.btnData.btnName.map((name, idx) => (
          <MainBtn
            key={idx}
            data={name}
            btnStyle={data.btnData.btnStyle}
          />
        ))}
      </div>
    </div>
  );
};

export default Card;
