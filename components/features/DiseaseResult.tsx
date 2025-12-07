import React from 'react';
import { ChevronLeft, Leaf, Sprout, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface DiseaseResultProps {
  result: any;
  image: string | null;
  onBack: () => void;
}

export const DiseaseResult: React.FC<DiseaseResultProps> = ({ result, image, onBack }) => {
  if (!result || !image) return null;
  const isHealthy = !result.disease_found;

  return (
    <div className="h-full overflow-y-auto bg-gray-50 dark:bg-[#121212]">
      {/* Hero Header */}
      <div className="relative h-80">
        <img src={image} className="w-full h-full object-cover" alt="Analyzed" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

        <button onClick={onBack} className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-colors cursor-pointer">
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
