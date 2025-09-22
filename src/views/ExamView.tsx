// React এবং প্রয়োজনীয় হুকগুলো ইম্পোর্ট করা হচ্ছে।
import React, { useState, useEffect } from 'react';
import { loadExamQuestions, Question } from '../data/examLoader';
import { saveUserStat, formatTime } from '../utlits/quizHelpers'; // 'utlits' এর পরিবর্তে সঠিক পাথ 'utils'
import ResultsView from '../Components/exam/ResultsView';
import AnswerReviewModal from '../Components/exam/AnswerReviewModal';

// Component Props definition.
type ExamViewProps = {
  language: "en" | "bn";
  isLoggedIn: boolean;
  handleViewChange: (view: string) => void;
};

const OPTIONS = [15, 20, 25, 30, 40, 50, 75, 90, 100];
const TIME_PER_Q_SECONDS = 30;

const ExamView: React.FC<ExamViewProps> = ({ language, isLoggedIn, handleViewChange }) => {
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
    const [scoreCorrect, setScoreCorrect] = useState(0);
    const [showStopConfirm, setShowStopConfirm] = useState(false);
    const [showReview, setShowReview] = useState(false);
  
    useEffect(() => {
      setIsLoading(true);
      loadExamQuestions().then((qs) => setAllQuestions(qs)).finally(() => setIsLoading(false));
    }, []);
  
    useEffect(() => {
      if (quizState !== "in-progress" || timeLeft <= 0) return;
      const timerId = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
      if (timeLeft === 0) finishQuiz();
      return () => clearInterval(timerId);
    }, [quizState, timeLeft]);
  
    const prepareQuiz = () => {
      const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
      const pick = shuffled.slice(0, selectedCount);
      setQuizSet(pick);
      setQIndex(0);
      setSelectedOption(null);
      setScoreCorrect(0);
      setAnswers(Array(selectedCount).fill(null));
      setTimeLeft(selectedCount * TIME_PER_Q_SECONDS);
      setQuizState("in-progress");
    };
  
    const finishQuiz = () => {
      const totalTime = selectedCount * TIME_PER_Q_SECONDS;
      const taken = totalTime - timeLeft;
      setTimeTaken(taken);
      setQuizState("finished");
      setShowStopConfirm(false);
    };

    useEffect(() => {
        if (quizState === 'finished') {
            let correctCount = 0;
            answers.forEach((ans, index) => {
                if (quizSet[index] && ans === quizSet[index].answer) {
                    correctCount++;
                }
            });
            setScoreCorrect(correctCount);
    
            saveUserStat({
                score: correctCount,
                totalQuestions: selectedCount,
                timeTaken: timeTaken,
                date: new Date().toISOString(),
            });
        }
    }, [quizState]); // We only need quizState as a dependency here
  
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
  
    if (!isLoggedIn) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">{language === 'en' ? 'Login Required' : 'লগইন প্রয়োজন'}</h2>
          <p className="text-gray-400 mb-6 max-w-md">{language === 'en' ? 'You must be logged in to take the exam. Please log in to continue.' : 'পরীক্ষা দেওয়ার জন্য আপনাকে অবশ্যই লগইন করতে হবে।'}</p>
          <button onClick={() => handleViewChange('profile')} className="bg-indigo-600 px-6 py-3 rounded-lg font-bold text-lg hover:bg-indigo-700 transition">{language === 'en' ? 'Go to Login' : 'লগইন করতে যান'}</button>
        </div>
      );
    }
  
    if (quizState === "not-started") {
      return (
          <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">{language === 'en' ? 'Online Exam' : 'অনলাইন পরীক্ষা'}</h1>
            <p className="text-gray-400 mb-8 text-center max-w-xl">{language === 'en' ? 'Choose how many questions to attempt. Time will be allocated automatically.' : 'কতটি প্রশ্ন দিতে চান তা নির্বাচন করুন।'}</p>
            <div className="w-full max-w-3xl bg-[#1F2937] p-6 md:p-8 rounded-lg shadow-2xl">
              <h3 className="text-xl md:text-2xl font-bold mb-6">{language === 'en' ? 'Select Number of Questions' : 'প্রশ্ন সংখ্যা নির্বাচন করুন'}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                {OPTIONS.map((opt) => (
                    <button key={opt} onClick={() => setSelectedCount(opt)} className={`px-4 py-3 rounded-lg font-semibold transition duration-200 text-sm md:text-base ${ selectedCount === opt ? "bg-indigo-600 text-white ring-2 ring-indigo-400" : "bg-gray-700 text-gray-300 hover:bg-gray-600" }`}>
                      {opt} {language === 'en' ? 'Qns' : 'প্রশ্ন'} • {formatTime(opt * TIME_PER_Q_SECONDS)}
                    </button>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between mt-8 border-t border-gray-700 pt-6">
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                  <p className="font-semibold text-white">{language === 'en' ? 'Estimated Time' : 'আনুমানিক সময়'}: <span className="text-indigo-400">{formatTime(selectedCount * TIME_PER_Q_SECONDS)}</span></p>
                  <p className="text-sm text-gray-400 mt-1">{language === 'en' ? `Per question: ${TIME_PER_Q_SECONDS} sec` : `প্রতি প্রশ্ন: ${TIME_PER_Q_SECONDS} সেকেন্ড`}</p>
                </div>
                <button onClick={prepareQuiz} className="w-full sm:w-auto bg-indigo-600 px-6 py-3 rounded-lg font-bold text-lg hover:bg-indigo-700 transition disabled:opacity-50" disabled={isLoading}>
                    {isLoading ? (language === 'en' ? 'Loading...' : 'লোড হচ্ছে...') : (language === 'en' ? 'Start Exam' : 'পরীক্ষা শুরু')}
                </button>
              </div>
            </div>
          </div>
        );
    }
  
    if (quizState === 'in-progress') {
      const currentQ = quizSet[qIndex];
      if (!currentQ) return <div className="text-center text-white p-8">Loading...</div>;
      return (
        <>
          <div className="max-w-3xl mx-auto p-4 text-white">
              <header className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-400">{language === 'en' ? 'Question' : 'প্রশ্ন'}: <strong>{qIndex + 1} / {quizSet.length}</strong></p>
                    <button onClick={() => setShowStopConfirm(true)} className="text-xs text-red-400 hover:underline mt-1">{language === 'en' ? 'Stop Exam' : 'পরীক্ষা বন্ধ করুন'}</button>
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
                  <button onClick={() => handleNext(true)} className="px-6 py-3 rounded bg-gray-600 hover:bg-gray-500 font-semibold transition">{language === 'en' ? 'Skip' : 'এড়িয়ে যান'}</button>
                  <button onClick={() => handleNext(false)} disabled={!selectedOption} className="px-6 py-3 rounded bg-indigo-600 font-semibold disabled:opacity-60 transition">
                      {qIndex === quizSet.length - 1 ? (language === 'en' ? 'Finish' : 'শেষ করুন') : (language === 'en' ? 'Next' : 'পরবর্তী')}
                  </button>
              </footer>
          </div>
      
          {showStopConfirm && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm text-center">
                <h3 className="text-xl font-semibold mb-3 text-white">{language === 'en' ? 'Are you sure?' : 'আপনি কি নিশ্চিত?'}</h3>
                <p className="text-gray-400 mb-6">{language === 'en' ? 'Your progress will be finalized if you stop.' : 'আপনি থামলে আপনার অগ্রগতি চূড়ান্ত করা হবে।'}</p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => setShowStopConfirm(false)} className="px-5 py-2 rounded bg-gray-700 hover:bg-gray-600 transition">{language === 'en' ? 'Cancel' : 'বাতিল'}</button>
                  <button onClick={finishQuiz} className="px-5 py-2 rounded bg-red-600 hover:bg-red-700 font-semibold transition text-white">{language === 'en' ? 'Stop Exam' : 'পরীক্ষা বন্ধ করুন'}</button>
                </div>
              </div>
            </div>
          )}
        </>
      );
    }
  
    if (quizState === "finished") {
      let wrong = 0;
      let skipped = 0;
      answers.forEach((ans, index) => {
          if (ans === 'skipped') skipped++;
          else if (ans !== null && quizSet[index] && ans !== quizSet[index].answer) wrong++;
      });
      const unanswered = quizSet.length - (scoreCorrect + wrong + skipped);
  
      const chartData = [
          { title: 'Correct', value: scoreCorrect, color: '#4f46e5' },
          { title: 'Wrong', value: wrong, color: '#ef4444' },
          { title: 'Skipped', value: skipped, color: '#f59e0b' },
          { title: 'Unanswered', value: unanswered, color: '#6b7280' },
      ];
      
      return (
          <>
              <ResultsView
                  scoreCorrect={scoreCorrect}
                  totalQuestions={selectedCount}
                  // ❗️ পরিবর্তন: অপ্রয়োজনীয় 'answers' propটি সরিয়ে ফেলা হয়েছে।
                  timeTaken={timeTaken}
                  onRestart={() => setQuizState("not-started")}
                  onReview={() => setShowReview(true)}
                  language={language}
                  chartData={chartData}
              />
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