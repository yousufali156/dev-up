// src/types/index.ts

// একটি স্বতন্ত্র প্রশ্নের গঠন
export interface Question {
  id: number;
  level: 'Basic' | 'Intermediate' | 'Advanced' | 'Master';
  sub_topic: string;
  question_en: string;
  question_bn: string;
  details: {
    what_is_en: string;
    what_is_bn: string;
  };
  vip_qa?: { // '?' চিহ্ন দিয়ে বোঝানো হচ্ছে এটি ঐচ্ছিক
    question_en: string;
    answer_en: string;
  };
}

// একটি নির্দিষ্ট টপিকের গঠন
export interface Topic {
  topic: string;
  questions: Question[];
}

// ব্যবহারকারীর ডেটার গঠন
export interface MockUser {
  profilePic: string;
  name: string;
  email: string;
  quizzesTaken: number;
  avgScore: number;
  questionsBookmarked: number;
}