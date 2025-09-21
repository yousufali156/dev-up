// code: ProfileView.tsx

// React লাইব্রেরী ইম্পোর্ট করা হচ্ছে।
import React from 'react';

// ইউজার ডেটার 구조 (structure) সংজ্ঞায়িত করার জন্য একটি TypeScript টাইপ।
// এটি নিশ্চিত করে যে 'user' অবজেক্টে সঠিক প্রপার্টিগুলো আছে।
type MockUser = {
  profilePic: string;
  name: string;
  email: string;
  quizzesTaken: number;
  avgScore: number;
  questionsBookmarked: number;
};

// ProfileView কম্পোনেন্টের props-এর জন্য টাইপ ডিফাইন করা হচ্ছে।
type ProfileViewProps = {
  user: MockUser;
  onLogout: () => void; // onLogout একটি ফাংশন যা কোনো রিটার্ন করে না।
  language: 'en' | 'bn';
};

// ProfileView নামের একটি ফাংশনাল কম্পোনেন্ট তৈরি করা হচ্ছে।
const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout, language }) => {
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-white mb-6">
        {language === 'en' ? 'My Profile' : 'আমার প্রোফাইল'}
      </h1>

      {/* প্রোফাইল কার্ড */}
      <div className="bg-[#1F2937] p-8 rounded-lg shadow-lg">
        {/* প্রোফাইলের উপরের অংশ: ছবি, নাম এবং ইমেল */}
        <div className="flex items-center space-x-4">
          <img 
            src={user.profilePic} 
            alt="Profile" 
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>

        {/* ব্যবহারকারীর পরিসংখ্যান দেখানোর জন্য গ্রিড */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-[#374151] p-4 rounded-lg">
            <p className="text-2xl font-bold">{user.quizzesTaken}</p>
            <p className="text-gray-400">
              {language === 'en' ? 'Quizzes Taken' : 'কুইজ দিয়েছেন'}
            </p>
          </div>
          <div className="bg-[#374151] p-4 rounded-lg">
            <p className="text-2xl font-bold">{user.avgScore}%</p>
            <p className="text-gray-400">
              {language === 'en' ? 'Average Score' : 'গড় স্কোর'}
            </p>
          </div>
          <div className="bg-[#374151] p-4 rounded-lg">
            <p className="text-2xl font-bold">{user.questionsBookmarked}</p>
            <p className="text-gray-400">
              {language === 'en' ? 'Bookmarked' : 'বুকমার্ক করা'}
            </p>
          </div>
        </div>

        {/* লগআউট বাটন */}
        <button 
          onClick={onLogout} 
          className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          {language === 'en' ? 'Logout' : 'লগআউট'}
        </button>
      </div>
    </div>
  );
};

// কম্পোনেন্টটি এক্সপোর্ট করা হচ্ছে।
export default ProfileView;