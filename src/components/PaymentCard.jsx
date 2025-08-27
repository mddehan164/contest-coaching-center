import React from "react";
import img from "../assets/images/successful-person/p-1.png";

const PaymentCard = ({ status = 1, type = "student" }) => {
  return (
    <div className="border flex justify-between gap-2 px-2 py-2 rounded-md hover:shadow-md hover:scale-105 transition-all duration-100 max-w-72 aspect-video text-[0.85rem]">
      <div className="w-[40%] h-full overflow-hidden flex">
        <img
          className="w-full h-full object-cover object-center"
          src={img}
          alt="img"
        />
      </div>
      <div className="w-[58%] p-2">
        <h1 className="text-[1.05rem] font-semibold leading-4 text-headerColor">
          name
        </h1>
        <p>Mobile</p>
        <p>Batch</p>
        {type === "student" ? <p>Roll</p> : <p>Subject</p>}
        <div className="flex justify-between items-center mt-1">
          <p
            className={`${
              status === 1
                ? "bg-green-300 text-gray-500"
                : "bg-red-300 text-gray-500"
            } px-1 py-0.5 rounded-sm text-xs`}
          >
            {status === 1 ? "Active" : "Inactive"}
          </p>
          <button className="px-2 py-1 bg-headerColor hover:bg-headerColorHover text-white rounded-md">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
