// React এবং প্রয়োজনীয় হুকগুলো ইম্পোর্ট করা হচ্ছে।
import React, { useState, useEffect } from 'react';
// আপনার তৈরি করা নতুন এবং উন্নত examLoader ইম্পোর্ট করা হচ্ছে।
import { loadExamQuestions, Question } from '../data/examLoader';

// কম্পোনেন্টের props-এর জন্য টাইপ ডিফাইন করা হচ্ছে।
type ExamViewProps = {
  language: 'en' | 'bn';
};

const QUESTIONS_PER_QUIZ = 50; // প্রতি কুইজে মোট প্রশ্নের সংখ্যা।
const TOTAL_TIME = 30 * 60;   // কুইজের মোট সময় (সেকেন্ডে), যেমন ৩০ মিনিট।

const ExamView: React.FC<ExamViewProps> = ({ language }) => {
  // --- State Management ---
  const [quizState, setQuizState] = useState<'not-started' | 'in-progress' | 'finished'>('not-started');
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [currentQuizSet, setCurrentQuizSet] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isLoading, setIsLoading] = useState(true); // লোডিং স্টেট

  // প্রথমবার সবগুলো প্রশ্ন লোড করার জন্য।
  useEffect(() => {
    loadExamQuestions().then((questions) => {
      setAllQuestions(questions);
      setIsLoading(false); // লোডিং শেষ
    });
  }, []);

  // টাইমার управления করার জন্য useEffect।
  useEffect(() => {
    if (quizState !== 'in-progress' || timeLeft === 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    if (timeLeft === 0) finishQuiz();
    return () => clearInterval(timerId);
  }, [quizState, timeLeft]);

  // --- Helper Functions ---
  const startQuiz = () => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setCurrentQuizSet(shuffled.slice(0, QUESTIONS_PER_QUIZ));
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setTimeLeft(TOTAL_TIME);
    setQuizState('in-progress');
  };

  const finishQuiz = () => {
    setQuizState('finished');
  };

  const handleNextQuestion = () => {
    const currentQuestion = currentQuizSet[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex < QUESTIONS_PER_QUIZ - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      finishQuiz();
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // --- Conditional UI Rendering ---

  if (quizState === 'not-started') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-5xl font-extrabold text-white mb-4">Online Exam</h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl">
          Test your knowledge with {QUESTIONS_PER_QUIZ} random questions. You have {TOTAL_TIME / 60} minutes.
        </p>
        <button
          onClick={startQuiz}
          className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Start Exam"}
        </button>
      </div>
    );
  }

  if (quizState === 'finished') {
    const percentage = Math.round((score / QUESTIONS_PER_QUIZ) * 100);
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-5xl font-extrabold text-white mb-4">Exam Finished!</h1>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white">
          <p className="text-2xl mb-4">Your Final Score:</p>
          <p className="text-6xl font-bold text-indigo-400">{percentage}%</p>
          <p className="text-xl mt-2">({score} out of {QUESTIONS_PER_QUIZ} correct)</p>
        </div>
        <button
          onClick={startQuiz}
          className="mt-8 bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  const currentQuestion = currentQuizSet[currentQuestionIndex];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 text-white">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-400">Topic: <strong>{currentQuestion.topic}</strong></div>
        <div className="font-bold text-lg">{formatTime(timeLeft)}</div>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / QUESTIONS_PER_QUIZ) * 100}%` }}></div>
      </div>
      
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">
          Question {currentQuestionIndex + 1} / {QUESTIONS_PER_QUIZ}
        </h2>
        <p className="text-xl mb-6">{currentQuestion.question}</p>

        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(option)}
              className={`block w-full text-left p-4 rounded-lg border transition-colors ${
                selectedOption === option
                  ? 'bg-indigo-500 border-indigo-400'
                  : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="text-right mt-6">
        <button
          onClick={handleNextQuestion}
          disabled={!selectedOption}
          className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestionIndex === QUESTIONS_PER_QUIZ - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default ExamView;