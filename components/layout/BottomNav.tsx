import React from 'react';
import { Home, Camera, Leaf, Users, MessageCircle } from 'lucide-react';

interface BottomNavProps {
  currentView: string;
  setView: (view: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'detect', icon: Camera, label: 'Scan', highlight: true },
    { id: 'chat', icon: MessageCircle, label: 'Advisor' },
    { id: 'farms', icon: Leaf, label: 'Farms' },
    { id: 'detect', icon: Camera, label: 'Scan', highlight: true },
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'community', icon: Users, label: 'Help' },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-white/90 backdrop-blur-lg dark:bg-[#1A1A1A]/90 border-t border-gray-200/50 dark:border-gray-800 pb-safe z-50">
      <div className="flex justify-around items-center h-20 px-2">
        {navItems.map(item => {
          const isActive = currentView === item.id;
          if (item.highlight) {
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className="relative -top-6 group cursor-pointer"
              >
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300
                  ${isActive
                    ? 'bg-gradient-to-br from-[#22B550] to-[#178C3A] scale-110 shadow-green-500/50'
                    : 'bg-[#2C3E50] shadow-gray-500/30'}
                `}>
                  <Camera className="w-7 h-7 text-white" />
                </div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-500">Scan</span>
              </button>
            )
          }
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full transition-all duration-200 space-y-1 cursor-pointer
                ${isActive ? 'text-[#22B550]' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'}
              `}
            >
              <item.icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
