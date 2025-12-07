import React from 'react';
import { MapPin, Droplets, Camera, TrendingUp, Sprout } from 'lucide-react';
import { MOCK_FARMS } from '@/lib/data';
import { Card } from '@/components/ui/Card';

interface HomeViewProps {
  onNavigate: (view: string) => void;
  lang: string;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, lang }) => (
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
          className="relative h-32 bg-green-50 dark:bg-green-900/10 rounded-[2rem] p-5 flex flex-col justify-between items-start hover:bg-green-100 transition-colors group overflow-hidden cursor-pointer"
        >
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-green-200 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-10 h-10 bg-white dark:bg-[#22B550] rounded-full flex items-center justify-center shadow-sm z-10">
            <Camera className="text-[#22B550] dark:text-white w-5 h-5" />
          </div>
          <span className="font-bold text-[#2C3E50] dark:text-white z-10">Scan Crop</span>
        </button>

        <button
          onClick={() => onNavigate('crop_doctor')}
          className="relative h-32 bg-orange-50 dark:bg-orange-900/10 rounded-[2rem] p-5 flex flex-col justify-between items-start hover:bg-orange-100 transition-colors group overflow-hidden cursor-pointer"
        >
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-orange-200 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
           <div className="w-10 h-10 bg-white dark:bg-orange-500 rounded-full flex items-center justify-center shadow-sm z-10">
            <Sprout className="text-orange-500 dark:text-white w-5 h-5" />
          </div>
          <span className="font-bold text-[#2C3E50] dark:text-white z-10">Crop Doctor</span>
        </button>
      </div>
    </div>

    {/* Farms (Horizontal Scroll) */}
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold dark:text-white">Your Fields</h2>
        <button onClick={() => onNavigate('farms')} className="text-[#22B550] text-sm font-bold cursor-pointer">See All</button>
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
