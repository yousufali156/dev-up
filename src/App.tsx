
import { useState, useEffect } from 'react';
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
