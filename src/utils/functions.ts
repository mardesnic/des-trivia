import {
  DIFICULTIES,
  FIXED_MESSAGES,
  AVERAGE_SCORE_MESSAGES,
  EXCELLENT_SCORE_MESSAGES,
  GOOD_SCORE_MESSAGES,
  LOW_SCORE_MESSAGES,
  PERFECT_SCORE_MESSAGES,
} from '../const';

export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error saving state to localStorage', error);
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return defaultValue;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error('Error loading state from localStorage', error);
    return defaultValue;
  }
}

export const getEndGameMessage = (
  numCorrectAnswers: number,
  numQuestions: number,
  difficulty: string
) => {
  const percentageCorrect = numCorrectAnswers / numQuestions;

  const randomMessage = (messages: string[]) =>
    messages[Math.floor(Math.random() * messages.length)];

  if (percentageCorrect === 1) {
    if (difficulty === DIFICULTIES.HARD && numQuestions === 50) {
      return (
        randomMessage(PERFECT_SCORE_MESSAGES) +
        FIXED_MESSAGES.PERFECT_HARDEST_MESSAGE
      );
    }
    return randomMessage(PERFECT_SCORE_MESSAGES);
  }

  if (percentageCorrect >= 0.9) {
    if (difficulty === DIFICULTIES.HARD && numQuestions >= 25) {
      return (
        randomMessage(EXCELLENT_SCORE_MESSAGES) +
        FIXED_MESSAGES.EXCELENT_HARD_MESSAGE
      );
    }
    return randomMessage(EXCELLENT_SCORE_MESSAGES);
  }

  if (percentageCorrect >= 0.7) {
    if (difficulty === DIFICULTIES.MEDIUM && numQuestions >= 10) {
      return (
        randomMessage(GOOD_SCORE_MESSAGES) + FIXED_MESSAGES.GOOD_MEDIUM_MESSAGE
      );
    }
    return randomMessage(GOOD_SCORE_MESSAGES);
  }

  if (percentageCorrect >= 0.5) {
    if (difficulty === DIFICULTIES.EASY && numQuestions >= 5) {
      return (
        randomMessage(AVERAGE_SCORE_MESSAGES) +
        FIXED_MESSAGES.AVERAGE_EASY_MESSAGE
      );
    }
    return randomMessage(AVERAGE_SCORE_MESSAGES);
  }

  return randomMessage(LOW_SCORE_MESSAGES);
};
