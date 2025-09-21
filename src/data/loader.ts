import type { Question } from "../types";

// প্রতিটি টপিকের ডেটার গঠন কেমন হবে তার জন্য একটি ইন্টারফেস
export interface TopicData {
  topic: string;
  questions: Question[]; 
}

// সাইডবারে দেখানোর জন্য টপিকের তালিকা।
export const topicList: string[] = [
    'HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'TypeScript', 'TailwindCSS', 
    'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Git & GitHub', 
    'DevOps & Deployment', 'Development Tools & Workflow', 'AI & Content Creation'
];

// এই ফাংশনটি সব ডেটা fetch করে একটি অ্যারে হিসেবে রিটার্ন করবে।
export const fetchAllSkillData = async (): Promise<TopicData[]> => {
    const promises = topicList.map(async (topic) => {
        // --- পরিবর্তন এখানে ---
        // ফাইলের নাম তৈরির সময় এখন আর '&' চিহ্নটি বাদ দেওয়া হচ্ছে না।
        const fileName = topic.toLowerCase().replace(/\s/g, '').replace(/\.js/g, 'js') + '.json';
        
        try {
            const response = await fetch(`/data/${fileName}`);
            if (!response.ok) {
                console.warn(`Could not load data for: ${fileName}`);
                return null;
            }
            const data = await response.json();
            // প্রতিটি JSON ফাইল একটি অ্যারে, তাই সরাসরি data ব্যবহার করা হচ্ছে
            return { 
                topic: topic, 
                questions: data 
            };
        } catch (error) {
            console.error(`Error fetching or parsing ${fileName}:`, error);
            return null;
        }
    });

    const results = await Promise.all(promises);
    return results.filter(Boolean) as TopicData[];
};

