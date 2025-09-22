// ========================= CONFIGURATION =========================
// ❗️ ভবিষ্যতে নতুন টপিক যোগ করতে হলে শুধু নিচের এই অ্যারেতে একটি নতুন লাইন যোগ করুন।
// =================================================================

interface TopicConfig {
  file: string; // JSON ফাইলের নাম।
  topic: string; // টপিকের নাম যা UI-তে দেখানো হবে।
}

const examTopics: TopicConfig[] = [
  { file: "javascript.json", topic: "JavaScript" },
  { file: "react.json", topic: "React" },
  { file: "nodejs.json", topic: "Node.js" },
  { file: "expressjs.json", topic: "Express.js" },
  { file: "mongodb.json", topic: "MongoDB" },
  { file: "mongoose.json", topic: "Mongoose" },
  { file: "nextjs.json", topic: "Next.js" },
  { file: "typescript.json", topic: "TypeScript" },
  { file: "html.json", topic: "HTML" },
  { file: "css.json", topic: "CSS" },
  { file: "git&github.json", topic: "Git & GitHub" },
  { file: "devops&deployment.json", topic: "DevOps & Deployment" },
  { file: "developmenttools&workflow.json", topic: "Dev Tools & Workflow" },
  { file: "tailwindcss.json", topic: "TailwindCSS" },
  { file: "interpersonal.json", topic: "Soft Skills" },
  { file: "ai&contentcreation.json", topic: "AI & Content" },
];

// ======================= TYPE DEFINITIONS ========================

// আমাদের অ্যাপ্লিকেশনের জন্য চূড়ান্ত Question টাইপ।
export type Question = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  topic: string;
};

// JSON ফাইলের ভেতরের ডেটার গঠন।
type RawQuestion = {
  question: string;
  options: string[];
  answer: string;
};

// ======================= LOADER LOGIC ==========================

// একটি ফাইল থেকে প্রশ্ন আনা এবং ফরম্যাট করার জন্য হেল্পার ফাংশন।
const fetchQuestionsFromFile = async ({ file, topic }: TopicConfig): Promise<Question[]> => {
  try {
    const response = await fetch(`/data_new/${file}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${file}: ${response.statusText}`);
    }
    const data: { questions?: RawQuestion[] } = await response.json();

    // কাঁচা ডেটাকে আমাদের Question টাইপে ম্যাপ করা হচ্ছে।
    return (data.questions || []).slice(0, 50).map((q, index) => ({
      id: `${topic}-${index}`,
      question: q.question,
      options: q.options,
      answer: q.answer,
      topic,
    }));
  } catch (error) {
    console.warn(`Could not load questions from ${file}.`, error);
    return []; // কোনো ফাইল লোড হতে ব্যর্থ হলে খালি অ্যারে রিটার্ন করা হবে।
  }
};

// পরীক্ষার জন্য সব প্রশ্ন লোড করার মূল ফাংশন।
export const loadExamQuestions = async (): Promise<Question[]> => {
  // উপরের কনফিগারেশন তালিকা অনুযায়ী সব ফাইল থেকে প্রশ্ন আনা হচ্ছে।
  const promises = examTopics.map(fetchQuestionsFromFile);
  const results = await Promise.all(promises);
  const allQuestions = results.flat();

  // কিছু অতিরিক্ত সাধারণ প্রশ্ন যোগ করা হচ্ছে।
  const extraGeneralQuestions: Question[] = [
    {
      id: "general-1",
      question: "What is debugging and why is it important in software development?",
      options: ["Fixing errors", "Writing tests", "Deploying apps", "Adding features"],
      answer: "Fixing errors",
      topic: "General",
    },
    {
      id: "general-2",
      question: "Which of the following is a key principle of 'clean code'?",
      options: ["Meaningful variable names", "Using global variables", "Creating very long functions", "Avoiding comments"],
      answer: "Meaningful variable names",
      topic: "General",
    },
  ];

  // সব প্রশ্নের একত্রিত তালিকা রিটার্ন করা হচ্ছে।
  return [...allQuestions, ...extraGeneralQuestions];
};