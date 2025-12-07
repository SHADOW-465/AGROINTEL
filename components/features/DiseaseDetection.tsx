import React, { useState, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Loader2, ChevronLeft, Sun, Camera, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DiseaseDetectionProps {
  onResult: (result: any, image: string) => void;
  goBack: () => void;
}

export const DiseaseDetection: React.FC<DiseaseDetectionProps> = ({ onResult, goBack }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API Key not found");
      }
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
      setError("Unable to analyze. Please check connection or API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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
             <button onClick={() => setImage(null)} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white cursor-pointer">
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
        <button onClick={goBack} className="p-3 bg-white dark:bg-[#2D2D2D] rounded-full shadow-sm hover:scale-105 transition-transform cursor-pointer">
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
             className="relative w-full h-full bg-white dark:bg-[#2D2D2D] rounded-[2rem] shadow-xl flex flex-col items-center justify-center border-2 border-dashed border-green-200 hover:border-[#22B550] hover:scale-105 transition-all group cursor-pointer"
           >
             <div className="w-20 h-20 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#22B550] transition-colors">
               <Camera className="w-8 h-8 text-[#22B550] group-hover:text-white transition-colors" />
             </div>
             <span className="font-bold text-lg dark:text-white">Tap to Scan</span>
             <span className="text-sm text-gray-400 mt-1">or select from gallery</span>
           </button>
        </div>

        {error && (
            <div className="mb-4 text-red-500 text-center text-sm">{error}</div>
        )}

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
