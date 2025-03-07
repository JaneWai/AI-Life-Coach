import { useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI Life Coach. How can I help you today?",
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(content),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 min-h-[500px] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

// Temporary AI response generator
function generateAIResponse(userMessage: string): string {
  const responses = [
    "I understand how you feel. Let's work through this together.",
    "That's a great question. Here's what I think...",
    "I hear you. Have you considered looking at it from this perspective?",
    "You're making progress! Let's break this down into smaller steps.",
    "It's normal to feel this way. Let's explore some strategies that might help."
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}
