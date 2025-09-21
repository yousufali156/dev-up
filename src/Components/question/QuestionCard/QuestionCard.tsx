import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LockIcon } from '../../common/Icons/Icons';
import type { Question } from '../../../types';

// AnswerSection-এর জন্য Props টাইপ
// Defining a TypeScript interface for the AnswerSection's props.
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

// QuestionCard-এর জন্য Props টাইপ
// Defining a TypeScript interface for the QuestionCard's props.
interface QuestionCardProps {
    question: Question;
    language: 'en' | 'bn';
    isLoggedIn: boolean;
}

export default function QuestionCard({ question, language, isLoggedIn }: QuestionCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    
    // Determining the border color based on the question level.
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
            // alert() এর পরিবর্তে একটি কাস্টম মডেল ব্যবহার করা ভালো
            // It's better to use a custom modal instead of alert()
            console.warn('VIP Question: Please log in.');
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
