import React from 'react';
import { FiLogIn } from 'react-icons/fi'; // From react-icons for a modern login icon
import {
    HomeIcon, CodeIcon, ExamIcon, ProfileIcon, LogoutIcon,
    ReactIcon, NodeIcon, MongoIcon, JsIcon, HtmlIcon, CssIcon,
    TsIcon, TailwindIcon, NextjsIcon // Newly added topic icons
} from '../../common/Icons/Icons';
import type { MockUser } from '../../../types';
import Logo from '../../common/Logo/Logo';

// The Close (X) icon component for mobile view.
const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
);

// The interface defining the props for the Sidebar component.
interface SidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
    isLoggedIn: boolean;
    language: 'en' | 'bn';
    setLanguage: (lang: 'en' | 'bn') => void;
    topics: string[];
    handleLogin: () => void;
    handleLogout: () => void;
    mockUser: MockUser;
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

// Helper function to get a specific icon for a topic.
const getTopicIcon = (topic: string): React.ReactNode => {
    const lowerTopic = topic.toLowerCase();
    if (lowerTopic.includes('react')) return <ReactIcon />;
    if (lowerTopic.includes('next.js')) return <NextjsIcon />; // Specific icon for Next.js
    if (lowerTopic.includes('typescript')) return <TsIcon />; // Specific icon for TypeScript
    if (lowerTopic.includes('tailwindcss')) return <TailwindIcon />; // Specific icon for TailwindCSS
    if (lowerTopic.includes('node.js')) return <NodeIcon />; // Specific icon for Node.js
    if (lowerTopic.includes('express.js')) return <JsIcon />; // Using JS icon for Express.js (as it's JS based)
    if (lowerTopic.includes('mongodb')) return <MongoIcon />;
    if (lowerTopic.includes('mongoose')) return <MongoIcon />; // Using Mongo icon for Mongoose
    if (lowerTopic.includes('javascript')) return <JsIcon />; // Generic JS icon
    if (lowerTopic.includes('html')) return <HtmlIcon />; // HTML is not in your topics, but keeping for reference
    if (lowerTopic.includes('css')) return <CssIcon />; // CSS is not in your topics, but keeping for reference
    // Default icon for other topics like Git & GitHub, DevOps, AI & Content Creation
    return <CodeIcon />;
}

export default function Sidebar({
    activeView,
    setActiveView,
    isLoggedIn,
    language,
    setLanguage,
    topics,
    handleLogin,
    handleLogout,
    mockUser,
    isSidebarOpen,
    toggleSidebar,
}: SidebarProps) {

    const NavButton = ({ view, icon, label }: { view: string; icon: React.ReactNode; label: string }) => (
        <li>
            <button
                onClick={() => setActiveView(view)}
                className={`flex items-center px-3 py-2.5 rounded-lg transition-colors w-full text-left ${activeView === view ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
            >
                {icon} <span className="flex-1 font-medium">{label}</span>
            </button>
        </li>
    );

    // A helper function to format topic IDs into human-readable names.
    const formatTopicName = (topic: string) => {
        // Special formatting for "JavaScript" to ensure correct display from "Java Script"
        if (topic === "Java Script") return language === 'en' ? "JavaScript" : "জাভাস্ক্রিপ্ট";

        return topic
            .replace(/&/g, ' & ')
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/^\w/, c => c.toUpperCase());
    };

    return (
        <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#1F2937] p-6 border-r border-gray-700 flex flex-col transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex justify-between items-center mb-8">
                <Logo />
                <button className="md:hidden text-gray-400 hover:text-white p-1 rounded-md" onClick={toggleSidebar}>
                    <CloseIcon />
                </button>
            </div>

            {/* Language Toggle buttons (reverted to simpler style) */}
            <div className="mb-6 flex bg-gray-800 rounded-lg p-1 text-sm">
                <button
                    onClick={() => setLanguage('en')}
                    className={`w-1/2 py-1.5 rounded-md transition-colors ${language === 'en' ? 'bg-[#4F46E5] text-white font-semibold' : 'text-gray-400'}`}
                >
                    EN
                </button>
                <button
                    onClick={() => setLanguage('bn')}
                    className={`w-1/2 py-1.5 rounded-md transition-colors ${language === 'bn' ? 'bg-[#4F46E5] text-white font-semibold' : 'text-gray-400'}`}
                >
                    BN
                </button>
            </div>

            {/* Navigation section - takes up available space and is scrollable */}
            <nav className="flex-1 overflow-y-auto space-y-1.5 pr-2 -mr-4 custom-scrollbar">
                <ul>
                    <NavButton view="home" icon={<HomeIcon />} label={language === 'en' ? 'Home' : 'হোম'} />
                    {/* Show Profile link only if logged in */}
                    {isLoggedIn && <NavButton view="profile" icon={<ProfileIcon />} label={language === 'en' ? 'Profile' : 'প্রোফাইল'} />}
                </ul>

                <p className="text-gray-500 text-xs font-semibold pt-4 mb-2 px-3 uppercase tracking-wider">{language === 'en' ? 'Topics' : 'বিষয়সমূহ'}</p>
                <ul>
                    {topics.map(topic => (
                        <NavButton
                            key={topic}
                            view={topic}
                            icon={getTopicIcon(topic)}
                            label={formatTopicName(topic)}
                        />
                    ))}
                </ul>

                <p className="text-gray-500 text-xs font-semibold pt-4 mb-2 px-3 uppercase tracking-wider">{language === 'en' ? 'Assessment' : 'মূল্যায়ন'}</p>
                <ul>
                    <NavButton view="exam" icon={<ExamIcon />} label={language === 'en' ? 'Online Exam' : 'অনলাইন পরীক্ষা'} />
                </ul>
            </nav>

            {/* Login/Logout section - always fixed at the bottom */}
            <div className="mt-auto pt-6 border-t border-gray-700">
                {isLoggedIn ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('profile')}>
                            <img src={mockUser.profilePic} alt={mockUser.name} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold text-white">{mockUser.name}</p>
                                <p className="text-xs text-gray-400 hover:underline">{language === 'en' ? 'View Profile' : 'প্রোফাইল দেখুন'}</p>
                            </div>
                        </div>
                        <button onClick={handleLogout} title="Logout" className="p-2 text-gray-400 hover:text-white rounded-md hover:bg-gray-700 transition">
                            <LogoutIcon />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        <FiLogIn className="w-5 h-5" />
                        <span>{language === 'en' ? 'Login' : 'লগইন'}</span>
                    </button>
                )}
            </div>
        </aside>
    );
}