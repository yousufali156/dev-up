// This file contains helper functions for managing quiz stats in localStorage.

import type { Question } from '../data/examLoader';

export interface QuizResult {
  score: number;
  totalQuestions: number;
  timeTaken: number;
  date: string;
}

// Loads all past quiz results for the logged-in user.

export const loadUserStats = (): QuizResult[] => {
  const stats = localStorage.getItem('dev_up_quiz_stats');
  return stats ? JSON.parse(stats) : [];
};

// Saves a new quiz result to the user's stats.

export const saveUserStat = (result: QuizResult) => {
  const existingStats = loadUserStats();
  const newStats = [result, ...existingStats];
  localStorage.setItem('dev_up_quiz_stats', JSON.stringify(newStats));
};

// Formats seconds into a MM:SS string.

export const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};