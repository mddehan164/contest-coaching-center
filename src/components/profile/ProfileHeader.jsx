import React, { useState } from 'react';

export default function ProfileHeader() {
  let [openSettings, setOpenSettings] = useState(false);
  return (
    <div className="flex flex-col items-center mt-2 relative">
      <div className="absolute right-12 mt-4">
        <button onClick={() => setOpenSettings(!openSettings)} className="border border-gray-400 p-2 rounded text-gray-300 hover:bg-gray-100 bg-gray-100 bg-opacity-10 hover:bg-opacity-20">
          {/* SVG icon */}
        </button>
        {openSettings && (
          <div className="bg-white absolute right-0 w-40 py-2 mt-1 border border-gray-200 shadow-2xl">
            {/* settings menu items */}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <p className="text-2xl">Amanda Ross</p>
        <span className="bg-blue-500 rounded-full p-1" title="Verified">
          {/* checkmark svg */}
        </span>
      </div>
      <p className="text-gray-700">Senior Software Engineer at Tailwind CSS</p>
      <p className="text-sm text-gray-500">New York, USA</p>
    </div>
  );
}
