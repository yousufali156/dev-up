import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const Footer: React.FC = () => {
  // State to store current date and time
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  // Date formatting options
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#1F2937] text-gray-400 text-sm p-3 border-t border-gray-700 z-50">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
        
        {/* Left side: copyright and developer */}
        <div className="text-center sm:text-left">
          © {new Date().getFullYear()} Dev Up by{" "}
          <a
            href="https://yousufali-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-indigo-400 hover:underline"
          >
            Yousuf Ali
          </a>
          <span className="ml-2 text-xs text-gray-500">| Version 1.0.0</span>
        </div>

        {/* Center: social media links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/yousufali156"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            title="GitHub"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/yousufali156"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            title="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="https://yousufali-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            title="Portfolio"
          >
            <FaGlobe size={18} />
          </a>
        </div>

        {/* Right side: date and time */}
        <div className="hidden sm:flex items-center gap-4 text-center sm:text-right">
          <span>{currentDateTime.toLocaleDateString("en-US", dateOptions)}</span>
          <span className="font-semibold text-white">
            {currentDateTime.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
