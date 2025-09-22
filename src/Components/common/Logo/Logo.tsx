import React from "react";
import devupLogo from "../../../assets/devuplogo.png"; 

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Logo Image */}
      <img
        src={devupLogo}
        alt="Dev Up Logo"
        className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-lg"
      />

      {/* Logo Text with gradient */}
      <span className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 text-transparent bg-clip-text">
        Dev Up
      </span>
    </div>
  );
};

export default Logo;
