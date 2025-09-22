import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const User = ({ logout }) => {
  const [click, setClick] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const wrapperRef = useRef(null);

  const feature = [
    ...(user?.role === "admin"
      ? [{ feature: "Dashboard", action: "", link: "dashboard" }]
      : []),
    ...(user?.role === "superadmin"
      ? [{ feature: "Dashboard", action: "", link: "dashboard" }]
      : []),
    { feature: "Logout", action: logout, link: "" },
  ];
  // ক্লিক এলসে বাইরে হলে dropdown বন্ধ হবে
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setClick(false);
      }
    };

    // mousedown বা click — তুমি পছন্দমতো নিতে পারো
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  if (!user) {
    return null;
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div
        className="sm:rounded-full font-semibold sm:w-10 sm:aspect-square cursor-pointer relative hover:text-white hover:bg-headerColorHover bg-headerColor px-5 sm:flex sm:items-center sm:justify-center max-sm:h-10"
        onClick={() => setClick((prev) => !prev)}
      >
        <div>{user.name.slice(0, 2) + "."}</div>
      </div>

      {click && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black opacity-25"
            onClick={() => setClick(false)}
          />
          {/* dropdown */}
          <div className="absolute h-auto py-3 min-w-32 bg-white text-headerColorHover top-10 right-0 rounded-md text-start px-2 text-lg shadow-lg z-50 transform transition-all duration-300 ease-in-out">
            {feature.map((item, index) => (
              <Link
                key={index}
                to={item.link || "#"}
                onClick={() => {
                  if (item.action) item.action();
                  setClick(false);
                }}
                className="block w-full py-1 md:text-lg hover:rounded-md hover:bg-headerColor hover:text-white px-2 border-b-2 border-headerColor bg-white"
              >
                {item.feature}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default User;
