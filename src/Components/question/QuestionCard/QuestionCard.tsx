import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Dependency Components (Included to fix compilation error) ---

// এই আইকনটি পূর্বে Icons.jsx ফাইলে ছিল।
// This icon was previously in the Icons.jsx file.
const LockIcon = () => <svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5 text-amber-400 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>;

// এই কম্পোনেন্টটি পূর্বে AnswerSection.jsx ফাইলে ছিল।
// This component was previously in the AnswerSection.jsx file.
const AnswerSection = ({ title, content, isVip = false }) => (
    <div className="mt-4">
        <h4 className={`text-lg font-semibold ${isVip ? 'text-amber-400' : 'text-[#4F46E5]'}`}>{title}</h4>
        <p className="text-gray-300 mt-1 whitespace-pre-wrap font-light">{content}</p>
    </div>
);


// --- Main QuestionCard Component ---

// এই কম্পোনেন্টটি একটি প্রশ্ন কার্ড হিসেবে কাজ করে।
// This component acts as a single question card.
export default function QuestionCard({ question, language, isLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const levelColor = { 'Basic': 'border-emerald-500', 'Intermediate': 'border-sky-500', 'Advanced': 'border-amber-500', 'Master': 'border-red-500' }[question.level] || 'border-gray-500';
    const isVip = !!question.vip_qa;

    const handleToggle = () => {
        if (isVip && !isLoggedIn) {
            alert(language === 'en' ? 'This is a VIP question. Please log in to view.' : 'এটি একটি ভিআইপি প্রশ্ন। অনুগ্রহ করে দেখতে লগইন করুন।');
            return;
        }
        setIsOpen(!isOpen);
    };

    const currentQuestion = language === 'en' ? question.question_en : question.question_bn;
    const whatIs = language === 'en' ? question.details.what_is_en : question.details.what_is_bn;

    return (
        <motion.div layout className={`bg-[#1F2937] rounded-lg shadow-lg mb-4 border-l-4 ${levelColor}`}>
            <div className="p-6 cursor-pointer flex justify-between items-center" onClick={handleToggle}>
                <div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full text-white ${levelColor.replace('border', 'bg')}`}>{question.level}</span>
                    <h3 className="text-xl font-bold text-gray-100 mt-2">{isVip && <LockIcon />}{currentQuestion}</h3>
                </div>
                <motion.div animate={{ rotate: isOpen ? 90 : 0 }}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></motion.div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-6 pb-6 border-t border-gray-700">
                            <AnswerSection title={language === 'en' ? "What is it?" : "এটা কী?"} content={whatIs} />
                            {question.vip_qa && (
                                <AnswerSection 
                                    title={`⭐ ${language === 'en' ? "VIP Interview Question" : "ভিআইপি ইন্টারভিউ প্রশ্ন"}`} 
                                    content={`${question.vip_qa.question_en}\n\nAnswer: ${question.vip_qa.answer_en}`} 
                                    isVip={true} 
                                />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

