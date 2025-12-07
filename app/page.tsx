"use client";

import React, { useState, useEffect } from 'react';
import { Sprout, Globe, Sun as SunIcon, Moon } from 'lucide-react';
import { HomeView } from '@/components/views/HomeView';
import { FarmsView } from '@/components/views/FarmsView';
import { CommunityView } from '@/components/views/CommunityView';
import { ChatView } from '@/components/views/ChatView';
import { CropDoctorView } from '@/components/views/CropDoctorView';
import { DiseaseDetection } from '@/components/features/DiseaseDetection';
import { DiseaseResult } from '@/components/features/DiseaseResult';
import { BottomNav } from '@/components/layout/BottomNav';

export default function AgroIntelApp() {
  const [view, setView] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('en'); // 'en' | 'ml' (Malayalam)

  const [detectionStage, setDetectionStage] = useState('input');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisImage, setAnalysisImage] = useState<string | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleDetectionResult = (result: any, image: string) => {
    setAnalysisResult(result);
    setAnalysisImage(image);
    setDetectionStage('result');
  };

  const resetDetection = () => {
    setDetectionStage('input');
    setAnalysisResult(null);
    setAnalysisImage(null);
  };

  const renderContent = () => {
    switch(view) {
      case 'home': return <HomeView onNavigate={setView} lang={lang} />;
      case 'farms': return <FarmsView />;
      case 'community': return <CommunityView />;
      case 'chat': return <ChatView />;
      case 'crop_doctor': return <CropDoctorView />;
      case 'detect':
        if (detectionStage === 'result') {
          return <DiseaseResult result={analysisResult} image={analysisImage} onBack={resetDetection} />;
        }
        return <DiseaseDetection onResult={handleDetectionResult} goBack={() => setView('home')} />;
      default: return <HomeView onNavigate={setView} lang={lang} />;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-[#121212] font-sans text-[#2C3E50] dark:text-[#F5F5F5] transition-colors duration-200 overflow-hidden`}>
      <div className="max-w-md mx-auto min-h-screen bg-white dark:bg-[#1A1A1A] shadow-2xl relative flex flex-col border-x border-gray-100 dark:border-[#222]">

        {/* Top Status Bar */}
        <header className="px-6 py-4 bg-white/80 dark:bg-[#1A1A1A]/80 backdrop-blur-md flex justify-between items-center z-20 sticky top-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
               <Sprout className="w-5 h-5 text-[#22B550]" />
            </div>
            <span className="font-bold text-lg tracking-tight dark:text-white">AgroIntel</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setLang(l => l === 'en' ? 'ml' : 'en')}
              className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold flex items-center gap-1 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <Globe className="w-3 h-3" />
              {lang === 'en' ? 'EN' : 'ML'}
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              {darkMode ? <SunIcon className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-hide">
          {renderContent()}
        </main>

        <BottomNav currentView={view} setView={setView} />
      </div>
    </div>
  );
}
