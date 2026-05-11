export interface Plant {
  id: string;
  name: string;
  emoji: string;
  growthStages: number;
  unlockCondition: {
    difficulty: 'easy' | 'medium' | 'hard';
    correctAnswers: number;
  };
  description: string;
}

export const PLANTS_DATA: Plant[] = [
  {
    id: 'sunflower',
    name: '向日葵',
    emoji: '🌻',
    growthStages: 3,
    unlockCondition: {
      difficulty: 'easy',
      correctAnswers: 0,
    },
    description: '你的第一朵花！阳光明媚，永远朝向太阳。',
  },
  {
    id: 'tulip',
    name: '郁金香',
    emoji: '🌷',
    growthStages: 3,
    unlockCondition: {
      difficulty: 'easy',
      correctAnswers: 3,
    },
    description: '优雅的郁金香，春天的使者。',
  },
  {
    id: 'rose',
    name: '玫瑰',
    emoji: '🌹',
    growthStages: 4,
    unlockCondition: {
      difficulty: 'medium',
      correctAnswers: 8,
    },
    description: '美丽的红玫瑰，需要更多的爱与关怀。',
  },
  {
    id: 'cherry',
    name: '樱花',
    emoji: '🌸',
    growthStages: 4,
    unlockCondition: {
      difficulty: 'medium',
      correctAnswers: 15,
    },
    description: '浪漫的樱花，随风飘落的美丽。',
  },
  {
    id: 'cactus',
    name: '仙人掌',
    emoji: '🌵',
    growthStages: 3,
    unlockCondition: {
      difficulty: 'hard',
      correctAnswers: 25,
    },
    description: '坚强的仙人掌，即使在沙漠中也能生长！',
  },
  {
    id: 'tree',
    name: '大树',
    emoji: '🌳',
    growthStages: 5,
    unlockCondition: {
      difficulty: 'hard',
      correctAnswers: 40,
    },
    description: '参天大树，花园的守护者！',
  },
];

export const getPlantById = (id: string): Plant | undefined => {
  return PLANTS_DATA.find(plant => plant.id === id);
};

export const getUnlockedPlants = (totalCorrect: number): Plant[] => {
  return PLANTS_DATA.filter(plant => totalCorrect >= plant.unlockCondition.correctAnswers);
};
