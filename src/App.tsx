// import React, { useState, useMemo, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import TopicView from './views/TopicView';
// import HomeView from './views/HomeView';
// import ExamView from './views/ExamView';
// import ProfileView from './views/ProfileView';
// import Sidebar from './Components/layout/Sidebar/Sidebar';

// // TypeScript Interface
// interface MockUser {
//   name: string;
//   email: string;
//   profilePic: string;
//   quizzesTaken: number;
//   avgScore: number;
//   questionsBookmarked: number;
// }

// interface QuestionData {
//   topic: string;
//   questions: any[]; // You can create a more specific type for questions later
// }

// // --- Main App Component ---
// export default function App() {
//   // --- State Management ---
//   const [activeView, setActiveView] = useState<string>('home');
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [language, setLanguage] = useState<'en' | 'bn'>('en');
  
//   const [skillData, setSkillData] = useState<QuestionData[]>([]); // State to hold all fetched data
//   const [isLoading, setIsLoading] = useState<boolean>(true); // State to track loading status

//   const [mockUser] = useState<MockUser>({
//     name: 'Yousuf Ali',
//     email: 'yousuf@example.com',
//     profilePic: 'https://placehold.co/100x100/4F46E5/FFFFFF?text=YA',
//     quizzesTaken: 12,
//     avgScore: 88,
//     questionsBookmarked: 25
//   });

//   // List of all your topics. Ensure these match your JSON file names.
//   const topicList = useMemo(() => [
//     'HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'TypeScript', 
//     'TailwindCSS', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 
//     'Git & GitHub', 'DevOps & Deployment', 'AI & Content Creation', 
//     'Development Tools & Workflow'
//   ], []);

//   // --- Data Fetching ---
//   // This effect runs once when the component mounts to load all data.
//   useEffect(() => {
//     const fetchAllData = async () => {
//       setIsLoading(true);
      
//       const promises = topicList.map(async (topic) => {
//         // Create the correct filename from the topic name
//         const fileName = topic.toLowerCase().replace(/\s/g, '').replace('&', '').replace('.js', 'js') + '.json';
        
//         try {
//           const response = await fetch(`/data/${fileName}`);
//           if (!response.ok) {
//             throw new Error(`Failed to fetch ${fileName}`);
//           }
//           const data = await response.json();
//           return { topic: topic, questions: data.questions }; // Return structured data
//         } catch (error) {
//           console.error(error);
//           return null; // Return null if a file fails to load
//         }
//       });

//       const allData = await Promise.all(promises);
//       setSkillData(allData.filter(Boolean) as QuestionData[]); // Filter out any nulls and set state
//       setIsLoading(false);
//     };

//     fetchAllData();
//   }, [topicList]);

//   // --- Memoization ---
//   // The topics array is now derived from the state
//   const topics = useMemo(() => skillData.map(t => t.topic), [skillData]);

//   // --- Event Handlers ---
//   const handleLogin = () => {
//     setIsLoggedIn(true);
//     setActiveView('profile');
//   };
//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setActiveView('home');
//   };

//   // --- Conditional Rendering ---
//   const renderContent = () => {
//     if (isLoading) {
//       return <div className="text-center text-xl">Loading All Topics...</div>;
//     }

//     if (activeView === 'home') return <HomeView language={language} />;
//     if (activeView === 'exam') return <ExamView language={language} />;
//     if (activeView === 'profile' && isLoggedIn) return <ProfileView user={mockUser} onLogout={handleLogout} language={language} />;

//     const topicObject = skillData.find(t => t.topic === activeView);

//     if (topicObject) {
//       return <TopicView
//         topic={topicObject.topic}
//         questions={topicObject.questions}
//         language={language}
//         isLoggedIn={isLoggedIn}
//       />;
//     }

//     return <HomeView language={language} />;
//   };

