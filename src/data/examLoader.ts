// src/data/examLoader.ts

export type Question = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  topic: string;
};

// Helper: নির্দিষ্ট JSON ফাইল থেকে সর্বোচ্চ ৫০টা প্রশ্ন আনা
const fetchQuestionsFromFile = async (
  file: string,
  topic: string
): Promise<Question[]> => {
  const res = await fetch(`/data/${file}`);
  const data = await res.json();

  // ধরছি প্রতিটি JSON এ "questions" নামে অ্যারে আছে
  return (data.questions || []).slice(0, 50).map((q: any, index: number) => ({
    id: `${topic}-${index}`,
    question: q.question,
    options: q.options,
    answer: q.answer,
    topic,
  }));
};

// সব JSON ফাইল থেকে প্রশ্ন লোড করার মেইন ফাংশন
export const loadExamQuestions = async (): Promise<Question[]> => {
  const files = [
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

  let allQuestions: Question[] = [];

  for (const { file, topic } of files) {
    const qs = await fetchQuestionsFromFile(file, topic);
    allQuestions = [...allQuestions, ...qs];
  }

  // 🔹 কিছু extra general প্রশ্ন অ্যাড করছি
  const extra: Question[] = [
    {
      id: "general-1",
      question: "What is debugging and why is it important?",
      options: [
        "Fixing errors",
        "Writing tests",
        "Deploying apps",
        "Adding features",
      ],
      answer: "Fixing errors",
      topic: "General",
    },
    {
      id: "general-2",
      question: "Which one is a best practice for clean code?",
      options: [
        "Meaningful variable names",
        "Global variables everywhere",
        "Long functions",
        "Ignoring comments",
      ],
      answer: "Meaningful variable names",
      topic: "General",
    },
  ];

  return [...allQuestions, ...extra];
};
