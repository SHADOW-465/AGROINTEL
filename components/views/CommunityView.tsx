import React from 'react';
import { CheckCircle, Users, Send } from 'lucide-react';
import { MOCK_COMMUNITY_POSTS } from '@/lib/data';
import { Card } from '@/components/ui/Card';

export const CommunityView = () => (
  <div className="p-6 pb-28 h-full flex flex-col animate-in slide-in-from-right">
    <h1 className="text-2xl font-bold mb-6 dark:text-white">Expert Q&A</h1>

    <div className="flex gap-3 overflow-x-auto pb-2 mb-4 scrollbar-hide">
      {['For You', 'Coconut', 'Rice', 'Spices'].map((tag, i) => (
        <button key={tag} className={`
          px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors cursor-pointer
          ${i === 0
            ? 'bg-[#2C3E50] text-white shadow-lg shadow-gray-500/20'
            : 'bg-white border border-gray-100 text-gray-500 dark:bg-[#2D2D2D] dark:border-[#404040] dark:text-gray-300'}
        `}>
          {tag}
        </button>
      ))}
    </div>

    <div className="space-y-4">
      {MOCK_COMMUNITY_POSTS.map(post => (
        <Card key={post.id} className="!p-5">
           <div className="flex gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-purple-700 font-bold text-sm">
                {post.author[0]}
              </div>
              <div>
                <p className="text-sm font-bold dark:text-white">{post.author}</p>
                <p className="text-xs text-gray-400">{post.time} • {post.tags[0]}</p>
              </div>
           </div>

           <h3 className="font-bold text-[#2C3E50] dark:text-gray-200 mb-4">{post.question}</h3>

           <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
              <div className="flex gap-4">
                 <button className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-green-600 transition-colors cursor-pointer">
                   <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-800"><CheckCircle className="w-3 h-3" /></div>
                   {post.votes}
                 </button>
                 <button className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors cursor-pointer">
                   <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-800"><Users className="w-3 h-3" /></div>
                   {post.answers}
                 </button>
              </div>
              <button className="text-xs font-bold text-[#22B550] cursor-pointer">View Answer</button>
           </div>
        </Card>
      ))}
    </div>

    {/* Floating Action Button */}
    <div className="fixed bottom-24 right-6">
      <button className="w-14 h-14 bg-[#22B550] rounded-full shadow-xl shadow-green-500/40 flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer">
        <Send className="w-6 h-6 ml-1" />
      </button>
    </div>
  </div>
);
