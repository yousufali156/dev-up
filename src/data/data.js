// --- Data ---
// ধরা যাক, এই ডেটাগুলো আপনার আলাদা আলাদা JSON ফাইল থেকে আসছে।
// Let's assume this data is coming from your separate JSON files.

const HtmlData = { "topic": "HTML", "questions": [ { "id": 1, "level": "Basic", "sub_topic": "Tags and Elements", "question_en": "What is an HTML tag?", "question_bn": "HTML ট্যাগ কী?", "details": { "what_is_en": "HTML tags are keywords enclosed in angle brackets (< >) that tell the browser how to display content.", "what_is_bn": "HTML ট্যাগ হলো অ্যাঙ্গেল ব্র্যাকেট (< >) দিয়ে ঘেরা কীওয়ার্ড, যা ব্রাউজারকে বলে দেয় কীভাবে কন্টেন্ট প্রদর্শন করতে হবে।" }, "vip_qa": { "question_en": "What is the core difference between <b> and <strong> tags?", "answer_en": "The <b> tag only makes text bold visually, carrying no semantic meaning. The <strong> tag, however, makes the text bold and also signifies to browsers and screen readers that the content is important. For SEO and Accessibility, <strong> should be used." } } ] };
const CssData = { "topic": "CSS", "questions": [ { "id": 17, "level": "Basic", "sub_topic": "Selectors and Basic Styling", "question_en": "What is CSS?", "question_bn": "CSS কী?", "details": { "what_is_en": "CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in a markup language like HTML.", "what_is_bn": "CSS হলো একটি স্টাইল শিট ভাষা যা HTML ডকুমেন্টের presentation বর্ণনা করতে ব্যবহৃত হয়।" }, "vip_qa": { "question_en": "What does the term 'Cascading' mean in CSS?", "answer_en": "'Cascading' refers to the algorithm that determines how styles are applied to an element when multiple rules could apply. It's a priority scheme based on three factors: 1) Specificity, 2) Importance (`!important`), and 3) Source Order." } } ] };
const JavascriptData = { "topic": "JavaScript", "questions": [ { "id": 28, "level": "Basic", "sub_topic": "Variables and Data Types", "question_en": "What is the difference between `var`, `let`, and `const`?", "question_bn": "`var`, `let`, এবং `const` এর মধ্যে পার্থক্য কী?", "details": { "what_is_en": "`var` is function-scoped. `let` and `const` are block-scoped. `let` can be reassigned, but `const` cannot.", "what_is_bn": "`var` ফাংশন-স্কোপড। `let` এবং `const` ব্লক-স্কোপড। `let`-এর মান পরিবর্তন করা যায় কিন্তু `const`-এর যায় না।" }, "vip_qa": { "question_en": "Explain the concept of the Temporal Dead Zone (TDZ) for `let` and `const`.", "answer_en": "The Temporal Dead Zone (TDZ) is the period between entering a block scope and the actual declaration of a `let` or `const` variable. Accessing them during this 'dead zone' will result in a `ReferenceError`." } } ] };
// ... এখানে অন্যান্য বিষয়ের ডেটাও একইভাবে যোগ করা হবে।

const rawData = {
    "skillSphereQA": [
        HtmlData,
        CssData,
        JavascriptData,
        // ... এবং অন্যান্য ডেটা অবজেক্ট
    ]
};

// ডেটা প্রসেসিং
const questionsData = rawData.skillSphereQA.reduce((acc, currentTopic) => {
    if (currentTopic && currentTopic.topic) {
        acc[currentTopic.topic.toLowerCase().replace(/\s/g, '').replace('&', '')] = currentTopic.questions;
    }
    return acc;
}, {} as any);