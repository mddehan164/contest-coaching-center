import { useEffect, useState } from "react";
import InitialLoader from "./InitialLoader";
function Loader({ message = "", duration = 3000 }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
    }, 50);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      clearInterval(interval);
      setProgress(100);
    }, duration);

    return () => {
      clearInterval(interval);
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration]);

  return (
    <div className="min-h-screen w-full fixed inset-0 flex flex-col gap-10 items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <InitialLoader fullScreen={false} />
      <div className="w-3/4 md:w-1/2 bg-gray-900 rounded-full h-4 mt-6 overflow-hidden">
        <div
          className="bg-headerColor h-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 text-contestLight font-semibold text-center px-4">
        {message}
      </p>
    </div>
  );
}

export default Loader;
