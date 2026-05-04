import { openDB, DBSchema } from 'idb';
import { Plant } from './plantsData';

export interface GardenSlot {
  id: number;
  plantId: string | null;
  growthStage: number;
}

export interface UserProgress {
  totalCorrect: number;
  totalWrong: number;
  unlockedPlants: string[];
  garden: GardenSlot[];
}

interface GardenDB extends DBSchema {
  progress: {
    key: string;
    value: UserProgress;
  };
}

const DB_NAME = 'digital-garden-db';
const STORE_NAME = 'progress';

const initDB = async () => {
  return openDB<GardenDB>(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

const getInitialProgress = (): UserProgress => {
  const gardenSlots: GardenSlot[] = [];
  for (let i = 0; i < 12; i++) {
    gardenSlots.push({
      id: i,
      plantId: null,
      growthStage: 0,
    });
  }

  return {
    totalCorrect: 0,
    totalWrong: 0,
    unlockedPlants: ['sunflower'],
    garden: gardenSlots,
  };
};

export const saveProgress = async (progress: UserProgress): Promise<void> => {
  const db = await initDB();
  await db.put(STORE_NAME, progress, 'user-progress');
};

export const loadProgress = async (): Promise<UserProgress> => {
  const db = await initDB();
  const progress = await db.get(STORE_NAME, 'user-progress');
  return progress || getInitialProgress();
};

export const resetProgress = async (): Promise<UserProgress> => {
  const initial = getInitialProgress();
  await saveProgress(initial);
  return initial;
};
