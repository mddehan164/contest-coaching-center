// components/DataCard.jsx
import React, { useState } from "react";
import { CloseSvg } from "../utils/svgs";

export default function ViewModal({ title, data }) {
  const [view, setView] = useState(true);
  if (!data || typeof data !== "object") {
    return null; // অথবা লোডিং বা ফallback UI দেখাতে পারেন
  }
  const handleBackdropClick = () => {
    // if (e.target === e.currentTarget) {
    //   setView(false);
    // }
    setView(!view);
  };
  return (
    <div className={`${view ? "" : "hidden"} fixed top-24 left-72 w-[50vw]`}>
      <div
        className="relative w-full bg-white shadow-md rounded-2xl p-4 mb-4"
        // onClick={handleBackdropClick}
      >
        <div className="absolute right-5 top-5" onClick={handleBackdropClick}>
          <CloseSvg />
        </div>
        <h2 className="text-lg font-semibold mb-2 mt-5">{title}</h2>
        <div className="space-y-2">
          {Object.entries(data).map(([key, value], i) => (
            <div
              key={i}
              className="flex justify-between border-b last:border-b-0 py-1"
            >
              <span className="capitalize text-gray-600">{key}</span>
              <span className="font-medium text-gray-900">{String(value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
