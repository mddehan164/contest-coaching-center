import React, { useEffect, useState } from 'react';
import logo from '../assets/images/loading-logo.png'; // Adjust the path as necessary

function Loader({ message = '', duration = 3000 }) {
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
    }, 50);

    const bounceFade = setInterval(() => {
      setFade(prev => !prev);
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      clearInterval(bounceFade);
      setProgress(100);
    }, duration);

    return () => {
      clearInterval(interval);
      clearInterval(bounceFade);
      clearTimeout(timeout);
    };
  }, [duration]);

  return (
    <div className="min-h-screen w-full fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <img
        src={logo}
        alt="Loading..."
        className={`
          w-24 h-24 md:w-32 md:h-32
          transition-opacity duration-500
          ${fade ? 'opacity-100 animate-bounce' : 'opacity-20'}
        `}
      />
      <div className="w-3/4 md:w-1/2 bg-gray-900 rounded-full h-4 mt-6 overflow-hidden">
        <div
          className="bg-headerColor h-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 text-contestLight font-semibold text-center px-4">{message}</p>
    </div>
  );
}

export default Loader;
