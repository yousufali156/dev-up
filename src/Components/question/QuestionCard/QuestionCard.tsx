import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LockIcon } from '../../common/Icons/Icons';
import type { Question } from '../../../types';

interface AnswerSectionProps {
    title: string;
    content: string;
    isVip?: boolean;
}

const AnswerSection = ({ title, content, isVip = false }: AnswerSectionProps) => (
    <div className="mt-4">
        <h4 className={`text-lg font-semibold ${isVip ? 'text-amber-400' : 'text-[#4F46E5]'}`}>{title}</h4>
        <p className="text-gray-300 mt-1 whitespace-pre-wrap font-light">{content}</p>
    </div>
);

interface QuestionCardProps {
    question: Question;
    language: 'en' | 'bn';
    isLoggedIn: boolean;
}

export default function QuestionCard({ question, language, isLoggedIn }: QuestionCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    const levelColorMap: Record<string, string> = {
        'Basic': 'border-emerald-500',
        'Intermediate': 'border-sky-500',
        'Advanced': 'border-amber-500',
        'Master': 'border-red-500',
        'Beginner': 'border-emerald-500',
        'VIP': 'border-red-500'
    };
    const levelColor = levelColorMap[question.level] || 'border-gray-500';

    const isVip = !!question.vip_qa;

    const handleToggle = () => {
        if (isVip && !isLoggedIn) {
            setShowLoginPrompt(true); // Modal খুলবে
            return;
        }
        setIsOpen(!isOpen);
    };

    const currentQuestion = language === 'en' ? question.question_en : question.question_bn;
    const whatIs = language === 'en' ? question.details.what_is_en : question.details.what_is_bn;

    return (
        <>
            <motion.div layout className={`bg-[#1F2937] rounded-lg shadow-lg mb-4 border-l-4 ${levelColor}`}>
                <div className="p-6 cursor-pointer flex justify-between items-center" onClick={handleToggle}>
                    <div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full text-white ${levelColor.replace('border', 'bg')}`}>
                            {question.level}
                        </span>
                        <h3 className="text-xl font-bold text-gray-100 mt-2 flex items-center">
                            {isVip && <LockIcon/>}
                            {currentQuestion}
                        </h3>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
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

            {/* Modal */}
            <AnimatePresence>
                {showLoginPrompt && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <motion.div
                            className="bg-[#1F2937]/90 p-6 rounded-2xl shadow-2xl max-w-md w-full text-center border border-gray-700 backdrop-blur-sm"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        >
                            <h2 className="text-2xl font-bold text-amber-400 mb-3">
                                {language === 'en' ? 'VIP Question Locked 🔒' : 'ভিআইপি প্রশ্ন লকড 🔒'}
                            </h2>
                            <p className="text-gray-300 mb-6 text-sm sm:text-base">
                                {language === 'en'
                                    ? 'Please log in to unlock and view this VIP answer.'
                                    : 'ভিআইপি উত্তর দেখতে লগইন করুন।'}
                            </p>
                            <button
                                onClick={() => setShowLoginPrompt(false)}
                                className="mt-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg transition-all duration-200"
                            >
                                {language === 'en' ? 'Close' : 'বন্ধ করুন'}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


        </>
    );
}
