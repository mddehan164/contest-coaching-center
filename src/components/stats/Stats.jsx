import React from 'react';

const Stats = ({ stat }) => {
  return (
    <div className="h-auto p-4 bg-white hover:shadow-xl shadow-md cursor-pointer border-t-4 border-headerColor rounded-md">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className={`rounded-full w-40 h-40 md:w-48 md:h-48 lg:w-36 lg:h-36 ${!stat.img && stat.backgroundGradient} ${!stat.img ? ' flex items-center justify-center flex-col text-white font-semibold gap-2' : ''}`}>
          {
            !stat.img ? <stat.icon className="text-4xl md:text-5xl lg:text-6xl" /> :
            <img src={stat.img} alt={stat.title} className="w-full h-full object-cover rounded-full border-2 border-headerColor" />
          }
          <h1 className={`${!stat.img ? 'text-2xl md:text-3xl lg:text-2xl text-center' : 'text-lg text-center mt-5 font-extrabold leading-5 text-headerColor'}`}>{stat.title}</h1>
        </div>
        {
          !stat.img && (<h2 className="text-2xl md:text-3xl lg:text-4xl text-center">{stat.count}</h2>)
        }
        <p className={`${!stat.img ? 'text-sm md:text-sm lg:text-sm text-justify px-2 h-20 overflow-auto' : 'text-sm mt-12 font-semibold text-headerColorHover'}`}>{
        !stat.img ? stat.description : stat.subtitle}</p>
        {
          stat.img && (<h2 className="text-lg font-bold -mt-3 md:text-2xl lg:text-2xl text-center text-contestRed">{stat.rank}</h2>)
        }
        {
          stat.img && (<p className="text-sm md:text-sm lg:text-md text-justify px-2 h-32 overflow-auto">{stat.description}</p>)
        }
      </div>
    </div>
  );
};

export default Stats;
