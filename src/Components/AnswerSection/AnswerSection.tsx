import React from 'react';

// এই কম্পোনেন্টটি প্রতিটি প্রশ্নের উত্তরের একটি অংশ দেখায়।
// This component displays a section of an answer for each question.
export default function AnswerSection({ title, content, isVip = false }) {
    return (
        <div className="mt-4">
            <h4 className={`text-lg font-semibold ${isVip ? 'text-amber-400' : 'text-[#4F46E5]'}`}>{title}</h4>
            <p className="text-gray-300 mt-1 whitespace-pre-wrap font-light">{content}</p>
        </div>
    );
}
