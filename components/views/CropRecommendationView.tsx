import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Sprout, Droplets, MapPin, Loader2, ChevronLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface CropRecommendationViewProps {
  onBack: () => void;
}

export const CropRecommendationView: React.FC<CropRecommendationViewProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    rainfall: '',
    location: ''
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getRecommendation = async () => {
    setLoading(true);
    setResult(null);
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key not found");

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-preview-09-2025",
        generationConfig: { responseMimeType: "application/json" }
      });

      const prompt = `
        You are an expert agronomist. Based on the following soil and environmental data, recommend the best crop to grow.
        Data:
        - Nitrogen: ${formData.nitrogen}
        - Phosphorus: ${formData.phosphorus}
        - Potassium: ${formData.potassium}
        - pH Level: ${formData.ph}
        - Rainfall: ${formData.rainfall} mm
        - Location: ${formData.location}

        Return a JSON object:
        {
          "recommended_crop": "string",
          "confidence": number,
          "reasoning": "string",
          "farming_tips": ["string", "string", "string"]
        }
      `;

      const result = await model.generateContent(prompt);
      const data = JSON.parse(await result.response.text());
      setResult(data);

    } catch (error) {
      console.error("Recommendation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in bg-gray-50 dark:bg-[#121212]">
        <Loader2 className="w-10 h-10 text-[#22B550] animate-spin mb-4" />
        <h2 className="text-xl font-bold dark:text-white">Analyzing Soil Data...</h2>
        <p className="text-gray-500 text-sm mt-2">Finding the perfect crop for your conditions.</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="p-6 pb-28 animate-in slide-in-from-right bg-gray-50 dark:bg-[#121212] min-h-full">
         <button onClick={() => setResult(null)} className="mb-6 flex items-center text-gray-500 hover:text-[#22B550] cursor-pointer">
            <ChevronLeft className="w-5 h-5 mr-1" /> Back
         </button>

         <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/20">
               <Sprout className="w-10 h-10 text-[#22B550]" />
            </div>
            <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Recommended Crop</p>
            <h1 className="text-4xl font-bold text-[#2C3E50] dark:text-white mt-2">{result.recommended_crop}</h1>
            <span className="inline-block mt-3 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
               {result.confidence}% Match
            </span>
         </div>

         <Card className="mb-6">
            <h3 className="font-bold text-lg mb-3 dark:text-white">Why this crop?</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{result.reasoning}</p>
         </Card>

         <div className="space-y-3">
            <h3 className="font-bold text-lg dark:text-white px-1">Farming Tips</h3>
            {result.farming_tips.map((tip: string, i: number) => (
               <div key={i} className="flex gap-3 bg-white dark:bg-[#1E1E1E] p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-green-50 dark:bg-green-900/20 text-[#22B550] flex items-center justify-center font-bold text-xs shrink-0">
                     {i+1}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{tip}</p>
               </div>
            ))}
         </div>

         <div className="mt-8">
            <Button onClick={onBack} variant="secondary" className="w-full">Back to Home</Button>
         </div>
      </div>
    );
  }

  return (
    <div className="p-6 pb-28 animate-in slide-in-from-right bg-gray-50 dark:bg-[#121212] min-h-full">
      <div className="flex items-center mb-6">
         <button onClick={onBack} className="mr-3 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer">
            <ChevronLeft className="w-5 h-5 dark:text-white" />
         </button>
         <h1 className="text-2xl font-bold dark:text-white">Crop Doctor</h1>
      </div>

      <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
        Enter your soil and environmental details to get AI-powered crop recommendations.
      </p>

      <div className="space-y-4">
         <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500 ml-1">Nitrogen (N)</label>
               <input
                  name="nitrogen" type="number" placeholder="Example: 90"
                  className="w-full p-4 rounded-xl bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 focus:ring-2 focus:ring-[#22B550] outline-none dark:text-white"
                  onChange={handleChange}
               />
            </div>
            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500 ml-1">Phosphorus (P)</label>
               <input
                  name="phosphorus" type="number" placeholder="Example: 42"
                  className="w-full p-4 rounded-xl bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 focus:ring-2 focus:ring-[#22B550] outline-none dark:text-white"
                  onChange={handleChange}
               />
            </div>
         </div>

         <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500 ml-1">Potassium (K)</label>
               <input
                  name="potassium" type="number" placeholder="Example: 43"
                  className="w-full p-4 rounded-xl bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 focus:ring-2 focus:ring-[#22B550] outline-none dark:text-white"
                  onChange={handleChange}
               />
            </div>
            <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500 ml-1">pH Level</label>
               <input
                  name="ph" type="number" step="0.1" placeholder="Example: 6.5"
                  className="w-full p-4 rounded-xl bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 focus:ring-2 focus:ring-[#22B550] outline-none dark:text-white"
                  onChange={handleChange}
               />
            </div>
         </div>

         <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1">Rainfall (mm)</label>
            <div className="relative">
               <Droplets className="absolute left-4 top-4 w-5 h-5 text-blue-400" />
               <input
                  name="rainfall" type="number" placeholder="Annual rainfall in mm"
                  className="w-full p-4 pl-12 rounded-xl bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 focus:ring-2 focus:ring-[#22B550] outline-none dark:text-white"
                  onChange={handleChange}
               />
            </div>
         </div>

         <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1">Location / Region</label>
            <div className="relative">
               <MapPin className="absolute left-4 top-4 w-5 h-5 text-red-400" />
               <input
                  name="location" type="text" placeholder="e.g. Kerala, Wayanad"
                  className="w-full p-4 pl-12 rounded-xl bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-gray-800 focus:ring-2 focus:ring-[#22B550] outline-none dark:text-white"
                  onChange={handleChange}
               />
            </div>
         </div>
      </div>

      <div className="mt-8">
         <Button onClick={getRecommendation} className="w-full" icon={ArrowRight}>Get Recommendation</Button>
      </div>
    </div>
  );
};
