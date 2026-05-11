import React from 'react';
import { GardenSlot } from '../data/storage';
import { getPlantById, Plant } from '../data/plantsData';

interface GardenProps {
  slots: GardenSlot[];
  onSlotClick: (slotId: number) => void;
}

const getGrowthEmoji = (plant: Plant, growthStage: number): string => {
  if (growthStage <= 0) return '🟫';
  const stages = ['🌱', '🌿', plant.emoji, plant.emoji, plant.emoji];
  return stages[Math.min(growthStage - 1, stages.length - 1)];
};

export const Garden: React.FC<GardenProps> = ({ slots, onSlotClick }) => {
  return (
    <div className="bg-gradient-to-b from-garden-sky to-green-200 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
        🌱 我的花园
      </h2>
      
      <div className="grid grid-cols-4 gap-3">
        {slots.map((slot) => {
        const plant = slot.plantId ? getPlantById(slot.plantId) : null;
        const emoji = plant ? getGrowthEmoji(plant, slot.growthStage) : '🟫';
        
        return (
          <button
            key={slot.id}
            onClick={() => onSlotClick(slot.id)}
            className={`aspect-square rounded-xl flex items-center justify-center text-4xl
              ${plant ? 'bg-amber-100 hover:bg-amber-200' : 'bg-amber-50 hover:bg-amber-100'}
              transition-all hover:scale-105 active:scale-95 shadow-md`}
          >
            {emoji}
          </button>
        );
      })}
      </div>
    </div>
  );
};
