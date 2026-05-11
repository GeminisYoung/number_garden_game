import React, { useState } from 'react';
import { Garden } from './components/Garden';
import { MathQuiz } from './components/MathQuiz';
import { Shop } from './components/Shop';
import { useGarden } from './hooks/useGarden';

function App() {
  const {
    progress,
    isLoading,
    recordCorrectAnswer,
    recordWrongAnswer,
    plantInSlot,
    growPlant,
    removePlant,
    getAvailablePlants,
    getNextUnlockPlant,
  } = useGarden();

  const [showQuiz, setShowQuiz] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌱</div>
          <p className="text-xl text-gray-600">花园正在加载中...</p>
        </div>
      </div>
    );
  }

  if (!progress) return null;

  const availablePlants = getAvailablePlants();
  const nextPlant = getNextUnlockPlant();

  const handleSlotClick = (slotId: number) => {
    setSelectedSlotId(slotId);
    setShowShop(true);
  };

  const handleQuizCorrect = () => {
    recordCorrectAnswer();
  };

  const handleGrow = (slotId: number) => {
    setShowQuiz(true);
    setShowShop(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100">
      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <h1 className="text-3xl font-bold text-center text-green-700 mb-3">
            🌱 数字花园
          </h1>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-green-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-green-600">
                ✅ {progress.totalCorrect}
              </div>
              <div className="text-xs text-gray-600">答对</div>
            </div>
            <div className="bg-red-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-red-600">
                ❌ {progress.totalWrong}
              </div>
              <div className="text-xs text-gray-600">答错</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-purple-600">
                🌿 {progress.unlockedPlants.length}
              </div>
              <div className="text-xs text-gray-600">解锁植物</div>
            </div>
          </div>

          {/* Next Unlock */}
          {nextPlant && (
            <div className="mt-3 bg-yellow-50 rounded-xl p-3 text-center">
              <p className="text-sm text-yellow-800">
                再答对 {nextPlant.unlockCondition.correctAnswers - progress.totalCorrect} 题解锁：
                <span className="ml-2 text-2xl">{nextPlant.emoji}</span>
                <span className="ml-1 font-bold">{nextPlant.name}</span>
              </p>
            </div>
          )}
        </div>

        {/* Garden */}
        <Garden
          slots={progress.garden}
          onSlotClick={handleSlotClick}
        />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowQuiz(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            🧮 做数学题
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-gray-400 to-gray-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            🔄 刷新花园
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <h3 className="font-bold text-gray-800 mb-2">📖 游戏说明</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 点击花园的空位选择植物种植</li>
            <li>• 做数学题答对可以解锁新植物</li>
            <li>• 点击已种植的植物可以施肥生长</li>
            <li>• 收集所有植物，建造美丽的花园！</li>
          </ul>
        </div>
      </div>

      {/* Modals */}
      {showQuiz && (
        <MathQuiz
          onCorrect={handleQuizCorrect}
          onWrong={recordWrongAnswer}
          onClose={() => setShowQuiz(false)}
        />
      )}

      {showShop && (
        <Shop
          availablePlants={availablePlants}
          gardenSlots={progress.garden}
          onPlant={plantInSlot}
          onGrow={handleGrow}
          onRemove={removePlant}
          onClose={() => {
            setShowShop(false);
            setSelectedSlotId(null);
          }}
          selectedSlotId={selectedSlotId}
        />
      )}
    </div>
  );
}

export default App;
