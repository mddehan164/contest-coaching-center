import React from "react";
import { headerData } from "../../data/Dsidebar&Header";
import { Link } from "react-router";
import { LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const DHeaderLinks = () => {
  const { user } = useAuth();

  return (
    <div className="w-1/2 text-end px-2 flex items-center justify-end gap-4 text-xl sm:text-2xl sm:gap-7">
      {/* User info */}
      {user && (
        <span className="text-sm text-white mr-4">
          Welcome, {user.name || user.email}
        </span>
      )}

      {/* Header icons */}
      {headerData.icons.map((icon, idx) => (
        <Link
          key={idx}
          to={icon.link}
          className="hover:text-headerColorHover inline-block relative"
        >
          {<icon.icon />}
          <div
            className={`absolute top-0 left-0 w-1/5 aspect-square rounded-full ${
              icon.new ? "bg-contestRed animate-ping" : "bg-transparent"
            }`}
          ></div>
        </Link>
      ))}

      {/* Logout link */}
      <Link
        to="/"
        className="hover:text-red-300 inline-block relative"
        title="home"
      >
        <LogOut className="w-6 h-6" />
      </Link>
    </div>
  );
};

export default DHeaderLinks;
