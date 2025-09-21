// CodeBlock.tsx
// No need to import React as we are only using JSX.


// Defining a TypeScript interface for the props.
interface CodeBlockProps {
  code: string;
}

// This component is used to display code blocks.
export default function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre className="bg-gray-900 text-white p-4 rounded-md mt-2 overflow-x-auto text-sm">
      <code>{code}</code>
    </pre>
  );
}
