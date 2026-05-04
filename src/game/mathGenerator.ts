export interface MathQuestion {
  id: string;
  question: string;
  answer: number;
  options: number[];
  difficulty: 'easy' | 'medium' | 'hard';
}

const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const generateWrongAnswers = (correctAnswer: number, count: number, range: [number, number]): number[] => {
  const wrongAnswers = new Set<number>();
  while (wrongAnswers.size < count) {
    const offset = Math.floor(Math.random() * 10) - 5;
    const wrong = correctAnswer + offset;
    if (wrong !== correctAnswer && wrong >= range[0] && wrong <= range[1]) {
      wrongAnswers.add(wrong);
    }
  }
  return Array.from(wrongAnswers);
};

export const generateEasyQuestion = (): MathQuestion => {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const isAddition = Math.random() > 0.5;

  let question: string;
  let answer: number;

  if (isAddition) {
    question = `${a} + ${b} = ?`;
    answer = a + b;
  } else {
    if (a < b) {
      question = `${b} - ${a} = ?`;
      answer = b - a;
    } else {
      question = `${a} - ${b} = ?`;
      answer = a - b;
    }
  }

  const wrongAnswers = generateWrongAnswers(answer, 3, [0, 20]);
  const options = shuffleArray([answer, ...wrongAnswers]);

  return {
    id: generateId(),
    question,
    answer,
    options,
    difficulty: 'easy',
  };
};

export const generateMediumQuestion = (): MathQuestion => {
  const a = Math.floor(Math.random() * 20) + 5;
  const b = Math.floor(Math.random() * 20) + 5;
  const operation = Math.random();

  let question: string;
  let answer: number;

  if (operation < 0.33) {
    question = `${a} + ${b} = ?`;
    answer = a + b;
  } else if (operation < 0.66) {
    if (a < b) {
      question = `${b} - ${a} = ?`;
      answer = b - a;
    } else {
      question = `${a} - ${b} = ?`;
      answer = a - b;
    }
  } else {
    const smallA = Math.floor(Math.random() * 10) + 2;
    const smallB = Math.floor(Math.random() * 10) + 2;
    question = `${smallA} × ${smallB} = ?`;
    answer = smallA * smallB;
  }

  const wrongAnswers = generateWrongAnswers(answer, 3, [0, 100]);
  const options = shuffleArray([answer, ...wrongAnswers]);

  return {
    id: generateId(),
    question,
    answer,
    options,
    difficulty: 'medium',
  };
};

export const generateHardQuestion = (): MathQuestion => {
  const operation = Math.random();

  let question: string;
  let answer: number;

  if (operation < 0.25) {
    const a = Math.floor(Math.random() * 50) + 10;
    const b = Math.floor(Math.random() * 50) + 10;
    question = `${a} + ${b} = ?`;
    answer = a + b;
  } else if (operation < 0.5) {
    const a = Math.floor(Math.random() * 30) + 10;
    const b = Math.floor(Math.random() * 20) + 5;
    question = `${a} - ${b} = ?`;
    answer = a - b;
  } else if (operation < 0.75) {
    const a = Math.floor(Math.random() * 12) + 2;
    const b = Math.floor(Math.random() * 12) + 2;
    question = `${a} × ${b} = ?`;
    answer = a * b;
  } else {
    const b = Math.floor(Math.random() * 10) + 2;
    const answerVal = Math.floor(Math.random() * 10) + 2;
    const a = b * answerVal;
    question = `${a} ÷ ${b} = ?`;
    answer = answerVal;
  }

  const wrongAnswers = generateWrongAnswers(answer, 3, [0, 200]);
  const options = shuffleArray([answer, ...wrongAnswers]);

  return {
    id: generateId(),
    question,
    answer,
    options,
    difficulty: 'hard',
  };
};

export const generateQuestion = (difficulty: 'easy' | 'medium' | 'hard' = 'easy'): MathQuestion => {
  switch (difficulty) {
    case 'easy':
      return generateEasyQuestion();
    case 'medium':
      return generateMediumQuestion();
    case 'hard':
      return generateHardQuestion();
    default:
      return generateEasyQuestion();
  }
};
