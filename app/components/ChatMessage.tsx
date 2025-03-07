import type { Message } from "./ChatInterface";

export default function ChatMessage({ message }: { message: Message }) {
  const isAI = message.role === 'assistant';
  
  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[80%] rounded-lg p-4 ${
        isAI 
          ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' 
          : 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100'
      }`}>
        <p className="text-sm sm:text-base">{message.content}</p>
        <span className="text-xs opacity-75 mt-1 block">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
