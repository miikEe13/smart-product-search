'use client';

export default function TypingResponse({ text, isComplete }) {
  let parsed = [];

  if (isComplete) {
    try {
      parsed = JSON.parse(text);
    } catch (error) {
      console.error('❌ Failed to parse JSON:', text);
    }
  }


  if (!parsed.length) {
    return (
      <div className="max-w-2xl mx-auto bg-gray-100 text-gray-700 text-sm font-mono p-4 rounded-lg border border-gray-300 whitespace-pre-wrap">
        {text || '🤖 Thinking...'}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white text-gray-800 p-4 rounded-lg shadow-md space-y-3 border border-gray-200">
      {parsed.map((item, index) => (
        <div key={index} className="border-l-4 border-blue-500 pl-4">
          <p className="font-semibold text-base text-blue-800">✅ {item.title}</p>
          <p className="text-sm text-gray-600 italic">“{item.reason}”</p>
        </div>
      ))}
    </div>
  );
}
