import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Namaste! I am your AI Agriculture Advisor. Ask me anything about your crops, diseases, or farming practices.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API Key not found');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const result = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: `You are an expert agriculture advisor for farmers in Kerala, India. Answer the following question helpfully and concisely: ${input}` }] }]
      });
      const response = await result.response;
      const text = response.text();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I am having trouble connecting to the server. Please try again later.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-gray-50 dark:bg-[#121212]">
      {/* Header */}
      <div className="px-6 py-4 bg-white dark:bg-[#1A1A1A] border-b border-gray-100 dark:border-gray-800">
        <h1 className="text-xl font-bold text-[#2C3E50] dark:text-white flex items-center gap-2">
          <Bot className="w-6 h-6 text-[#22B550]" />
          AI Advisor
        </h1>
        <p className="text-xs text-gray-500">Powered by Gemini AI</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-[#22B550] text-white rounded-br-none'
                  : 'bg-white dark:bg-[#1E1E1E] text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-gray-800'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              <p className={`text-[10px] mt-2 opacity-70 ${msg.role === 'user' ? 'text-green-100' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl rounded-bl-none p-4 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#22B550]" />
                <span className="text-sm text-gray-500">Thinking...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-[#1A1A1A] border-t border-gray-100 dark:border-gray-800 pb-24">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about crops, diseases..."
            className="flex-1 bg-gray-50 dark:bg-[#2C2C2C] border-gray-200 dark:border-gray-700 focus:ring-[#22B550]"
          />
          <Button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-[#22B550] hover:bg-[#1e9e46] text-white rounded-lg w-12 h-12 flex items-center justify-center p-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
