import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// বিভিন্ন ফোল্ডার থেকে কম্পোনেন্ট ও ডেটা ইম্পোর্ট করা হচ্ছে

import { rawData } from './data/data'; // data.js থেকে ডেটা আসছে
import TopicView from './views/TopicView';
import Sidebar from './Components/Sidebar/Sidebar';

// ডেটা প্রসেসিং
const questionsData = rawData.skillSphereQA.reduce((acc, currentTopic) => {
    acc[currentTopic.topic.toLowerCase().replace(/\s/g, '')] = currentTopic.questions;
    return acc;
}, {});

export default function App() {
    const [activeView, setActiveView] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [language, setLanguage] = useState('en');
    const [mockUser, setMockUser] = useState({ /* ... ইউজার ডেটা ... */ });

    const topics = useMemo(() => rawData.skillSphereQA.map(t => t.topic), []);

    const handleLogin = () => { /* ... লগইন লজিক ... */ };
    const handleLogout = () => { /* ... লগআউট লজিক ... */ };

    const renderContent = () => {
        // ... এখানে view অনুযায়ী কম্পোনেন্ট দেখানোর লজিক থাকবে ...
        if (activeView === 'home') return <HomeView language={language} />;
        if (activeView === 'exam') return <ExamView language={language} />;
        if (topics.includes(activeView)) {
             return <TopicView topic={activeView} language={language} isLoggedIn={isLoggedIn} />;
        }
        // ... অন্যান্য view-এর জন্য ...
    };

    return (
        <div className="min-h-screen bg-[#111827] text-white font-sans flex overflow-hidden">
            {/* সাইডবার কম্পোনেন্ট */}
            <Sidebar
                activeView={activeView}
                setActiveView={setActiveView}
                isLoggedIn={isLoggedIn}
                language={language}
                topics={topics}
                handleLogin={handleLogin}
                mockUser={mockUser}
            />

            {/* প্রধান কন্টেন্ট */}
            <main className="flex-1 p-10 overflow-y-auto relative">
                 <div className="absolute top-5 right-5">
                    <button onClick={() => setLanguage(lang => lang === 'en' ? 'bn' : 'en')} className="bg-[#1F2937] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg text-sm">
                        {language === 'en' ? 'বাংলা' : 'English'}
                    </button>
                </div>
                <AnimatePresence mode="wait">
                    <motion.div key={activeView + language} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.25 }}>
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}