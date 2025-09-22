import React, { useState, useEffect } from 'react';
import { loadUserStats, QuizResult } from '../utlits/quizHelpers';

interface ProfileViewProps {
  onLogout: () => void;
  language: 'en' | 'bn';
  user: { name: string; profilePic: string; email: string }; // Basic user info passed as prop
}

const ProfileView: React.FC<ProfileViewProps> = ({ onLogout, language, user }) => {
  const [stats, setStats] = useState<QuizResult[]>([]);

  useEffect(() => {
    setStats(loadUserStats());
  }, []);

  const totalQuizzes = stats.length;
  const totalScore = stats.reduce((sum, s) => sum + (s.score / s.totalQuestions) * 100, 0);
  const avgScore = totalQuizzes > 0 ? Math.round(totalScore / totalQuizzes) : 0;
  const questionsAnswered = stats.reduce((sum, s) => sum + s.totalQuestions, 0);
  
  return (
    <div className="p-4 md:p-8 text-white">
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <img src={user.profilePic} alt={user.name} className="w-24 h-24 rounded-full border-4 border-indigo-500"/>
            <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-gray-400">{user.email}</p>
                <button onClick={onLogout} className="mt-2 text-sm text-red-400 hover:underline">
                    {language === 'en' ? 'Logout' : 'লগআউট'}
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg text-center">
                <p className="text-4xl font-bold text-indigo-400">{totalQuizzes}</p>
                <p className="text-gray-400 mt-2">Quizzes Taken</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
                <p className="text-4xl font-bold text-indigo-400">{avgScore}%</p>
                <p className="text-gray-400 mt-2">Average Score</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
                <p className="text-4xl font-bold text-indigo-400">{questionsAnswered}</p>
                <p className="text-gray-400 mt-2">Questions Answered</p>
            </div>
        </div>

        <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <div className="bg-gray-800 rounded-lg">
                <ul className="divide-y divide-gray-700">
                    {stats.slice(0, 5).map((stat, index) => (
                        <li key={index} className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold">Quiz on {new Date(stat.date).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-400">{stat.score}/{stat.totalQuestions} correct</p>
                            </div>
                            <p className="text-lg font-bold text-indigo-400">{Math.round((stat.score / stat.totalQuestions) * 100)}%</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  );
};

export default ProfileView;