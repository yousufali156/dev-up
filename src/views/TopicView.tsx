// src/views/TopicView.tsx

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Question } from '../types';
import QuestionCard from '../Components/question/QuestionCard/QuestionCard';

interface TopicViewProps {
    topic: string;
    questions: Question[]; // <-- পরিবর্তন এখানে: props হিসেবে questions গ্রহণ করা হচ্ছে
    language: 'en' | 'bn';
    isLoggedIn: boolean;
}

export default function TopicView({ topic, questions, language, isLoggedIn }: TopicViewProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    // ডেটা এখন props থেকে আসছে, তাই সরাসরি ব্যবহার করা হচ্ছে
    const allData = questions || []; 

    const groupedBySubTopic = useMemo(() => {
        if (!allData) return {};
        return allData.reduce((acc, question) => {
            const subTopic = question.sub_topic || 'General';
            if (!acc[subTopic]) acc[subTopic] = [];
            acc[subTopic].push(question);
            return acc;
        }, {} as Record<string, typeof allData>);
    }, [allData]);

    const levels = useMemo(() => allData ? [...new Set(allData.map(q => q.level))] : [], [allData]);

    const toggleFilter = (level: string) =>
        setActiveFilters(prev =>
            prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
        );

    // যদি কোনো কারণে প্রশ্ন লোড না হয় তবে একটি মেসেজ দেখানো হবে
    if (allData.length === 0) {
        return (
            <div className="text-center text-gray-400">
                <h1 className="text-4xl font-extrabold text-white mb-2 capitalize">{topic}</h1>
                <p>No questions found for this topic.</p>
                <p className="text-sm mt-2">Please check if the corresponding JSON file exists in the `public/data` folder.</p>
            </div>
        );
    }
    
    return (
        <div>
            <h1 className="text-4xl font-extrabold text-white mb-2 capitalize">{topic.replace('.js', '.js ')}</h1>
            <p className="text-gray-400 mb-6">{language === 'en' ? `All questions related to ${topic}.` : `${topic} সম্পর্কিত সকল প্রশ্ন।`}</p>
            
            <div className="sticky top-0 bg-[#111827] py-4 z-10 mb-4">
                <input
                    type="text"
                    placeholder={language === 'en' ? "Search questions..." : "প্রশ্ন খুঁজুন..."}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full bg-[#1F2937] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                />
                <div className="flex flex-wrap gap-2 mt-4">
                    {levels.map(level => (
                        <button
                            key={level}
                            onClick={() => toggleFilter(level)}
                            className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                activeFilters.includes(level)
                                    ? 'bg-[#4F46E5] text-white'
                                    : 'bg-[#374151] text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {Object.entries(groupedBySubTopic).map(([subTopic, questions]) => {
                    const filteredQuestions = questions
                        .filter(q => (language === 'en' ? q.question_en : q.question_bn).toLowerCase().includes(searchTerm.toLowerCase()))
                        .filter(q => activeFilters.length === 0 || activeFilters.includes(q.level));

                    if (filteredQuestions.length === 0) return null;

                    return (
                        <motion.div 
                            key={subTopic} 
                            className="mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-300 border-b-2 border-[#4F46E5] pb-2 mb-4">{subTopic}</h2>
                            {filteredQuestions.map(q => (
                                <QuestionCard key={q.id} question={q} language={language} isLoggedIn={isLoggedIn} />
                            ))}
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}