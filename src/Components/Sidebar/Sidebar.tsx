import React from 'react';

// --- Dependency Fix: Inlining Icon components to resolve import error ---
// এই আইকনগুলো পূর্বে Icons.jsx ফাইলে ছিল। এখন সরাসরি এখানে যোগ করা হয়েছে।
// These icons were previously in Icons.jsx. They are now added directly here.
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>;
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const ExamIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm2.293 2.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const ProfileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
const LoginIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;

// এই কম্পোনেন্টটি বাম পাশের নেভিগেশন বার।
// This component is the navigation bar on the left side.
export default function Sidebar({ 
    activeView, 
    setActiveView, 
    isLoggedIn, 
    language, 
    topics, 
    handleLogin, 
    mockUser 
}) {
    return (
        <aside className="w-64 bg-[#1F2937] p-6 border-r border-gray-700 flex-shrink-0 flex flex-col">
            <div className="text-2xl font-bold text-white mb-10 flex items-center"><span className="text-3xl mr-2">🚀</span> SkillSphere</div>
            <nav className="flex-1 flex flex-col space-y-2 overflow-y-auto pr-2">
                <button onClick={() => setActiveView('home')} className={`flex items-center px-4 py-2 rounded-lg transition-colors w-full text-left ${activeView === 'home' ? 'bg-[#4F46E5]' : 'hover:bg-gray-700'}`}><HomeIcon /> {language === 'en' ? 'Home' : 'হোম'}</button>
                {isLoggedIn && <button onClick={() => setActiveView('profile')} className={`flex items-center px-4 py-2 rounded-lg transition-colors w-full text-left ${activeView === 'profile' ? 'bg-[#4F46E5]' : 'hover:bg-gray-700'}`}><ProfileIcon /> {language === 'en' ? 'Profile' : 'প্রোফাইল'}</button>}
                
                <p className="text-gray-500 text-sm font-semibold pt-6 mb-2 px-4 uppercase">{language === 'en' ? 'Topics' : 'বিষয়সমূহ'}</p>
                {topics.map(topic => (<button key={topic} onClick={() => setActiveView(topic)} className={`flex items-center px-4 py-2 rounded-lg transition-colors w-full text-left ${activeView === topic ? 'bg-[#4F46E5]' : 'hover:bg-gray-700'}`}><CodeIcon/> {topic}</button>))}
                
                <p className="text-gray-500 text-sm font-semibold pt-6 mb-2 px-4 uppercase">{language === 'en' ? 'Assessment' : 'মূল্যায়ন'}</p>
                <button onClick={() => setActiveView('exam')} className={`flex items-center px-4 py-2 rounded-lg transition-colors w-full text-left ${activeView === 'exam' ? 'bg-[#4F46E5]' : 'hover:bg-gray-700'}`}><ExamIcon/>{language === 'en' ? 'Online Exam' : 'অনলাইন পরীক্ষা'}</button>
            </nav>
            <div className="mt-auto pt-4">
                {isLoggedIn ? (<div className="text-center text-sm"><p>{language === 'en' ? 'Welcome' : 'স্বাগতম'}, {mockUser.name}!</p></div>) : (<button onClick={handleLogin} className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"><LoginIcon /> {language === 'en' ? 'Login' : 'লগইন'}</button>)}
            </div>
        </aside>
    );
}

