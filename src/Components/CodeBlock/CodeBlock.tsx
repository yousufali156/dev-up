import React from 'react';

// এই কম্পোনেন্টটি কোড ব্লক দেখানোর জন্য ব্যবহৃত হয়।
// This component is used to display code blocks.
export default function CodeBlock({ code }) {
    return (
        <pre className="bg-gray-900 text-white p-4 rounded-md mt-2 overflow-x-auto text-sm">
            <code>{code}</code>
        </pre>
    );
}
