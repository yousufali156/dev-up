import React from 'react';
import AnimatedPieChart from '../common/AnimatedPieChart/AnimatedPieChart';
import { formatTime } from '../../utlits/quizHelpers';


// **Fix:** Removed the unused 'answers' prop from the interface.
interface ResultsViewProps {
  scoreCorrect: number;
  totalQuestions: number;
  timeTaken: number;
  onRestart: () => void;
  onReview: () => void;
  language: 'en' | 'bn';
  chartData: { title: string; value: number; color: string }[];
}

const ResultsView: React.FC<ResultsViewProps> = ({
  scoreCorrect,
  totalQuestions,
  timeTaken,
  onRestart,
  onReview,
  language,
  chartData,
  // **Fix:** Removed 'answers' from here.
}) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-3">
        {language === 'en' ? 'Exam Finished!' : 'পরীক্ষা শেষ!'}
      </h1>
      <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          {language === 'en' ? 'Your Performance Summary' : 'আপনার পারফরম্যান্স সারাংশ'}
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
          <AnimatedPieChart data={chartData} />
          <div className="w-full md:w-auto text-center md:text-left">
            <p className="text-5xl font-extrabold text-indigo-400">
              {Math.round((scoreCorrect / (totalQuestions || 1)) * 100)}%
            </p>
            <p className="text-lg text-gray-300 mt-1">
              {scoreCorrect} out of {totalQuestions} correct
            </p>
            <p className="text-sm text-gray-400 mt-4">
              {language === 'en' ? 'Time Taken:' : 'ব্যয়িত সময়:'}{' '}
              <strong>{formatTime(timeTaken)}</strong>
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button
            onClick={onReview}
            className="px-6 py-3 rounded bg-gray-700 hover:bg-gray-600 transition w-full sm:w-auto"
          >
            {language === 'en' ? 'Review Answers' : 'উত্তর পর্যালোচনা'}
          </button>
          <button
            onClick={onRestart}
            className="px-6 py-3 rounded bg-indigo-600 hover:bg-indigo-700 font-semibold transition w-full sm:w-auto"
          >
            {language === 'en' ? 'Take Another Exam' : 'আবার পরীক্ষা দিন'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsView;