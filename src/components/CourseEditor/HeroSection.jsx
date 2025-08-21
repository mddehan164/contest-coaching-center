import React from "react";

const HeroSection = ({ hero, onEdit }) => (
  <section className="bg-white rounded shadow p-4">
    <h2 className="text-2xl font-bold mb-4 text-headerColorHover">
      Hero Section
    </h2>
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1 space-y-1">
        <h3 className={`text-xl font-bold ${hero.color}`}>{hero.data.title}</h3>
        <p className="text-gray-700 font-medium">{hero.data.subtitle}</p>
        <p className="text-gray-500 text-sm">{hero.data.des}</p>
      </div>
      <img
        src={hero.img}
        alt="Course Hero"
        className="w-full lg:w-1/3 rounded"
      />
    </div>
    <button
      className="mt-4 px-6 py-2 bg-headerColor text-white rounded hover:bg-headerColorHover"
      onClick={onEdit}
    >
      Edit Hero
    </button>
  </section>
);

export default HeroSection;
