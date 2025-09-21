import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Components & Views ---
// Importing all necessary components and views.
import Sidebar from './Components/Sidebar/Sidebar';
import TopicView from './views/TopicView';
import HomeView from './views/HomeView';
import ExamView from './views/ExamView';
import ProfileView from './views/ProfileView';

// --- Data ---
// Importing data from the separate data.ts file.
import { rawData } from './data/data';

// --- TypeScript Interface ---
// Defining a type for the user object.
interface MockUser {
  name: string;
  email: string;
  profilePic: string;
  quizzesTaken: number;
  avgScore: number;
  questionsBookmarked: number;
}

// --- Main App Component ---
// The main App component, from which the entire application will run.
export default function App() {
  // --- State Management ---
  // Using the useState hook to manage various states.
  const [activeView, setActiveView] = useState<string>('home'); // Which view is currently displayed.
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Whether the user is logged in.
  const [language, setLanguage] = useState<'en' | 'bn'>('en'); // The application's language.
  const [mockUser, setMockUser] = useState<MockUser>({
    name: 'Yousuf Ali',
    email: 'yousuf@example.com',
    profilePic: 'https://placehold.co/100x100/4F46E5/FFFFFF?text=YA',
    quizzesTaken: 12,
    avgScore: 88,
    questionsBookmarked: 25
  });

  // --- Memoization ---
  // The topics array won't be recalculated if rawData doesn't change.
  const topics = useMemo(() => rawData.skillSphereQA.map(t => t.topic), []);

  // --- Event Handlers ---
  // Function to handle login.
  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveView('profile');
  };
  // Function to handle logout.
  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveView('home');
  };

  // --- Conditional Rendering ---
  // Determining which component to display based on the activeView state.
  const renderContent = () => {
    // Render standard views like Home, Exam, or Profile.
    if (activeView === 'home') return <HomeView language={language} />;
    if (activeView === 'exam') return <ExamView language={language} />;
    if (activeView === 'profile' && isLoggedIn) return <ProfileView user={mockUser} onLogout={handleLogout} language={language} />;

    // This logic finds the correct topic object from the rawData array.
    // It's more robust and prevents crashes if a topic isn't found.
    const topicObject = rawData.skillSphereQA.find(t => t.topic === activeView);

    if (topicObject) {
      // If a valid topic is found, render the TopicView with the correct data.
      return <TopicView
        topic={topicObject.topic}
        questions={topicObject.questions}
        language={language}
        isLoggedIn={isLoggedIn}
      />;
    }

    // As a fallback, if no specific view matches, return to the Home view.
    return <HomeView language={language} />;
  };

  // --- JSX Return ---
  // The main UI is being rendered here.
  return (
    <div className="min-h-screen bg-[#111827] text-white font-sans flex overflow-hidden">
      {/* Sidebar component */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isLoggedIn={isLoggedIn}
        language={language}
        topics={topics}
        handleLogin={handleLogin}
        mockUser={mockUser}
      />

      {/* Main content area */}
      <main className="flex-1 p-10 overflow-y-auto relative">
        {/* Language toggle button */}
        <div className="absolute top-5 right-5 z-20">
          <button onClick={() => setLanguage(lang => lang === 'en' ? 'bn' : 'en')} className="bg-[#1F2937] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg text-sm">
            {language === 'en' ? 'বাংলা' : 'English'}
          </button>
        </div>
        {/* Using Framer Motion for animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView + language}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

