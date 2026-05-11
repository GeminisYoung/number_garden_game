import React from 'react';
import { Plant, getPlantById } from '../data/plantsData';
import { GardenSlot } from '../data/storage';

interface ShopProps {
  availablePlants: Plant[];
  gardenSlots: GardenSlot[];
  onPlant: (slotId: number, plantId: string) => void;
  onGrow: (slotId: number) => void;
  onRemove: (slotId: number) => void;
  onClose: () => void;
  selectedSlotId: number | null;
}

export const Shop: React.FC<ShopProps> = ({
  availablePlants,
  gardenSlots,
  onPlant,
  onGrow,
  onRemove,
  onClose,
  selectedSlotId,
}) => {
  const selectedSlot = selectedSlotId !== null 
    ? gardenSlots.find(s => s.id === selectedSlotId) 
    : null;

  const selectedPlant = selectedSlot?.plantId 
    ? getPlantById(selectedSlot.plantId) 
    : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              {selectedSlot?.plantId ? '🌿 植物管理' : '🏪 植物商店'}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {selectedSlot && selectedPlant ? (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-6xl mb-2">{selectedPlant.emoji}</div>
                <h3 className="text-xl font-bold text-gray-800">{selectedPlant.name}</h3>
                <p className="text-gray-600">{selectedPlant.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  生长阶段: {selectedSlot.growthStage} / {selectedPlant.growthStages}
                </p>
              </div>

              <div className="space-y-2">
                {selectedSlot.growthStage < selectedPlant.growthStages && (
                  <button
                    onClick={() => {
                      onGrow(selectedSlot.id);
                      onClose();
                    }}
                    className="w-full py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors"
                  >
                    🌱 施肥生长（需要答对数学题）
                  </button>
                )}
                <button
                  onClick={() => {
                    onRemove(selectedSlot.id);
                    onClose();
                  }}
                  className="w-full py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors"
                >
                  🗑️ 移除植物
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">选择一株植物种在花园里：</p>
              <div className="grid grid-cols-2 gap-3">
                {availablePlants.map((plant) => (
                  <button
                    key={plant.id}
                    onClick={() => {
                      if (selectedSlotId !== null) {
                        onPlant(selectedSlotId, plant.id);
                      }
                      onClose();
                    }}
                    className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-left"
                  >
                    <div className="text-4xl mb-2">{plant.emoji}</div>
                    <h3 className="font-bold text-gray-800">{plant.name}</h3>
                    <p className="text-xs text-gray-600">{plant.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
