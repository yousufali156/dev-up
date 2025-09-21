// code: AnswerSection.tsx

// React লাইব্রেরী ইম্পোর্ট করা হচ্ছে।
import React from 'react';

// কম্পোনেন্টের props-এর জন্য TypeScript টাইপ ডিফাইন করা হচ্ছে।
type AnswerSectionProps = {
  title: string;
  content: string;
  isVip?: boolean; // isVip একটি ঐচ্ছিক (optional) prop।
};

// AnswerSection নামের একটি ফাংশনাল কম্পোনেন্ট তৈরি করা হচ্ছে।
const AnswerSection: React.FC<AnswerSectionProps> = ({ title, content, isVip = false }) => {
  return (
    // মূল কন্টেইনার
    <div className="mt-4">
      {/* শিরোনাম, যা isVip prop-এর উপর ভিত্তি করে ভিন্ন রঙের হবে */}
      <h4 className={`text-lg font-semibold ${isVip ? 'text-amber-400' : 'text-[#4F46E5]'}`}>
        {title}
      </h4>
      {/* কনটেন্ট, যেখানে whitespace-pre-wrap ব্যবহার করায় টেক্সটের ফরম্যাটিং (যেমন নতুন লাইন) ঠিক থাকবে */}
      <p className="text-gray-300 mt-1 whitespace-pre-wrap font-light">
        {content}
      </p>
    </div>
  );
};

// কম্পোনেন্টটি এক্সপোর্ট করা হচ্ছে।
export default AnswerSection;