import React from 'react';
import AnimatedPieChart from '../common/AnimatedPieChart/AnimatedPieChart';
import { formatTime } from '../../utlits/quizHelpers';

// ... (props definition)
interface ResultsViewProps {
  scoreCorrect: number;
  totalQuestions: number;
  answers: (string | null | 'skipped')[];
  timeTaken: number;
  onRestart: () => void;
  onReview: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ scoreCorrect, totalQuestions, answers, timeTaken, onRestart, onReview }) => {
    let wrong = 0;
    let skipped = 0;
    answers.forEach((ans, index) => {
        if (ans === 'skipped') skipped++;
        else if (ans !== null && ans !== 'wrong') wrong++;
    });
    
    // This calculation is a simplification. For a more accurate 'wrong' count, 
    // you would need the original quizSet to compare answers.
    // However, for the chart, total - correct works as a visual representation of non-correct answers.
    const wrongCountForChart = totalQuestions - scoreCorrect;

    const chartData = [
        { title: 'Correct', value: scoreCorrect, color: '#4f46e5' },
        { title: 'Wrong/Unanswered', value: wrongCountForChart, color: '#ef4444' },
    ];
    
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Exam Finished!</h1>
          <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-xl">
            <h2 className="text-2xl font-bold text-center mb-6">Your Performance Summary</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <AnimatedPieChart data={chartData} />
              <div className="w-full md:w-auto text-center md:text-left">
                <p className="text-5xl font-extrabold text-indigo-400">{Math.round((scoreCorrect / totalQuestions) * 100)}%</p>
                <p className="text-lg text-gray-300 mt-1">{scoreCorrect} out of {totalQuestions} correct</p>
                <p className="text-sm text-gray-400 mt-4">Time Taken: <strong>{formatTime(timeTaken)}</strong></p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <button onClick={onReview} className="px-6 py-3 rounded bg-gray-700 hover:bg-gray-600 transition w-full sm:w-auto">Review Answers</button>
              <button onClick={onRestart} className="px-6 py-3 rounded bg-indigo-600 hover:bg-indigo-700 font-semibold transition w-full sm:w-auto">Take Another Exam</button>
            </div>
          </div>
        </div>
    );
};
export default ResultsView;