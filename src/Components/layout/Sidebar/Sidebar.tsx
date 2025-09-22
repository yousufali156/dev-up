// Code line-by-line explanation in bangla
// এখন থেকে আমি আপনার প্রতিটি কোড লাইন বাই লাইন বাংলায় ব্যাখ্যা করব।

import React from 'react';
import { HomeIcon, CodeIcon, ExamIcon, ProfileIcon, LoginIcon } from '../../common/Icons/Icons';
import type { MockUser } from '../../../types';
import Logo from '../../common/Logo/Logo';

// 1. ক্লোজ (X) আইকন SVG হিসেবে তৈরি করা হয়েছে।
const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
);

// 2. SidebarProps interface আগের মতোই থাকছে।
interface SidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
    isLoggedIn: boolean;
    language: 'en' | 'bn';
    setLanguage: (lang: 'en' | 'bn') => void;
    topics: string[];
    handleLogin: () => void;
    mockUser: MockUser;
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

export default function Sidebar({
    activeView,
    setActiveView, // 3. এই prop-টি App.tsx থেকে আসা handleViewChange ফাংশনটিকে রিসিভ করছে।
    isLoggedIn,
    language,
    setLanguage,
    topics,
    handleLogin,
    mockUser,
    isSidebarOpen,
    toggleSidebar,
}: SidebarProps) {

    // 4. NavButton এখন সরাসরি App.tsx থেকে আসা setActiveView ফাংশনটি কল করবে।
    // এর ফলে অপ্রয়োজনীয় handleNavigation ফাংশনটির আর প্রয়োজন নেই।
    const NavButton = ({ view, icon, label }: { view: string; icon: React.ReactNode; label: string }) => (
        <button
            onClick={() => setActiveView(view)} // 5. মূল পরিবর্তনটি এখানে। এখন এটি সরাসরি props থেকে আসা ফাংশনকে কল করছে।
            className={`flex items-center px-4 py-2 rounded-lg transition-colors w-full text-left ${
                activeView === view ? 'bg-[#4F46E5] text-white' : 'text-gray-300 hover:bg-gray-700'
            }`}
        >
            {icon} {label}
        </button>
    );

    return (
        // 6. সাইডবারের className মোবাইল রেসপন্সিভ করার জন্য আগের মতোই থাকছে।
        <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#1F2937] p-6 border-r border-gray-700 flex-shrink-0 flex flex-col transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex justify-between items-center mb-8">
                <div className="text-4xl font-extrabold flex items-center gap-2">
                    <Logo/>
                </div>
                {/* 7. এই ক্লোজ বাটনটি শুধু মোবাইল ভিউতে দেখা যাবে। */}
                <button className="md:hidden text-gray-400 hover:text-white" onClick={toggleSidebar}>
                    <CloseIcon />
                </button>
            </div>

            <div className="mb-6 flex bg-gray-800 rounded-lg p-1">
                <button
                    onClick={() => setLanguage('en')}
                    className={`w-1/2 py-1 rounded ${language === 'en' ? 'bg-[#4F46E5]' : ''}`}
                >
                    EN
                </button>
                <button
                    onClick={() => setLanguage('bn')}
                    className={`w-1/2 py-1 rounded ${language === 'bn' ? 'bg-[#4F46E5]' : ''}`}
                >
                    BN
                </button>
            </div>

            <nav className="flex-1 flex flex-col space-y-2 overflow-y-auto pr-2 custom-scrollbar">
                <NavButton view="home" icon={<HomeIcon />} label={language === 'en' ? 'Home' : 'হোম'} />
                {isLoggedIn && <NavButton view="profile" icon={<ProfileIcon />} label={language === 'en' ? 'Profile' : 'প্রোফাইল'} />}

                <p className="text-gray-500 text-sm font-semibold pt-6 mb-2 px-4 uppercase">{language === 'en' ? 'Topics' : 'বিষয়সমূহ'}</p>
                {topics.map(topic => (
                    <NavButton key={topic} view={topic} icon={<CodeIcon />} label={topic} />
                ))}

                <p className="text-gray-500 text-sm font-semibold pt-6 mb-2 px-4 uppercase">{language === 'en' ? 'Assessment' : 'মূল্যায়ন'}</p>
                <NavButton view="exam" icon={<ExamIcon />} label={language === 'en' ? 'Online Exam' : 'অনলাইন পরীক্ষা'} />
            </nav>

            <div className="mt-auto pt-4 border-t border-gray-700">
                {isLoggedIn ? (
                    <div className="text-center text-sm text-gray-400">
                        <p>{language === 'en' ? 'Welcome' : 'স্বাগতম'}, <span className="font-bold text-white">{mockUser.name}!</span></p>
                    </div>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        <LoginIcon /> {language === 'en' ? 'Login' : 'লগইন'}
                    </button>
                )}
            </div>
        </aside>
    );
}