// Node.js এর বিল্ট-ইন মডিউল 'fs' এবং 'path' আধুনিক import সিনট্যাক্স ব্যবহার করে ইম্পোর্ট করা হচ্ছে।
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Modules-এ __dirname সরাসরি পাওয়া যায় না, তাই এটি এভাবে তৈরি করতে হয়।
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Step 1: Define input and output directories
const INPUT_DIR = path.join(__dirname, 'public', 'data');
const OUTPUT_DIR = path.join(__dirname, 'public', 'data_new');

// 🔹 Step 2: List of files to convert
const filesToProcess = [
    'ai&contentcreation.json', 'css.json', 'developmenttools&workflow.json',
    'devops&deployment.json', 'expressjs.json', 'git&github.json', 'html.json',
    'interpersonal.json', 'javascript.json', 'mongodb.json', 'mongoose.json',
    'nextjs.json', 'nodejs.json', 'react.json', 'tailwindcss.json', 'typescript.json'
];

// 🔹 Step 3: Create the output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 🔹 Step 4: Process each file
filesToProcess.forEach(filename => {
    const inputFilePath = path.join(INPUT_DIR, filename);
    const outputFilePath = path.join(OUTPUT_DIR, filename);

    try {
        const fileContent = fs.readFileSync(inputFilePath, 'utf-8');
        const oldData = JSON.parse(fileContent);

        const allCorrectAnswers = oldData
            .filter(item => item.vip_qa && item.vip_qa.answer_en)
            .map(item => item.vip_qa.answer_en);

        const newQuestionsList = [];
        oldData.forEach(item => {
            if (!item.question_en || !item.vip_qa || !item.vip_qa.answer_en) {
                return;
            }

            const correctAnswer = item.vip_qa.answer_en;
            const distractors = allCorrectAnswers.filter(ans => ans !== correctAnswer);
            
            const shuffleArray = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            };

            const randomDistractors = shuffleArray([...distractors]).slice(0, 3);
            const options = shuffleArray([correctAnswer, ...randomDistractors]);

            const newQuestion = {
                "question": item.question_en,
                "options": options,
                "answer": correctAnswer
            };
            newQuestionsList.push(newQuestion);
        });

        const finalOutput = { "questions": newQuestionsList };

        fs.writeFileSync(outputFilePath, JSON.stringify(finalOutput, null, 2), 'utf-8');
        
        console.log(`✅ Successfully converted '${filename}'`);

    } catch (error) {
        console.error(`❌ Failed to convert '${filename}'. Error: ${error.message}`);
    }
});

console.log("\n🎉 All files converted successfully! Check the 'public/data_new' folder.");