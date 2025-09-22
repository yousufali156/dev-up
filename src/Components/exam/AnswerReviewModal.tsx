import React from 'react';
import type { Question } from '../../data/examLoader';
import { motion, AnimatePresence } from 'framer-motion';

interface AnswerReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizSet: Question[];
  userAnswers: (string | null | 'skipped')[];
}

const AnswerReviewModal: React.FC<AnswerReviewModalProps> = ({ isOpen, onClose, quizSet, userAnswers }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl h-[80vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Review Answers</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
          </div>
          <div className="overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {quizSet.map((q, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === q.answer;
              const isSkipped = userAnswer === 'skipped';
              const isUnanswered = userAnswer === null;

              let borderColor = 'border-gray-700';
              if (isCorrect) borderColor = 'border-green-500';
              if (!isCorrect && !isSkipped && !isUnanswered) borderColor = 'border-red-500';
              if (isSkipped) borderColor = 'border-yellow-500';

              return (
                <div key={q.id} className={`bg-gray-900 p-4 rounded-lg border-l-4 ${borderColor}`}>
                  <p className="font-semibold text-white">{index + 1}. {q.question}</p>
                  <p className={`mt-2 text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    Your answer: {isSkipped ? 'Skipped' : (isUnanswered ? 'Not Answered' : userAnswer)}
                  </p>
                  {!isCorrect && !isSkipped && !isUnanswered && (
                    <p className="mt-1 text-sm text-green-400">Correct answer: {q.answer}</p>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnswerReviewModal;