// src/pages/Error.jsx
import { useNavigate } from "react-router-dom";
import "../App.css";
import img from "../assets/images/error.png";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className=" flex items-center justify-center bg-white px-4">
      <div className="text-center shadow-xl rounded-xl p-10 max-w-[100%] sm:max-w-[80%] md:max-w-[60%] aspect-video w-full relative overflow-hidden bg-contestLight">
        {/* Top bar */}
        <div className="h-4 w-full bg-headerColorHover rounded-t-lg absolute top-0 left-0" />

        {/* Sad paper face */}
        <div className="w-20 sm:w-28 md:w-36 lg:44 2xl:w-44 h-auto  rounded-bl-3xl absolute bottom-0 left-0 flex flex-col items-center justify-center -mb-6 -ml-6 transform rotate-12">
          <img src={img} alt="error" loading="lazy" />
        </div>

        {/* 404 Text */}
        <div className=" flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-3xl lg:text-6xl font-extrabold text-gray-800 mt-6">
            404
          </h1>
          <p className="text-xl text-gray-500 mt-2 font-medium">
            Page Not Found
          </p>
          <button
            className="mt-6 px-6 py-2 bg-headerColorHover hover:bg-headerColor text-white rounded-lg transition duration-300"
            onClick={() => navigate("/")}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
