import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Dependency Fix: Inlining data and components to resolve import errors ---

// Previously in data.js
const rawData = {
  "skillSphereQA": [
    {
      "topic": "HTML",
      "questions": [
        { "id": 1, "level": "Basic", "sub_topic": "Tags and Elements", "question_en": "What is an HTML tag?", "question_bn": "HTML ট্যাগ কী?", "details": { "what_is_en": "HTML tags are keywords enclosed in angle brackets (< >) that tell the browser how to display content.", "what_is_bn": "HTML ট্যাগ হলো অ্যাঙ্গেল ব্র্যাকেট (< >) দিয়ে ঘেরা কীওয়ার্ড, যা ব্রাউজারকে বলে দেয় কীভাবে কন্টেন্ট প্রদর্শন করতে হবে।" }, "vip_qa": { "question_en": "What is the core difference between <b> and <strong> tags?", "answer_en": "The <b> tag only makes text bold visually, carrying no semantic meaning. The <strong> tag, however, makes the text bold and also signifies to browsers and screen readers that the content is important. For SEO and Accessibility, <strong> should be used." } },
        { "id": 2, "level": "Basic", "sub_topic": "Tags and Elements", "question_en": "What is an HTML element?", "question_bn": "HTML এলিমেন্ট কী?", "details": { "what_is_en": "An HTML element is the complete unit, including the opening tag, the content, and the closing tag.", "what_is_bn": "একটি HTML এলিমেন্ট হলো ওপেনিং ট্যাগ, কন্টেন্ট এবং ক্লোজিং ট্যাগ—সবকিছু মিলিয়ে একটি পূর্ণাঙ্গ অংশ।" }, "vip_qa": { "question_en": "What distinguishes an empty element from a regular element?", "answer_en": "A regular element has an opening tag, content, and a closing tag (e.g., <p>...</p>). An empty element has no content or closing tag and is self-closing (e.g., <br>, <img>, <hr>)." } },
        { "id": 3, "level": "Basic", "sub_topic": "Attributes", "question_en": "What is an HTML attribute?", "question_bn": "HTML অ্যাট্রিবিউট কী?", "details": { "what_is_en": "Attributes provide additional information about HTML elements and are always included in the opening tag.", "what_is_bn": "অ্যাট্রিবিউট হলো HTML এলিমেন্টের অতিরিক্ত তথ্য, যা ওপেনিং ট্যাগের ভেতরে লেখা হয়।" }, "vip_qa": { "question_en": "What is the purpose of the `data-*` attribute?", "answer_en": "The `data-*` attributes are used to store custom data private to the page or application, which can be easily accessed by JavaScript for creating more dynamic user experiences without misusing standard attributes." } },
      ]
    },
    { "topic": "CSS", "questions": [ { "id": 17, "level": "Basic", "sub_topic": "Selectors and Basic Styling", "question_en": "What is CSS?", "question_bn": "CSS কী?", "details": { "what_is_en": "CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in a markup language like HTML.", "what_is_bn": "CSS হলো একটি স্টাইল শিট ভাষা যা HTML ডকুমেন্টের presentation বর্ণনা করতে ব্যবহৃত হয়।" }, "vip_qa": { "question_en": "What does the term 'Cascading' mean in CSS?", "answer_en": "'Cascading' refers to the algorithm that determines how styles are applied to an element when multiple rules could apply. It's a priority scheme based on three factors: 1) Specificity, 2) Importance (`!important`), and 3) Source Order." } } ] },
    { "topic": "JavaScript", "questions": [ { "id": 28, "level": "Basic", "sub_topic": "Variables and Data Types", "question_en": "What is the difference between `var`, `let`, and `const`?", "question_bn": "`var`, `let`, এবং `const` এর মধ্যে পার্থক্য কী?", "details": { "what_is_en": "`var` is function-scoped. `let` and `const` are block-scoped. `let` can be reassigned, but `const` cannot.", "what_is_bn": "`var` ফাংশন-স্কোপড। `let` এবং `const` ব্লক-স্কোপড। `let`-এর মান পরিবর্তন করা যায় কিন্তু `const`-এর যায় না।" }, "vip_qa": { "question_en": "Explain the concept of the Temporal Dead Zone (TDZ) for `let` and `const`.", "answer_en": "The Temporal Dead Zone (TDZ) is the period between entering a block scope and the actual declaration of a `let` or `const` variable. While these variables are hoisted, they remain uninitialized. Accessing them during this 'dead zone' will result in a `ReferenceError`." } } ] },
    { "topic": "React", "questions": [ { "id": 38, "level": "Basic", "sub_topic": "Fundamentals", "question_en": "What is React?", "question_bn": "React কী?", "details": { "what_is_en": "React is a declarative, efficient, and flexible JavaScript library for building user interfaces, based on a component architecture.", "what_is_bn": "React একটি ডিক্লেয়ারেটিভ এবং ফ্লেক্সিবল জাভাস্ক্রিপ্ট লাইব্রেরি যা ইউজার ইন্টারফেস (UI) তৈরির জন্য ব্যবহৃত হয়।" }, "vip_qa": { "question_en": "React is a 'library' not a 'framework'. What is the key distinction?", "answer_en": "The key distinction is 'inversion of control'. A **Framework** dictates your application's architecture and calls your code. A **Library** is a set of tools that you call. React is a library because it's focused on the UI layer and doesn't impose rules on routing or state management, giving developers more flexibility." } } ] },
    { "topic": "Next.js", "questions": [ { "id": 48, "level": "Intermediate", "sub_topic": "Fundamentals", "question_en": "What is Next.js?", "question_bn": "Next.js কী?", "details": { "what_is_en": "Next.js is a production-ready React framework that enables features like Server-Side Rendering (SSR) and Static Site Generation (SSG).", "what_is_bn": "Next.js হলো React-এর উপর ভিত্তি করে তৈরি একটি প্রোডাকশন-রেডি ফ্রেমওয়ার্ক।" }, "vip_qa": { "question_en": "What is the difference between a CSR React app and a Next.js SSR app?", "answer_en": "In a CSR app, the browser gets an empty HTML file and renders content after the JS bundle loads. In an SSR app, the server generates the full HTML and sends it to the browser, so the user sees content almost immediately. This is better for SEO and perceived performance." } } ] },
    { "topic": "TypeScript", "questions": [ { "id": 54, "level": "Intermediate", "sub_topic": "Fundamentals", "question_en": "What is TypeScript?", "question_bn": "TypeScript কী?", "details": { "what_is_en": "TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript.", "what_is_bn": "TypeScript হলো JavaScript-এর একটি স্ট্যাটিক্যালি টাইপড সুপারসেট।" }, "vip_qa": { "question_en": "What is the difference between an `interface` and a `type` alias?", "answer_en": "An **`interface`** is primarily for defining object shapes and supports declaration merging. A **`type`** alias is more versatile (can define unions, tuples, etc.) but does not support merging. Use `interface` for object shapes, `type` for everything else." } } ] },
    { "topic": "TailwindCSS", "questions": [ { "id": 58, "level": "Basic", "sub_topic": "Fundamentals", "question_en": "What is TailwindCSS?", "question_bn": "TailwindCSS কী?", "details": { "what_is_en": "TailwindCSS is a utility-first CSS framework that provides low-level utility classes to build custom designs directly in your markup.", "what_is_bn": "TailwindCSS একটি utility-first CSS ফ্রেমওয়ার্ক।" }, "vip_qa": { "question_en": "What are the main criticisms of utility-first CSS, and the counter-arguments?", "answer_en": "Criticism: It makes HTML 'messy'. Counter-argument: This is encapsulated in reusable components. Criticism: It's 'just inline styles'. Counter-argument: It uses a constrained design system and supports states and responsive design, which inline styles cannot." } } ] },
    { "topic": "Node.js", "questions": [ { "id": 63, "level": "Basic", "sub_topic": "Fundamentals", "question_en": "Why is Node.js single-threaded yet performant?", "question_bn": "Node.js কেন Single-Threaded হওয়া সত্ত্বেও পারফরম্যান্ট?", "details": { "what_is_en": "Node.js uses a single-threaded, non-blocking, asynchronous I/O model. Its Event Loop offloads I/O operations, allowing the main thread to handle other requests without being blocked.", "what_is_bn": "Node.js একটি single-threaded, non-blocking, asynchronous I/O মডেল ব্যবহার করে।" }, "vip_qa": { "question_en": "For what type of application would Node.js be a poor choice, and why?", "answer_en": "Node.js would be a poor choice for **CPU-bound applications** (e.g., video encoding). A long-running, synchronous, CPU-intensive task will block the single main thread, making the server completely unresponsive." } } ] },
    { "topic": "Express.js", "questions": [ { "id": 68, "level": "Intermediate", "sub_topic": "Middleware", "question_en": "What is middleware in Express.js?", "question_bn": "Express.js-এ মিডলওয়্যার কী?", "details": { "what_is_en": "Middleware is a function with access to the request (`req`), response (`res`), and `next()` function, which can execute code or modify the request-response cycle.", "what_is_bn": "মিডলওয়্যার হলো এমন একটি ফাংশন যা একটি HTTP রিকোয়েস্ট এবং রেসপন্স সাইকেলের মধ্যে অবস্থান করে।" }, "vip_qa": { "question_en": "What is the purpose of `express.Router()`?", "answer_en": "`express.Router()` creates a modular route handler. It allows you to group related routes into separate files (e.g., `userRoutes.js`) and then mount them on a path in your main app file (`app.use('/users', userRoutes)`), keeping your code organized." } } ] },
    { "topic": "MongoDB", "questions": [ { "id": 71, "level": "Intermediate", "sub_topic": "Mongoose and Schemas", "question_en": "What is Mongoose?", "question_bn": "Mongoose কী?", "details": { "what_is_en": "Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.", "what_is_bn": "Mongoose হলো MongoDB এবং Node.js-এর জন্য একটি Object Data Modeling (ODM) লাইব্রেরি।" }, "vip_qa": { "question_en": "What is the difference between embedding and referencing documents?", "answer_en": "**Embedding:** You store related data within a single document. **Pros:** Fast reads. **Cons:** Data redundancy. **Referencing:** You store references (`ObjectId`) to documents in other collections. **Pros:** Reduces redundancy. **Cons:** Requires extra queries (`populate` or `$lookup`)." } } ] },
    { "topic": "Git & GitHub", "questions": [ { "id": 76, "level": "Intermediate", "sub_topic": "Branching and Merging", "question_en": "What is a merge conflict?", "question_bn": "Merge Conflict কী?", "details": { "what_is_en": "A merge conflict occurs when Git cannot automatically resolve differences in code between two commits.", "what_is_bn": "Merge Conflict তখন ঘটে যখন Git দুটি ভিন্ন ব্রাঞ্চের পরিবর্তনগুলোকে স্বয়ংক্রিয়ভাবে একত্রিত করতে পারে না।" }, "vip_qa": { "question_en": "What is the difference between `git merge` and `git rebase`?", "answer_en": "`git merge` integrates changes by creating a new 'merge commit', preserving history. `git rebase` re-applies commits on top of another branch, creating a linear history but rewriting it. Never rebase a public, shared branch." } } ] },
  ]
};
const questionsData = rawData.skillSphereQA.reduce((acc, currentTopic) => {
    acc[currentTopic.topic.toLowerCase().replace(/\s/g, '')] = currentTopic.questions;
    return acc;
}, {});

