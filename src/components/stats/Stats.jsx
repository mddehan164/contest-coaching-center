import React from 'react';

const Stats = ({ stat }) => {
  return (
    <div className="h-auto p-4 bg-white hover:shadow-xl shadow-md cursor-pointer border-t-4 border-black rounded-md">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className={`rounded-full ${stat.backgroundGradient} w-40 h-40 md:w-48 md:h-48 lg:w-36 lg:h-36 flex items-center justify-center flex-col text-white font-semibold gap-2`}>
          <stat.icon className="text-4xl md:text-5xl lg:text-6xl" />
          <h1 className="text-2xl md:text-3xl lg:text-2xl text-center">{stat.title}</h1>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-center">{stat.count}</h2>
        <p className="text-sm md:text-sm lg:text-lg text-justify px-2">{stat.description}</p>
      </div>
    </div>
  );
};

export default Stats;