//   // --- JSX Return ---
//   return (
//     <div className="min-h-screen bg-[#111827] text-white font-sans flex overflow-hidden">
//       <Sidebar
//         activeView={activeView}
//         setActiveView={setActiveView}
//         isLoggedIn={isLoggedIn}
//         language={language}
//         topics={topics}
//         handleLogin={handleLogin}
//         mockUser={mockUser}
//       />
//       <main className="flex-1 p-10 overflow-y-auto relative custom-scrollbar">
//         <div className="absolute top-5 right-5 z-20">
//           <button onClick={() => setLanguage(lang => lang === 'en' ? 'bn' : 'en')} className="bg-[#1F2937] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg text-sm">
//             {language === 'en' ? 'বাংলা' : 'English'}
//           </button>
//         </div>
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeView + language}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.25 }}
//           >
//             {renderContent()}
//           </motion.div>
//         </AnimatePresence>
//       </main>
//     </div>
//   );
// }

// ///ageee thik chilo


// / src/App.tsx
import React, { useState, useEffect, useMemo } from 'react';
import HomeView from './views/HomeView';
import TopicView from './views/TopicView';
import ExamView from './views/ExamView';
import ProfileView from './views/ProfileView';
import { motion, AnimatePresence } from 'framer-motion';
// loader.ts থেকে fetchAllSkillData এবং topicList ইম্পোর্ট করা হচ্ছে
import { fetchAllSkillData, topicList, type TopicData,  } from './data/loader'; 
import type { MockUser } from './types';
import Sidebar from './Components/layout/Sidebar/Sidebar';

// ব্যবহারকারীর জন্য মক ডেটা
const mockUser: MockUser = {
    profilePic: 'https://i.pravatar.cc/150?u=yousuf',
    name: 'Yousuf Ali',
    email: 'yousuf@example.com',
    quizzesTaken: 12,
    avgScore: 88,
    questionsBookmarked: 25,
};

export default function App() {
    // --- State Management ---
    const [activeView, setActiveView] = useState<string>('home');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [language, setLanguage] = useState<'en' | 'bn'>('bn');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // fetch করা সমস্ত ডেটা এখানে স্টোর করা হবে
    const [skillData, setSkillData] = useState<TopicData[]>([]);

    // --- Data Fetching ---
    // এই useEffect hook টি অ্যাপ লোড হওয়ার সময় মাত্র একবার চলবে।
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            // loader.ts থেকে ডেটা fetch করার জন্য ফাংশন কল করা হচ্ছে
            const data = await fetchAllSkillData(); 
            setSkillData(data); // fetch করা ডেটা state-এ সেভ করা হচ্ছে
            setIsLoading(false); // লোডিং শেষ
        };

        loadData();
    }, []); // Dependency array খালি থাকায় এটি শুধু মাউন্ট হওয়ার সময় চলবে

    // --- Event Handlers ---
    const handleLogin = () => {
        setIsLoggedIn(true);
        setActiveView('profile');
    };
    const handleLogout = () => {
        setIsLoggedIn(false);
        setActiveView('home');
    };

    // --- Conditional Rendering ---
    const renderView = () => {
        if (isLoading) {
            return <div className="flex items-center justify-center h-full text-xl text-gray-400">🚀 Loading All Questions...</div>;
        }

        // state-এ থাকা skillData থেকে সঠিক টপিকটি খুঁজে বের করা হচ্ছে
        const topicObject = skillData.find(t => t.topic === activeView);

        // যদি ক্লিক করা টপিকের জন্য প্রশ্ন পাওয়া যায়
        if (topicObject) {
            // TopicView-কে প্রশ্নগুলো props হিসেবে পাঠানো হচ্ছে
            return (
                <TopicView
                    topic={topicObject.topic}
                    questions={topicObject.questions} 
                    language={language}
                    isLoggedIn={isLoggedIn}
                />
            );
        }

        // অন্যান্য ভিউ রেন্ডার করার জন্য switch কেস
        switch (activeView) {
            case 'home':
                return <HomeView language={language} />;
            case 'profile':
                return isLoggedIn ? <ProfileView user={mockUser} onLogout={handleLogout} language={language} /> : <HomeView language={language} />;
            case 'exam':
                return <ExamView language={language} />;
            default:
                return <HomeView language={language} />;
        }
    };

    return (
        <div className="flex h-screen bg-[#111827] text-white font-sans">
            <Sidebar
                activeView={activeView}
                setActiveView={setActiveView}
                isLoggedIn={isLoggedIn}
                language={language}
                setLanguage={setLanguage}
                topics={topicList} // loader.ts থেকে আসা টপিকের তালিকা
                handleLogin={handleLogin}
                mockUser={mockUser}
            />
            <main className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeView}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderView()}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
