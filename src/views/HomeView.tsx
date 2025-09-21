// code: HomeView.tsx

// React লাইব্রেরী ইম্পোর্ট করা হচ্ছে।
import React from 'react';
// framer-motion থেকে motion কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে অ্যানিমেশনের জন্য।
import { motion } from 'framer-motion';

// কম্পোনেন্টের props-এর জন্য একটি TypeScript টাইপ ডিফাইন করা হচ্ছে।
// এটি কোডকে আরও নিরাপদ এবং পাঠযোগ্য করে তোলে।
type HomeViewProps = {
  language: 'en' | 'bn'; // language prop-টি শুধুমাত্র 'en' অথবা 'bn' স্ট্রিং গ্রহণ করবে।
};

// HomeView নামের একটি ফাংশনাল কম্পোনেন্ট তৈরি করা হচ্ছে।
// React.FC (Function Component) ব্যবহার করে props-এর টাইপ নির্দিষ্ট করা হয়েছে।
const HomeView: React.FC<HomeViewProps> = ({ language }) => {
  return (
    // মূল কন্টেইনার, যা ফ্লেক্সবক্স ব্যবহার করে কন্টেন্টকে সেন্টারে রাখছে।
    <div className="text-center flex flex-col items-center justify-center h-full">
      
      {/* framer-motion দিয়ে ওয়েলকাম মেসেজের জন্য অ্যানিমেশন যোগ করা হয়েছে */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }} // প্রাথমিক অবস্থা
        animate={{ y: 0, opacity: 1 }}   // অ্যানিমেশনের শেষ অবস্থা
        className="text-5xl font-extrabold text-white mb-4"
      >
        Welcome to SkillSphere
      </motion.h1>

      {/* সাবটাইটেলের জন্য অ্যানিমেশন যোগ করা হয়েছে */}
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }} // ০.২ সেকেন্ড পরে অ্যানিমেশন শুরু হবে
        className="text-xl text-gray-400 mb-8 max-w-2xl"
      >
        {/* language state-এর উপর ভিত্তি করে টেক্সট পরিবর্তন হবে */}
        {language === 'en'
          ? 'Your personal platform to learn, practice, and master web development skills.'
          : 'আপনার ওয়েব ডেভেলপমেন্ট স্কিল শেখার, অনুশীলন করার এবং মাস্টার করার ব্যক্তিগত প্ল্যাটফর্ম।'}
      </motion.p>

      {/* 'Get Started' কার্ডের জন্য অ্যানিমেশন যোগ করা হয়েছে */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }} // ০.৪ সেকেন্ড পরে অ্যানিমেশন শুরু হবে
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

// কম্পোনেন্টটি এক্সপোর্ট করা হচ্ছে যাতে অন্য ফাইল থেকে এটি ইম্পোর্ট করে ব্যবহার করা যায়।
export default HomeView;