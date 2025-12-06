"use client"

import React, { useState, useRef, useEffect } from 'react';
import {
  Camera, Upload, Home, Sprout, Users, Settings,
  AlertCircle, CheckCircle, ChevronRight, Droplets,
  Sun, TrendingUp, MapPin, Info, X, ChevronLeft,
  Moon, Sun as SunIcon, Loader2, Send, Leaf, Globe
} from 'lucide-react';
// import { GoogleGenerativeAI } from "@google/generative-ai";

const GoogleGenerativeAI = class {
  constructor(apiKey: string) {}
  getGenerativeModel(config: any) {
    return {
      generateContent: async (content: any) => {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        return {
          response: {
            text: async () => JSON.stringify({
               "disease_found": true,
               "disease_name": "Leaf Spot",
               "confidence": 85,
               "severity": "Moderate",
               "symptoms": "Brown spots on leaves with yellow halos.",
               "treatment": {
                  "step_1": { "day": 1, "action": "Remove infected leaves", "cost_estimate": "₹0" },
                  "step_2": { "day": 3, "action": "Apply fungicide", "cost_estimate": "₹250" }
               },
               "prevention": "Ensure good air circulation and avoid overhead watering."
            })
          }
        }
      }
    }
  }
}

/**
 * AgroIntel - Premium Farmer-Friendly App
 * Design Inspiration: "PlantPro" UI Kit (Organic, Soft, Gradient-rich)
 * Context: Kerala, India (Rice, Coconut, Spices)
 */

// --- Design System Tokens ---
const THEME = {
  colors: {
    primary: '#22B550',    // Crop Success Green
    primaryGradient: 'from-[#22B550] to-[#178C3A]',
    secondary: '#F5F5F5',
    textPrimary: '#2C3E50',
    textSecondary: '#64748B', // Softer gray
    warning: '#E67E22',
    critical: '#E74C3C',
    surface: '#FFFFFF',
    darkBg: '#121212',
    darkSurface: '#1E1E1E',
  },
  radius: 'rounded-2xl', // More organic/soft
  shadow: 'shadow-lg shadow-green-900/5',
};

// --- Mock Data (Kerala Context) ---
const MOCK_FARMS = [
  {
    id: 1,
    name: "Kuttanad Rice Field",
    location: "Alappuzha",
    area: "2.5 Acres",
    crop: "Rice (Uma)",
    health: 88,
    yield: "3.5T",
    lastUpdate: "4h ago",
    image: "https://images.unsplash.com/photo-1536617621572-1d5f1e6269a0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Hilltop Spice Garden",
    location: "Idukki",
    area: "1.2 Acres",
    crop: "Black Pepper",
    health: 72,
    yield: "400kg",
    lastUpdate: "1d ago",
    image: "https://images.unsplash.com/photo-1599522316624-a5e2d6349925?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Coastal Grove",
    location: "Kozhikode",
    area: "50 Trees",
    crop: "Coconut",
    health: 94,
    yield: "Healthy",
    lastUpdate: "2d ago",
    image: "https://images.unsplash.com/photo-1534234528563-02d3174294d6?auto=format&fit=crop&q=80&w=800"
  }
];

const MOCK_COMMUNITY_POSTS = [
  {
    id: 1,
    question: "Yellowing leaves in coconut tree?",
    author: "Ravi Kumar",
    time: "2h ago",
    answers: 5,
    tags: ["Coconut", "Disease"],
    votes: 24
  },
  {
    id: 2,
    question: "Best time to harvest pepper in Wayanad?",
    author: "Sarah Thomas",
    time: "5h ago",
    answers: 2,
    tags: ["Pepper", "Harvest"],
    votes: 8
  }
];

// --- Components ---

const Button = ({ children, variant = 'primary', className = '', onClick, disabled, icon: Icon }: any) => {
  const baseStyle = "flex items-center justify-center font-bold tracking-wide transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100";

  const variants: any = {
    primary: `bg-gradient-to-r ${THEME.colors.primaryGradient} text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/40`,
    secondary: `bg-white dark:bg-[#2D2D2D] border border-gray-100 dark:border-[#404040] text-[#2C3E50] dark:text-gray-200 shadow-sm hover:bg-gray-50`,
    tertiary: `bg-green-50 text-[#22B550] dark:bg-green-900/20 dark:text-green-400 hover:bg-green-100`,
    glass: `bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30`,
  };

  const sizes = "px-6 py-4 rounded-2xl text-sm"; // Larger touch targets

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
};

