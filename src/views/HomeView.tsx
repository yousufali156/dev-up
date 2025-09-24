// code: HomeView.tsx

// Importing the React library.
import React from 'react';
// Importing the motion component from framer-motion for animations.
import { motion } from 'framer-motion';

// Defining a TypeScript type for the component's props.
// This makes the code safer and more readable.
type HomeViewProps = {
  language: 'en' | 'bn'; // The language prop will only accept the strings 'en' or 'bn'.
};

// Creating a functional component named HomeView.
// Using React.FC (Function Component) to specify the type of props.
const HomeView: React.FC<HomeViewProps> = ({ language }) => {
  return (
    // The main container, which uses flexbox to center the content.
    <div className="text-center flex flex-col items-center justify-center h-full">

      {/* Adding animation for the welcome message using framer-motion */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }} // Initial state
        animate={{ y: 0, opacity: 1 }}   // Final state of the animation
        className="text-5xl font-extrabold text-white mb-4"
      >
        Welcome to Dev Up
      </motion.h1>

      {/* Adding animation for the subtitle */}
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }} // The animation will start after a 0.2-second delay.
        className="text-xl text-gray-400 mb-8 max-w-2xl"
      >
        {/* The text will change based on the language state */}
        {language === 'en'
          ? 'Your personal platform to learn, practice, and master web development skills.'
          : 'আপনার ওয়েব ডেভেলপমেন্ট স্কিল শেখার, অনুশীলন করার এবং মাস্টার করার ব্যক্তিগত প্ল্যাটফর্ম।'}
      </motion.p>

      {/* Adding animation for the 'Get Started' card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }} // The animation will start after a 0.4-second delay.
        className="bg-[#1F2937] p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-4">
          {language === 'en' ? 'Get Started' : 'শুরু করুন'}
        </h2>
        <p className="text-gray-300">
          {language === 'en' ? 'Select a topic from the sidebar!' : 'সাইডবার থেকে একটি বিষয় নির্বাচন করুন!'}
        </p>
      </motion.div>
    </div>
  );
};

// Exporting the component so it can be imported and used in other files.
export default HomeView;