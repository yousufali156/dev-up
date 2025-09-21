// code: ExamView.tsx

// React লাইব্রেরী ইম্পোর্ট করা হচ্ছে।
import React from 'react';

// কম্পোনেন্টের props-এর জন্য একটি TypeScript টাইপ ডিফাইন করা হচ্ছে।
type ExamViewProps = {
  language: 'en' | 'bn'; // language prop-টি শুধুমাত্র 'en' অথবা 'bn' স্ট্রিং গ্রহণ করবে।
};

// ExamView নামের একটি ফাংশনাল কম্পোনেন্ট তৈরি করা হচ্ছে।
// React.FC ব্যবহার করে props-এর টাইপ নির্দিষ্ট করা হয়েছে।
const ExamView: React.FC<ExamViewProps> = ({ language }) => {
  return (
    // মূল কন্টেইনার, যা ফ্লেক্সবক্স ব্যবহার করে কন্টেন্টকে সেন্টারে রাখছে।
    <div className="text-center flex flex-col items-center justify-center h-full">

      {/* ভিউ-এর প্রধান শিরোনাম */}
      <h1 className="text-5xl font-extrabold text-white mb-4">
        {/* language state-এর উপর ভিত্তি করে শিরোনাম পরিবর্তন হবে */}
        {language === 'en' ? 'Online Exam' : 'অনলাইন পরীক্ষা'}
      </h1>

      {/* সাবটাইটেল বা বর্ণনামূলক টেক্সট */}
      <p className="text-xl text-gray-400 mb-8 max-w-2xl">
        {language === 'en'
          ? 'This feature is coming soon! Prepare to test your knowledge.'
          : 'এই ফিচারটি শীঘ্রই আসছে! আপনার জ্ঞান পরীক্ষা করার জন্য প্রস্তুত হন।'}
      </p>

      {/* আসন্ন ফিচারগুলো দেখানোর জন্য একটি কার্ড */}
      <div className="bg-[#1F2937] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">
          {language === 'en' ? 'Upcoming Features' : 'আসন্ন ফিচার'}
        </h2>

        {/* ফিচারগুলোর একটি তালিকা */}
        <ul className="text-gray-300 list-disc list-inside text-left">
          <li>
            {language === 'en'
              ? 'Timed Quizzes for all topics'
              : 'সমস্ত বিষয়ের জন্য সময়ভিত্তিক কুইজ'}
          </li>
          <li>
            {language === 'en'
              ? 'Performance analysis with charts'
              : 'চার্টসহ পারফরম্যান্স বিশ্লেষণ'}
          </li>
          <li>
            {language === 'en'
              ? 'Leaderboards to compete'
              : 'অন্যদের সাথে প্রতিযোগিতা করার জন্য লিডারবোর্ড'}
          </li>
        </ul>
      </div>
    </div>
  );
};

// কম্পোনেন্টটি এক্সপোর্ট করা হচ্ছে যাতে অন্য ফাইল থেকে এটি ব্যবহার করা যায়।
export default ExamView;