// Previously in QuestionCard.jsx and its dependencies
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>;
const AnswerSection = ({ title, content, isVip = false }) => (
    <div className="mt-4">
        <h4 className={`text-lg font-semibold ${isVip ? 'text-amber-400' : 'text-[#4F46E5]'}`}>{title}</h4>
        <p className="text-gray-300 mt-1 whitespace-pre-wrap font-light">{content}</p>
    </div>
);
const QuestionCard = ({ question, language, isLoggedIn }) => {
    const [isOpen, setIsOpen] = useState(false);
    const levelColor = { 'Basic': 'border-emerald-500', 'Intermediate': 'border-sky-500', 'Advanced': 'border-amber-500', 'Master': 'border-red-500' }[question.level] || 'border-gray-500';
    const isVip = !!question.vip_qa;

    const handleToggle = () => {
        if (isVip && !isLoggedIn) {
            alert(language === 'en' ? 'This is a VIP question. Please log in to view.' : 'এটি একটি ভিআইপি প্রশ্ন। অনুগ্রহ করে দেখতে লগইন করুন।');
            return;
        }
        setIsOpen(!isOpen);
    };

    const currentQuestion = language === 'en' ? question.question_en : question.question_bn;
    const whatIs = language === 'en' ? question.details.what_is_en : question.details.what_is_bn;

    return (
        <motion.div layout className={`bg-[#1F2937] rounded-lg shadow-lg mb-4 border-l-4 ${levelColor}`}>
            <div className="p-6 cursor-pointer flex justify-between items-center" onClick={handleToggle}>
                <div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full text-white ${levelColor.replace('border', 'bg')}`}>{question.level}</span>
                    <h3 className="text-xl font-bold text-gray-100 mt-2">{isVip && <LockIcon />}{currentQuestion}</h3>
                </div>
                <motion.div animate={{ rotate: isOpen ? 90 : 0 }}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></motion.div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-6 pb-6 border-t border-gray-700">
                            <AnswerSection title={language === 'en' ? "What is it?" : "এটা কী?"} content={whatIs} />
                            {question.vip_qa && (
                                <AnswerSection 
                                    title={`⭐ ${language === 'en' ? "VIP Interview Question" : "ভিআইপি ইন্টারভিউ প্রশ্ন"}`} 
                                    content={`${question.vip_qa.question_en}\n\nAnswer: ${question.vip_qa.answer_en}`} 
                                    isVip={true} 
                                />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// --- Main TopicView Component ---
export default function TopicView({ topic, language, isLoggedIn }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState([]);
    const allData = questionsData[topic.toLowerCase().replace(/\s/g, '').replace('&', '')] || [];

    const groupedBySubTopic = useMemo(() => {
        return allData.reduce((acc, question) => {
            const subTopic = question.sub_topic || 'General';
            if (!acc[subTopic]) acc[subTopic] = [];
            acc[subTopic].push(question);
            return acc;
        }, {});
    }, [allData]);

    const levels = useMemo(() => [...new Set(allData.map(q => q.level))], [allData]);
    
    const toggleFilter = (level) => setActiveFilters(prev => prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]);

    return (
        <div>
            <h1 className="text-4xl font-extrabold text-white mb-2 capitalize">{topic.replace('.js', '.js ')}</h1>
            <p className="text-gray-400 mb-6">{language === 'en' ? `All questions related to ${topic}.` : `${topic} সম্পর্কিত সকল প্রশ্ন।`}</p>
            <div className="sticky top-0 bg-[#111827] py-4 z-10 mb-4">
                <input type="text" placeholder={language === 'en' ? "Search questions..." : "প্রশ্ন খুঁজুন..."} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-[#1F2937] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"/>
                <div className="flex flex-wrap gap-2 mt-4">{levels.map(level => (<button key={level} onClick={() => toggleFilter(level)} className={`px-3 py-1 text-sm rounded-full transition-colors ${activeFilters.includes(level) ? 'bg-[#4F46E5] text-white' : 'bg-[#374151] text-gray-300 hover:bg-gray-600'}`}>{level}</button>))}</div>
            </div>
            <AnimatePresence>
                {Object.entries(groupedBySubTopic).map(([subTopic, questions]) => {
                    const filteredQuestions = questions
                        .filter(q => (language === 'en' ? q.question_en : q.question_bn).toLowerCase().includes(searchTerm.toLowerCase()))
                        .filter(q => activeFilters.length === 0 || activeFilters.includes(q.level));

                    if (filteredQuestions.length === 0) return null;

                    return (
                        <div key={subTopic} className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-300 border-b-2 border-[#4F46E5] pb-2 mb-4">{subTopic}</h2>
                            {filteredQuestions.map(q => <QuestionCard key={q.id} question={q} language={language} isLoggedIn={isLoggedIn} />)}
                        </div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}

