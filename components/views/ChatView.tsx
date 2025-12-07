import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ChatView = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', content: string}[]>([
    { role: 'model', content: 'Hello! I am your AgroIntel expert assistant. Ask me anything about your crops, soil, or farming techniques.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key not found");

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-09-2025" });

      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        })),
        generationConfig: {
          maxOutputTokens: 500,
        },
      });

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'model', content: text }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', content: "I'm sorry, I'm having trouble connecting to the network. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-[#121212] pb-24">
      {/* Header */}
      <div className="p-4 bg-white dark:bg-[#1A1A1A] shadow-sm flex items-center gap-3 sticky top-0 z-10">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <Bot className="w-6 h-6 text-[#22B550]" />
        </div>
        <div>
          <h1 className="font-bold text-lg dark:text-white">AgroChat</h1>
          <p className="text-xs text-green-600 font-medium">Online • AI Assistant</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm
              ${msg.role === 'user'
                ? 'bg-[#22B550] text-white rounded-br-none'
                : 'bg-white dark:bg-[#1E1E1E] text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-gray-800'}
            `}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-green-500" />
              <span className="text-xs text-gray-400">Typing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-[#1A1A1A] border-t border-gray-100 dark:border-gray-800 fixed bottom-20 left-0 right-0 max-w-md mx-auto">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about crops, diseases..."
            className="flex-1 bg-gray-100 dark:bg-[#2D2D2D] border-none rounded-full px-4 py-3 focus:ring-2 focus:ring-[#22B550] dark:text-white outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="w-12 h-12 bg-[#22B550] rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:shadow-none transition-all active:scale-95 cursor-pointer"
          >
            <Send className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
