import logoMain from "../assets/images/loader/logo-main.png"; // তোমার আসল path
import logoBorder from "../assets/images/loader/logo-border.png";

export default function InitialLoader({ fullScreen = true }) {
  return (
    <div
      className={`${
        fullScreen ? "w-full h-screen bg-white" : "w-1/2 h-auto"
      } flex items-center justify-center`}
    >
      <div className="relative flex items-center justify-center w-1/4">
        {/* Border Image (Spinning) */}
        <img
          src={logoBorder}
          alt="border"
          className="absolute"
          loading="lazy"
        />

        {/* Main Image (Fade In-Out) */}
        <img
          src={logoMain}
          alt="main"
          className="w-[70%] animate-fade-in-out"
          loading="lazy"
        />
      </div>
    </div>
  );
}
