// Code line-by-line explanation in bangla


import React from 'react'; 
import { HomeIcon, CodeIcon, ExamIcon, ProfileIcon, LoginIcon } from '../../common/Icons/Icons';
import type { MockUser } from '../../../types';

// Sidebar কম্পোনেন্টের props-এর জন্য একটি TypeScript interface তৈরি করা হয়েছে।
interface SidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
    isLoggedIn: boolean;
    language: 'en' | 'bn';
    setLanguage: (lang: 'en' | 'bn') => void;
    topics: string[];
    handleLogin: () => void;
    mockUser: MockUser;
}

export default function Sidebar({
    activeView,
    setActiveView,
    isLoggedIn,
    language,
    setLanguage,
    topics,
    handleLogin,
    mockUser,
}: SidebarProps) {

    // 2. NavButton এর icon prop-এর টাইপ JSX.Element থেকে React.ReactNode-এ পরিবর্তন করা হয়েছে।
    // এটি আরও ফ্লেক্সিবল এবং TypeScript-এর জন্য চেনা সহজ।
    const NavButton = ({ view, icon, label }: { view: string; icon: React.ReactNode; label: string }) => (
        <button
            onClick={() => setActiveView(view)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors w-full text-left ${
                activeView === view ? 'bg-[#4F46E5] text-white' : 'text-gray-300 hover:bg-gray-700'
            }`}
        >
            {icon} {label}
        </button>
    );

    return (
        <aside className="w-72 bg-[#1F2937] p-6 border-r border-gray-700 flex-shrink-0 flex flex-col">
           <div className="text-4xl font-extrabold mb-8 flex items-center gap-2">
  <span className="text-5xl animate-bounce">🚀</span>
  <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg">
    Dev Up
  </span>
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
