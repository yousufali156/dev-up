// React এবং প্রয়োজনীয় হুকগুলো ইম্পোর্ট করা হচ্ছে।
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ডেটা লোডার এবং হেল্পার ফাংশন ইম্পোর্ট করা হচ্ছে।
import { loadExamQuestions, Question } from '../data/examLoader';
import { saveUserStat, formatTime, QuizResult } from '../utlits/quizHelpers';

// অ্যানিমেটেড পাই চার্ট কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে।
import AnimatedPieChart from '../Components/common/AnimatedPieChart/AnimatedPieChart';
// উত্তর রিভিউ করার জন্য মডাল ইম্পোর্ট করা হচ্ছে।
import AnswerReviewModal from '../Components/exam/AnswerReviewModal';

// ==================== Main ExamView Component ====================

// Props-এর টাইপ ডিফাইন করা হচ্ছে।
type ExamViewProps = {
  language: "en" | "bn";
  isLoggedIn: boolean;
  handleViewChange: (view: string) => void;
};

// কুইজের জন্য বিভিন্ন অপশন ও কনফিগারেশন।
const OPTIONS = [15, 20, 25, 30, 40, 50, 75, 90, 100];
const TIME_PER_Q_SECONDS = 30;

const ExamView: React.FC<ExamViewProps> = ({ language, isLoggedIn, handleViewChange }) => {
  // --- State Management ---
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCount, setSelectedCount] = useState<number>(50);
  const [quizState, setQuizState] = useState<"not-started" | "in-progress" | "finished">("not-started");
  const [quizSet, setQuizSet] = useState<Question[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<(string | null | 'skipped')[]>([]);
  const [timeLeft, setTimeLeft] = useState(selectedCount * TIME_PER_Q_SECONDS);
  const [timeTaken, setTimeTaken] = useState(0);
  const [showStopConfirm, setShowStopConfirm] = useState(false);
  const [showReview, setShowReview] = useState(false);

  // --- Effects ---
  // ডেটা লোড করার জন্য useEffect।
  useEffect(() => {
    setIsLoading(true);
    loadExamQuestions().then((qs) => setAllQuestions(qs)).finally(() => setIsLoading(false));
  }, []);

  // টাইমার управления করার জন্য useEffect।
  useEffect(() => {
    if (quizState !== "in-progress" || timeLeft <= 0) return;
    const timerId = setInterval(() => setTimeLeft((t) => t > 0 ? t - 1 : 0), 1000);
    if (timeLeft === 0) finishQuiz();
    return () => clearInterval(timerId);
  }, [quizState, timeLeft]);

  // --- Helper Functions ---
  // কুইজ প্রস্তুত এবং শুরু করার ফাংশন।
  const prepareQuiz = () => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const pick = shuffled.slice(0, selectedCount);
    setQuizSet(pick);
    setQIndex(0);
    setSelectedOption(null);
    setAnswers(Array(selectedCount).fill(null));
    setTimeLeft(selectedCount * TIME_PER_Q_SECONDS);
    setQuizState("in-progress");
  };

  // কুইজ শেষ করার ফাংশন।
  const finishQuiz = () => {
    const totalTime = selectedCount * TIME_PER_Q_SECONDS;
    const taken = totalTime - timeLeft;
    setTimeTaken(taken);

    // সঠিক উত্তর গণনা করা হচ্ছে।
    let correctCount = 0;
    answers.forEach((ans, index) => {
      if (quizSet[index] && ans === quizSet[index].answer) {
        correctCount++;
      }
    });
    
    // ফলাফল localStorage-এ সেভ করা হচ্ছে।
    saveUserStat({
      score: correctCount,
      totalQuestions: selectedCount,
      timeTaken: taken,
      date: new Date().toISOString(),
    });

    setQuizState("finished");
    setShowStopConfirm(false);
  };

  // উত্তর দেওয়া, স্কিপ করা এবং পরবর্তী প্রশ্নে যাওয়ার ফাংশন।
  const handleNext = (isSkip = false) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = isSkip ? 'skipped' : selectedOption;
    setAnswers(newAnswers);

    if (qIndex < quizSet.length - 1) {
      setQIndex((i) => i + 1);
      setSelectedOption(null);
    } else {
      finishQuiz();
    }
  };

  // --- UI Rendering ---

  // ব্যবহারকারী লগইন না থাকলে এই স্ক্রিন দেখানো হবে।
  if (!isLoggedIn) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Login Required</h2>
        <p className="text-gray-400 mb-6 max-w-md">You must be logged in to take the exam. Please log in to continue.</p>
        <button onClick={() => handleViewChange('profile')} className="bg-indigo-600 px-6 py-3 rounded-lg font-bold text-lg hover:bg-indigo-700 transition">Go to Login</button>
      </div>
    );
  }

  // কুইজ সেটআপ স্ক্রিন।
  if (quizState === "not-started") {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">Online Exam</h1>
          <p className="text-gray-400 mb-8 text-center max-w-xl">Choose how many questions you want to attempt. Time will be allocated automatically.</p>
          <div className="w-full max-w-3xl bg-[#1F2937] p-6 md:p-8 rounded-lg shadow-2xl">
            <h3 className="text-xl md:text-2xl font-bold mb-6">Select Number of Questions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {OPTIONS.map((opt) => (
                  <button key={opt} onClick={() => setSelectedCount(opt)} className={`px-4 py-3 rounded-lg font-semibold transition duration-200 text-sm md:text-base ${ selectedCount === opt ? "bg-indigo-600 text-white ring-2 ring-indigo-400" : "bg-gray-700 text-gray-300 hover:bg-gray-600" }`}>
                    {opt} Qns • {formatTime(opt * TIME_PER_Q_SECONDS)}
                  </button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 border-t border-gray-700 pt-6">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <p className="font-semibold text-white">Estimated Time: <span className="text-indigo-400">{formatTime(selectedCount * TIME_PER_Q_SECONDS)}</span></p>
                <p className="text-sm text-gray-400 mt-1">Per question: {TIME_PER_Q_SECONDS} sec</p>
              </div>
              <button onClick={prepareQuiz} className="w-full sm:w-auto bg-indigo-600 px-6 py-3 rounded-lg font-bold text-lg hover:bg-indigo-700 transition disabled:opacity-50" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Start Exam"}
              </button>
            </div>
          </div>
        </div>
      );
  }

  // কুইজ চলার সময়কার স্ক্রিন।
  if (quizState === 'in-progress') {
    const currentQ = quizSet[qIndex];
    if (!currentQ) return <div className="text-center text-white p-8">Loading...</div>;
    return (
      <>
        <div className="max-w-3xl mx-auto p-4 text-white">
            <header className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-400">Question: <strong>{qIndex + 1} / {quizSet.length}</strong></p>
                  <button onClick={() => setShowStopConfirm(true)} className="text-xs text-red-400 hover:underline mt-1">Stop Exam</button>
                </div>
                <p className="text-lg font-semibold">{formatTime(timeLeft)}</p>
            </header>
            <main className="bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">{currentQ.question}</h2>
                <div className="grid gap-3">
                    {currentQ.options.map((opt, i) => (
                        <button key={i} onClick={() => setSelectedOption(opt)} className={`w-full text-left p-3 rounded-lg border transition ${ selectedOption === opt ? "bg-indigo-500 border-indigo-400" : "bg-gray-700 border-gray-600 hover:bg-gray-600" }`}>
                            {opt}
                        </button>
                    ))}
                </div>
            </main>
            <footer className="flex justify-end mt-4 gap-4">
                <button onClick={() => handleNext(true)} className="px-6 py-3 rounded bg-gray-600 hover:bg-gray-500 font-semibold transition">Skip</button>
                <button onClick={() => handleNext(false)} disabled={!selectedOption} className="px-6 py-3 rounded bg-indigo-600 font-semibold disabled:opacity-60 transition">
                    {qIndex === quizSet.length - 1 ? 'Finish' : 'Next'}
                </button>
            </footer>
        </div>

        {showStopConfirm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm text-center">
              <h3 className="text-xl font-semibold mb-3 text-white">Are you sure?</h3>
              <p className="text-gray-400 mb-6">Your current progress will be finalized if you stop.</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setShowStopConfirm(false)} className="px-5 py-2 rounded bg-gray-700 hover:bg-gray-600 transition">Cancel</button>
                <button onClick={finishQuiz} className="px-5 py-2 rounded bg-red-600 hover:bg-red-700 font-semibold transition text-white">Stop Exam</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // ফলাফল দেখানোর স্ক্রিন।
  if (quizState === "finished") {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;
    answers.forEach((ans, index) => {
        if (quizSet[index] && ans === quizSet[index].answer) correct++;
        else if (ans === 'skipped') skipped++;
        else if (ans !== null) wrong++;
    });
    const unanswered = quizSet.length - (correct + wrong + skipped);

    const chartData = [
        { title: 'Correct', value: correct, color: '#4f46e5' },
        { title: 'Wrong', value: wrong, color: '#ef4444' },
        { title: 'Skipped', value: skipped, color: '#f59e0b' },
        { title: 'Unanswered', value: unanswered, color: '#6b7280' },
    ];
    
    return (
        <>
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Exam Finished!</h1>
                <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-2xl">
                    <h2 className="text-2xl font-bold text-center mb-6">Your Performance Summary</h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
                        <AnimatedPieChart data={chartData} />
                        <div className="w-full md:w-auto text-center md:text-left">
                            <p className="text-5xl font-extrabold text-indigo-400">{Math.round((correct / quizSet.length) * 100)}%</p>
                            <p className="text-lg text-gray-300 mt-1">{correct} out of {quizSet.length} correct</p>
                            <p className="text-sm text-gray-400 mt-4">Time Taken: <strong>{formatTime(timeTaken)}</strong></p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                        <button onClick={() => setShowReview(true)} className="px-6 py-3 rounded bg-gray-700 hover:bg-gray-600 transition w-full sm:w-auto">Review Answers</button>
                        <button onClick={() => setQuizState("not-started")} className="px-6 py-3 rounded bg-indigo-600 hover:bg-indigo-700 font-semibold transition w-full sm:w-auto">Take Another Exam</button>
                    </div>
                </div>
            </div>
            <AnswerReviewModal
                isOpen={showReview}
                onClose={() => setShowReview(false)}
                quizSet={quizSet}
                userAnswers={answers}
            />
        </>
    );
  }

  return null;
};

export default ExamView;