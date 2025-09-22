import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // ❗️ পরিবর্তন: 'fixed bottom-0 left-0 right-0' ক্লাসগুলো সরিয়ে দেওয়া হয়েছে।
  // ফুটারটি এখন স্বাভাবিকভাবেই কন্টেন্টের শেষে বসবে।
  return (
    <footer className="bg-[#1F2937] text-gray-400 text-sm p-3 border-t border-gray-700 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          © {new Date().getFullYear()} Dev Up by{' '}
          <a
            href="https://yousufali-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-indigo-400 hover:underline"
          >
            Yousuf Ali
          </a>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>{currentDateTime.toLocaleDateString('en-US', dateOptions)}</span>
          <span className="font-semibold text-white">{currentDateTime.toLocaleTimeString()}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;