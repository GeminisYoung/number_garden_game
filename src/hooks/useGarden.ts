import { useState, useEffect, useCallback } from 'react';
import { UserProgress, GardenSlot, loadProgress, saveProgress } from '../data/storage';
import { getPlantById, getUnlockedPlants, Plant } from '../data/plantsData';

export const useGarden = () => {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const savedProgress = await loadProgress();
      setProgress(savedProgress);
      setIsLoading(false);
    };
    init();
  }, []);

  const updateProgress = useCallback(async (newProgress: UserProgress) => {
    setProgress(newProgress);
    await saveProgress(newProgress);
  }, []);

  const recordCorrectAnswer = useCallback(async () => {
    if (!progress) return;

    const newCorrect = progress.totalCorrect + 1;
    const unlockedPlants = getUnlockedPlants(newCorrect).map(p => p.id);

    const newProgress: UserProgress = {
      ...progress,
      totalCorrect: newCorrect,
      unlockedPlants: [...new Set([...progress.unlockedPlants, ...unlockedPlants])],
    };

    await updateProgress(newProgress);
  }, [progress, updateProgress]);

  const recordWrongAnswer = useCallback(async () => {
    if (!progress) return;

    const newProgress: UserProgress = {
      ...progress,
      totalWrong: progress.totalWrong + 1,
    };

    await updateProgress(newProgress);
  }, [progress, updateProgress]);

  const plantInSlot = useCallback(async (slotId: number, plantId: string) => {
    if (!progress) return;

    const plant = getPlantById(plantId);
    if (!plant) return;

    const newGarden = progress.garden.map(slot => {
      if (slot.id === slotId && slot.plantId === null) {
        return { ...slot, plantId, growthStage: 1 };
      }
      return slot;
    });

    const newProgress: UserProgress = {
      ...progress,
      garden: newGarden,
    };

    await updateProgress(newProgress);
  }, [progress, updateProgress]);

  const growPlant = useCallback(async (slotId: number) => {
    if (!progress) return;

    const slot = progress.garden.find(s => s.id === slotId);
    if (!slot || !slot.plantId) return;

    const plant = getPlantById(slot.plantId);
    if (!plant) return;

    if (slot.growthStage >= plant.growthStages) return;

    const newGarden = progress.garden.map(s => {
      if (s.id === slotId) {
        return { ...s, growthStage: s.growthStage + 1 };
      }
      return s;
    });

    const newProgress: UserProgress = {
      ...progress,
      garden: newGarden,
    };

    await updateProgress(newProgress);
  }, [progress, updateProgress]);

  const removePlant = useCallback(async (slotId: number) => {
    if (!progress) return;

    const newGarden = progress.garden.map(slot => {
      if (slot.id === slotId) {
        return { ...slot, plantId: null, growthStage: 0 };
      }
      return slot;
    });

    const newProgress: UserProgress = {
      ...progress,
      garden: newGarden,
    };

    await updateProgress(newProgress);
  }, [progress, updateProgress]);

  const getAvailablePlants = useCallback((): Plant[] => {
    if (!progress) return [];
    return progress.unlockedPlants
      .map(id => getPlantById(id))
      .filter((p): p is Plant => p !== undefined);
  }, [progress]);

  const getNextUnlockPlant = useCallback((): Plant | null => {
    if (!progress) return null;
    const allPlants = getUnlockedPlants(progress.totalCorrect + 1);
    const currentUnlocked = new Set(progress.unlockedPlants);
    const nextPlant = allPlants.find(p => !currentUnlocked.has(p.id));
    return nextPlant || null;
  }, [progress]);

  return {
    progress,
    isLoading,
    recordCorrectAnswer,
    recordWrongAnswer,
    plantInSlot,
    growPlant,
    removePlant,
    getAvailablePlants,
    getNextUnlockPlant,
  };
};
