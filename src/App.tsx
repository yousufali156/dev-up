// Import necessary hooks and components.
import { useState, useEffect } from 'react';
import HomeView from './views/HomeView';
import TopicView from './views/TopicView';
import ExamView from './views/ExamView';
import ProfileView from './views/ProfileView';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAllSkillData, topicList, type TopicData } from './data/loader';
import type { MockUser } from './types';
import Sidebar from './Components/layout/Sidebar/Sidebar';
import Footer from './Components/layout/Footer/Footer';
import Logo from './Components/common/Logo/Logo';

// ... (mockUser, HamburgerIcon, MobileNavLogo, LanguageToggle components remain the same)
const mockUser: MockUser = { profilePic: '...', name: 'Yousuf Ali', email: 'yousuf@example.com', quizzesTaken: 12, avgScore: 88, questionsBookmarked: 25 };
const HamburgerIcon = () => (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>);
const MobileNavLogo = () => (<div className="text-2xl font-extrabold flex items-center gap-2"><Logo /></div>);
const LanguageToggle = ({ language, setLanguage }: { language: 'en' | 'bn'; setLanguage: (lang: 'en' | 'bn') => void; }) => (<div className="flex bg-gray-800 rounded-lg p-1 text-sm"><button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded ${language === 'en' ? 'bg-[#4F46E5]' : ''}`}>EN</button><button onClick={() => setLanguage('bn')} className={`px-3 py-1 rounded ${language === 'bn' ? 'bg-[#4F46E5]' : ''}`}>BN</button></div>);


export default function App() {
    // ... (All your states and functions remain the same)
    const [activeView, setActiveView] = useState<string>('home');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => localStorage.getItem('isUserLoggedIn') === 'true');
    const [language, setLanguage] = useState<'en' | 'bn'>('bn');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [skillData, setSkillData] = useState<TopicData[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    useEffect(() => { const loadData = async () => { setIsLoading(true); const data = await fetchAllSkillData(); setSkillData(data); setIsLoading(false); }; loadData(); }, []);
    const handleLogin = () => { localStorage.setItem('isUserLoggedIn', 'true'); setIsLoggedIn(true); handleViewChange('profile'); };
    const handleLogout = () => { localStorage.removeItem('isUserLoggedIn'); setIsLoggedIn(false); handleViewChange('home'); };
    const handleViewChange = (view: string) => { setActiveView(view); if (isSidebarOpen) setIsSidebarOpen(false); };
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const renderView = () => {
        if (isLoading) { return <div className="flex flex-col items-center justify-center h-full space-y-4"><div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div><div className="text-xl text-gray-400 font-semibold">🚀 Loading All Questions...</div></div>; }
        const topicObject = skillData.find(t => t.topic === activeView);
        if (topicObject) { return <TopicView topic={topicObject.topic} questions={topicObject.questions} language={language} isLoggedIn={isLoggedIn} />; }
        switch (activeView) {
            case 'home': return <HomeView language={language} />;
            case 'profile': return isLoggedIn ? <ProfileView user={mockUser} onLogout={handleLogout} language={language} /> : <HomeView language={language} />;
            case 'exam': return <ExamView language={language} isLoggedIn={isLoggedIn} handleViewChange={handleViewChange} />;
            default: return <HomeView language={language} />;
        }
    };


    return (
        <div className="h-screen bg-[#111827] text-white font-sans flex flex-col">
            <header className="md:hidden sticky top-0 left-0 right-0 z-50 bg-[#1F2937] p-4 flex justify-between items-center border-b border-gray-700">
                <MobileNavLogo />
                <div className="flex items-center gap-4">
                    <LanguageToggle language={language} setLanguage={setLanguage} />
                    <button className="text-white" onClick={toggleSidebar}>
                        <HamburgerIcon />
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-60 z-30 md:hidden" onClick={toggleSidebar}></div>}

                <Sidebar
                    activeView={activeView}
                    setActiveView={handleViewChange}
                    isLoggedIn={isLoggedIn}
                    language={language}
                    setLanguage={setLanguage}
                    topics={topicList}
                    handleLogin={handleLogin}
                    handleLogout={handleLogout}
                    mockUser={mockUser}
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                />

                <main className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8">
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

            <Footer />
        </div>
    );
}