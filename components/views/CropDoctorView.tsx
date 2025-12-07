import React, { useState } from 'react';
import { Sprout, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const CropDoctorView: React.FC = () => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    rainfall: '',
    city: 'Thrissur'
  });
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRecommendation(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) throw new Error('API Key not found');

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-09-2025' });

      const prompt = `
        As an agricultural expert, recommend the best crop to grow in ${formData.city}, Kerala based on these soil conditions:
        - Nitrogen: ${formData.nitrogen}
        - Phosphorus: ${formData.phosphorus}
        - Potassium: ${formData.potassium}
        - pH Level: ${formData.ph}
        - Annual Rainfall: ${formData.rainfall} mm

        Please provide the recommendation in the following JSON format (do not use markdown code blocks, just raw json):
        {
          "crop": "Name of the Crop",
          "reason": "Why this crop is suitable",
          "tips": ["Tip 1", "Tip 2"]
        }
      `;

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      });
      const response = await result.response;
      let text = response.text();

      // Basic cleanup if the model wraps in code blocks
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();

      setRecommendation(text);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
      setRecommendation(JSON.stringify({
        crop: "Error",
        reason: "Could not fetch recommendation. Please try again.",
        tips: []
      }));
    } finally {
      setLoading(false);
    }
  };

  const parsedRecommendation = recommendation ? (() => {
      try {
          return JSON.parse(recommendation);
      } catch (e) {
          return null;
      }
  })() : null;


  return (
    <div className="p-6 space-y-6 pb-28 animate-in fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-green-100 rounded-full">
           <Sprout className="w-6 h-6 text-[#22B550]" />
        </div>
        <div>
           <h1 className="text-2xl font-bold text-[#2C3E50] dark:text-white">Crop Doctor</h1>
           <p className="text-sm text-gray-500">Get AI-powered crop recommendations</p>
        </div>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Nitrogen (N)</label>
                <Input name="nitrogen" type="number" placeholder="e.g. 50" value={formData.nitrogen} onChange={handleChange} required />
             </div>
             <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Phosphorus (P)</label>
                <Input name="phosphorus" type="number" placeholder="e.g. 50" value={formData.phosphorus} onChange={handleChange} required />
             </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Potassium (K)</label>
                <Input name="potassium" type="number" placeholder="e.g. 50" value={formData.potassium} onChange={handleChange} required />
             </div>
             <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">pH Level</label>
                <Input name="ph" type="number" step="0.1" placeholder="e.g. 6.5" value={formData.ph} onChange={handleChange} required />
             </div>
          </div>
          <div className="space-y-2">
             <label className="text-xs font-bold text-gray-500 uppercase">Rainfall (mm)</label>
             <Input name="rainfall" type="number" placeholder="e.g. 200" value={formData.rainfall} onChange={handleChange} required />
          </div>

          <Button type="submit" className="w-full bg-[#22B550] hover:bg-[#1e9e46] text-white font-bold h-12" disabled={loading}>
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing Soil...</> : 'Get Recommendation'}
          </Button>
        </form>
      </Card>

      {parsedRecommendation && (
        <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
           <Card className="p-6 border-l-4 border-l-[#22B550] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
              <div className="relative z-10">
                 <h2 className="text-lg font-bold text-[#22B550] mb-1">Recommended Crop</h2>
                 <h3 className="text-3xl font-black text-[#2C3E50] dark:text-white mb-4">{parsedRecommendation.crop}</h3>

                 <div className="space-y-3">
                    <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl">
                       <p className="text-sm text-gray-700 dark:text-gray-300 italic">"{parsedRecommendation.reason}"</p>
                    </div>

                    <div>
                       <h4 className="font-bold text-gray-500 text-xs uppercase mb-2">Success Tips</h4>
                       <ul className="space-y-2">
                          {parsedRecommendation.tips?.map((tip: string, i: number) => (
                             <li key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-[#22B550] mt-0.5 shrink-0" />
                                <span className="text-gray-600 dark:text-gray-300">{tip}</span>
                             </li>
                          ))}
                       </ul>
                    </div>
                 </div>
              </div>
           </Card>
        </div>
      )}
    </div>
  );
};
