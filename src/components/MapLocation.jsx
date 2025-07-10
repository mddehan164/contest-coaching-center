// src/components/MapLocation.jsx
import React from "react";

const MapLocation = () => {
  return (
    <section className="w-full bg-white py-10 px-4">
      <div className="w-full mx-auto text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Our Current or Main Location
        </h2>
        <p className="text-gray-600">
          Binodpur Bazar, Rajshahi – মসজিদের পেছনের বিল্ডিং এ আমাদের শাখা।
        </p>

        <div className="rounded-lg overflow-hidden shadow-lg border">
          <iframe
            className="w-full h-[300px] sm:h-[400px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.5121416094706!2d88.62454007528393!3d24.372688778238144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefbb9f18c4d3%3A0xe0d6931e5479d20a!2sBinodpur%20Bazar%20Jame%20Mosjid!5e0!3m2!1sen!2sbd!4v1720603090517!5m2!1sen!2sbd"
            allowFullScreen=""
            loading="lazy"
            title="Contest Coaching Center Location"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <a
          href="https://www.google.com/maps?q=Binodpur+Bazar+Jame+Mosjid,+Rajshahi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition"
        >
          Google Maps-এ দেখুন
        </a>
      </div>
    </section>
  );
};

export default MapLocation;