const Card = ({ children, className = '', highlight = false }: any) => (
  <div className={`
    relative overflow-hidden
    bg-white dark:bg-[#1E1E1E] ${THEME.radius} p-5 ${THEME.shadow}
    ${highlight ? 'border border-[#22B550]/30 ring-4 ring-[#22B550]/5' : 'border border-gray-50 dark:border-[#333]'}
    transition-all duration-300 hover:shadow-xl hover:-translate-y-1
    ${className}
  `}>
    {children}
  </div>
);

const Badge = ({ children, type = 'success', className = '' }: any) => {
  const styles: any = {
    success: 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200 dark:from-green-900/40 dark:to-green-900/20 dark:text-green-400 dark:border-green-800',
    warning: 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border border-orange-200 dark:from-orange-900/40 dark:to-orange-900/20 dark:text-orange-400 dark:border-orange-800',
    critical: 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200 dark:from-red-900/40 dark:to-red-900/20 dark:text-red-400 dark:border-red-800',
    neutral: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[type]} ${className}`}>
      {children}
    </span>
  );
};

// --- Features ---

const DiseaseDetection = ({ onResult, goBack }: any) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);

    try {
      const apiKey = "mock-key";
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-preview-09-2025",
        generationConfig: { responseMimeType: "application/json" }
      });

      const base64Data = image.split(',')[1];
      const prompt = `
        You are an expert agricultural pathologist in India (specifically Kerala). Analyze this crop image.
        Return a JSON object:
        {
          "disease_found": boolean,
          "disease_name": "string",
          "confidence": number,
          "severity": "Mild" | "Moderate" | "Critical",
          "symptoms": "string",
          "treatment": {
             "step_1": { "day": 1, "action": "string", "cost_estimate": "₹..." },
             "step_2": { "day": number, "action": "string" }
          },
          "prevention": "string"
        }
      `;

      const result = await model.generateContent([
        { inlineData: { data: base64Data, mimeType: "image/jpeg" } },
        prompt
      ]);

      const data = JSON.parse(await result.response.text());
      onResult(data, image);

    } catch (err) {
      console.error(err);
      setError("Unable to analyze. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in bg-white dark:bg-[#121212]">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-20"></div>
          <div className="w-24 h-24 bg-gradient-to-br from-[#22B550] to-[#178C3A] rounded-full flex items-center justify-center shadow-xl z-10 relative">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-[#2C3E50] dark:text-white mb-2">Analyzing Crop...</h2>
        <p className="text-gray-500 max-w-xs">Our AI is examining leaves for patterns of disease and nutrient deficiency.</p>
      </div>
    );
  }

  if (image) {
    return (
      <div className="flex flex-col h-full bg-black">
        <div className="flex-1 relative">
           <img src={image} alt="Preview" className="w-full h-full object-contain" />
           <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent flex items-center">
             <button onClick={() => setImage(null)} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
               <ChevronLeft className="w-6 h-6" />
             </button>
             <span className="ml-3 text-white font-bold text-lg">Confirm Photo</span>
           </div>
        </div>
        <div className="p-6 bg-white dark:bg-[#1E1E1E] rounded-t-3xl -mt-6 z-10 flex gap-4">
          <Button variant="secondary" className="flex-1" onClick={() => setImage(null)}>Retake</Button>
          <Button className="flex-1" onClick={analyzeImage} icon={Sun}>Analyze</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-6 animate-in slide-in-from-bottom bg-gradient-to-b from-green-50 to-white dark:from-[#121212] dark:to-[#1A1A1A]">
      <div className="flex items-center mb-8">
        <button onClick={goBack} className="p-3 bg-white dark:bg-[#2D2D2D] rounded-full shadow-sm hover:scale-105 transition-transform">
          <ChevronLeft className="w-5 h-5 dark:text-white" />
        </button>
        <h2 className="text-2xl font-bold ml-4 dark:text-white">New Diagnosis</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center -mt-10">
        <div className="relative w-64 h-64 mb-8">
           {/* Organic background blobs */}
           <div className="absolute top-0 left-4 w-48 h-48 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
           <div className="absolute top-0 right-4 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
           <div className="absolute -bottom-8 left-20 w-48 h-48 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

           <button
             onClick={() => fileInputRef.current?.click()}
             className="relative w-full h-full bg-white dark:bg-[#2D2D2D] rounded-[2rem] shadow-xl flex flex-col items-center justify-center border-2 border-dashed border-green-200 hover:border-[#22B550] hover:scale-105 transition-all group"
           >
             <div className="w-20 h-20 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#22B550] transition-colors">
               <Camera className="w-8 h-8 text-[#22B550] group-hover:text-white transition-colors" />
             </div>
             <span className="font-bold text-lg dark:text-white">Tap to Scan</span>
             <span className="text-sm text-gray-400 mt-1">or select from gallery</span>
           </button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFile}
          accept="image/*"
          capture="environment"
          className="hidden"
        />

        <div className="flex gap-4 items-center px-6 py-3 bg-white dark:bg-[#2D2D2D] rounded-full shadow-sm">
          <Info className="w-5 h-5 text-blue-500" />
          <p className="text-xs text-gray-500 dark:text-gray-400">Position the leaf in center for best results</p>
        </div>
      </div>
    </div>
  );
};

const DiseaseResult = ({ result, image, onBack }: any) => {
  if (!result) return null;
  const isHealthy = !result.disease_found;

  return (
    <div className="h-full overflow-y-auto bg-gray-50 dark:bg-[#121212]">
      {/* Hero Header */}
      <div className="relative h-80">
        <img src={image} className="w-full h-full object-cover" alt="Analyzed" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

        <button onClick={onBack} className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="absolute bottom-8 left-6 right-6">
          <div className="flex items-center gap-3 mb-3">
             <Badge type={isHealthy ? 'success' : result.severity === 'Critical' ? 'critical' : 'warning'} className="backdrop-blur-md shadow-lg border-white/20">
               {isHealthy ? 'Healthy' : `${result.severity} Severity`}
             </Badge>
             {!isHealthy && (
               <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/40 text-white backdrop-blur-md border border-white/10">
                 {result.confidence}% Match
               </span>
             )}
          </div>
          <h1 className="text-3xl font-bold text-white leading-tight">
            {isHealthy ? 'Great Job!' : result.disease_name}
          </h1>
          {!isHealthy && <p className="text-gray-300 mt-1 text-sm font-medium opacity-90">{result.symptoms.substring(0, 60)}...</p>}
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 -mt-6 bg-white dark:bg-[#121212] rounded-t-3xl px-6 py-8 min-h-[50vh]">
        <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-8"></div>

        {isHealthy ? (
          <div className="text-center">
             <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-10 h-10 text-green-600 dark:text-green-400" />
             </div>
             <h3 className="text-xl font-bold dark:text-white mb-2">Your plant is thriving</h3>
             <p className="text-gray-500 mb-8">No disease vectors identified. Keep up the good irrigation and soil maintenance.</p>
             <Button onClick={onBack} className="w-full">Scan Another Plant</Button>
          </div>
        ) : (
          <div className="space-y-8">

            {/* Treatment Timeline (PlantPro Style) */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold dark:text-white flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-[#22B550]" />
                  Treatment Plan
                </h3>
                <span className="text-xs font-bold text-[#22B550] bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">AI Generated</span>
              </div>

              <div className="relative pl-4 space-y-6 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100 dark:before:bg-gray-800">
                {/* Step 1 */}
                <div className="relative flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-[#22B550] text-white flex items-center justify-center font-bold shadow-lg shadow-green-500/30 z-10 shrink-0">1</div>
                   <Card className="flex-1 !p-4 !rounded-2xl">
                     <div className="flex justify-between items-start mb-1">
                       <span className="text-xs font-extrabold text-[#22B550] uppercase">Day {result.treatment.step_1.day}</span>
                       <span className="text-[10px] font-bold text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                         Est. {result.treatment.step_1.cost_estimate}
                       </span>
                     </div>
                     <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{result.treatment.step_1.action}</p>
                   </Card>
                </div>

                {/* Step 2 */}
                <div className="relative flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 text-gray-400 flex items-center justify-center font-bold z-10 shrink-0 dark:bg-[#2D2D2D] dark:border-gray-700">2</div>
                   <Card className="flex-1 !p-4 !rounded-2xl opacity-75">
                     <span className="text-xs font-extrabold text-gray-400 uppercase">Day {result.treatment.step_2.day}</span>
                     <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">{result.treatment.step_2.action}</p>
                   </Card>
                </div>
              </div>
            </section>

            {/* Prevention Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/10 dark:to-[#1E1E1E] border-blue-100 dark:border-blue-900/30">
               <div className="flex gap-3">
                 <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                   <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                 </div>
                 <div>
                   <h4 className="font-bold text-blue-900 dark:text-blue-200 text-sm">Prevention</h4>
                   <p className="text-sm text-blue-800/80 dark:text-blue-300/80 mt-1 leading-relaxed">{result.prevention}</p>
                 </div>
               </div>
            </Card>

            <div className="pt-4">
              <Button className="w-full mb-3" icon={CheckCircle}>Mark as Treated</Button>
              <Button variant="tertiary" className="w-full">Share with Expert</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Views ---

const HomeView = ({ onNavigate, lang }: any) => (
  <div className="p-6 space-y-8 pb-28 animate-in fade-in">
    {/* Header */}
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
          <MapPin className="w-3 h-3" /> Thrissur, Kerala
        </p>
        <h1 className="text-2xl font-bold text-[#2C3E50] dark:text-white">
          {lang === 'ml' ? 'നമസ്കാരം, കർഷകൻ' : 'Namaste, Farmer'}
        </h1>
      </div>
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg ring-2 ring-green-50">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Farmer&backgroundColor=c0aede" alt="Profile" />
      </div>
    </div>

    {/* Weather Hero Card (Gradient) */}
    <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-blue-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A90E2] to-[#2C3E50]"></div>
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

      <div className="relative p-6 text-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider">Monsoon Alert</span>
            </div>
            <p className="text-3xl font-bold">28°C</p>
            <p className="text-blue-100 text-sm">Heavy rain expected</p>
          </div>
          <Droplets className="w-12 h-12 text-blue-200" />
        </div>

        <div className="flex gap-3">
           <div className="flex-1 bg-black/10 backdrop-blur-sm rounded-xl p-3 text-center">
             <p className="text-xs text-blue-100 opacity-70">Humidity</p>
             <p className="font-bold">84%</p>
           </div>
           <div className="flex-1 bg-black/10 backdrop-blur-sm rounded-xl p-3 text-center">
             <p className="text-xs text-blue-100 opacity-70">Wind</p>
             <p className="font-bold">12km/h</p>
           </div>
        </div>
      </div>
    </div>

    {/* Quick Actions (PlantPro Grid) */}
    <div>
      <h2 className="text-lg font-bold dark:text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate('detect')}
          className="relative h-32 bg-green-50 dark:bg-green-900/10 rounded-[2rem] p-5 flex flex-col justify-between items-start hover:bg-green-100 transition-colors group overflow-hidden"
        >
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-green-200 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-10 h-10 bg-white dark:bg-[#22B550] rounded-full flex items-center justify-center shadow-sm z-10">
            <Camera className="text-[#22B550] dark:text-white w-5 h-5" />
          </div>
          <span className="font-bold text-[#2C3E50] dark:text-white z-10">Scan Crop</span>
        </button>

        <button className="relative h-32 bg-orange-50 dark:bg-orange-900/10 rounded-[2rem] p-5 flex flex-col justify-between items-start hover:bg-orange-100 transition-colors group overflow-hidden">
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-orange-200 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
           <div className="w-10 h-10 bg-white dark:bg-orange-500 rounded-full flex items-center justify-center shadow-sm z-10">
            <TrendingUp className="text-orange-500 dark:text-white w-5 h-5" />
          </div>
          <span className="font-bold text-[#2C3E50] dark:text-white z-10">Market Rates</span>
        </button>
      </div>
    </div>

    {/* Farms (Horizontal Scroll) */}
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold dark:text-white">Your Fields</h2>
        <button onClick={() => onNavigate('farms')} className="text-[#22B550] text-sm font-bold">See All</button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
        {MOCK_FARMS.map(farm => (
          <div key={farm.id} className="min-w-[240px]">
            <Card className="!p-0 h-full">
              <div className="h-28 relative">
                <img src={farm.image} alt={farm.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold shadow-sm">
                  {farm.health}% Health
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#2C3E50] dark:text-white mb-1">{farm.name}</h3>
                <p className="text-xs text-gray-400 mb-3">{farm.crop} • {farm.area}</p>
                <div className="flex items-center text-xs font-semibold text-green-600 bg-green-50 w-max px-2 py-1 rounded-md">
                   <TrendingUp className="w-3 h-3 mr-1" /> Expected {farm.yield}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FarmsView = () => (
  <div className="p-6 pb-28 space-y-6 animate-in slide-in-from-right">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold dark:text-white">My Farms</h1>
      <Button className="!px-4 !py-2 !rounded-full text-xs" icon={Sprout}>Add Crop</Button>
    </div>

    <div className="grid gap-6">
      {MOCK_FARMS.map(farm => (
        <Card key={farm.id} className="!p-0 group">
          <div className="flex h-32">
             <div className="w-1/3 relative">
               <img src={farm.image} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
             </div>
             <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg dark:text-white">{farm.name}</h3>
                    <button className="text-gray-300 hover:text-gray-500"><Settings className="w-4 h-4"/></button>
                  </div>
                  <p className="text-sm text-gray-500">{farm.location}</p>
                </div>

                <div className="flex gap-3">
                  <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-1.5 flex-1">
                    <span className="block text-[10px] text-gray-400 uppercase">Crop</span>
                    <span className="font-bold text-sm dark:text-gray-200">{farm.crop.split(' ')[0]}</span>
                  </div>
                  <div className="text-center bg-green-50 dark:bg-green-900/20 rounded-lg p-1.5 flex-1">
                    <span className="block text-[10px] text-green-600/70 uppercase">Health</span>
                    <span className="font-bold text-sm text-green-700 dark:text-green-400">{farm.health}%</span>
                  </div>
                </div>
             </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const CommunityView = () => (
  <div className="p-6 pb-28 h-full flex flex-col animate-in slide-in-from-right">
    <h1 className="text-2xl font-bold mb-6 dark:text-white">Expert Q&A</h1>

    <div className="flex gap-3 overflow-x-auto pb-2 mb-4 scrollbar-hide">
      {['For You', 'Coconut', 'Rice', 'Spices'].map((tag, i) => (
        <button key={tag} className={`
          px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors
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
                 <button className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-green-600 transition-colors">
                   <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-800"><CheckCircle className="w-3 h-3" /></div>
                   {post.votes}
                 </button>
                 <button className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors">
                   <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-800"><Users className="w-3 h-3" /></div>
                   {post.answers}
                 </button>
              </div>
              <button className="text-xs font-bold text-[#22B550]">View Answer</button>
           </div>
        </Card>
      ))}
    </div>

    {/* Floating Action Button */}
    <div className="fixed bottom-24 right-6">
      <button className="w-14 h-14 bg-[#22B550] rounded-full shadow-xl shadow-green-500/40 flex items-center justify-center text-white hover:scale-110 transition-transform">
        <Send className="w-6 h-6 ml-1" />
      </button>
    </div>
  </div>
);

// --- Layout ---

const BottomNav = ({ currentView, setView }: any) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'detect', icon: Camera, label: 'Scan', highlight: true },
    { id: 'farms', icon: Leaf, label: 'Farms' },
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
                className="relative -top-6 group"
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
              className={`flex flex-col items-center justify-center w-full h-full transition-all duration-200 space-y-1
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

export default function AgroIntelApp() {
  const [view, setView] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('en'); // 'en' | 'ml' (Malayalam)

  const [detectionStage, setDetectionStage] = useState('input');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisImage, setAnalysisImage] = useState<any>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleDetectionResult = (result: any, image: any) => {
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
              className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold flex items-center gap-1 hover:bg-gray-200 transition-colors"
            >
              <Globe className="w-3 h-3" />
              {lang === 'en' ? 'EN' : 'ML'}
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
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
