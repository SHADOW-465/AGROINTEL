import React from 'react';
import { Sprout, Settings } from 'lucide-react';
import { MOCK_FARMS } from '@/lib/data';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const FarmsView = () => (
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
               <img src={farm.image} className="w-full h-full object-cover" alt={farm.name} />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
             </div>
             <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg dark:text-white">{farm.name}</h3>
                    <button className="text-gray-300 hover:text-gray-500 cursor-pointer"><Settings className="w-4 h-4"/></button>
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
