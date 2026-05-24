import axios from 'axios';
import { useQuery } from 'react-query';
import { ALL_CATEGORIES } from '../const';

const CATEGORIES_API = 'https://opentdb.com/api_category.php';
const QUESTIONS_API = 'https://opentdb.com/api.php';

export interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface TriviaCategory {
  id: string;
  name: string;
}

export interface TriviaApiParams {
  amount: string;
  difficulty: string;
  categories: string[];
}

async function fetchForCategory(
  category: string,
  amount: number,
  difficulty: string
): Promise<TriviaQuestion[]> {
  const { data } = await axios.get(QUESTIONS_API, {
    params: {
      amount,
      difficulty,
      type: 'multiple',
      category: category === ALL_CATEGORIES ? undefined : category,
    },
  });
  return data.results;
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function fetchTriviaQuestions({
  categories,
  difficulty,
  amount,
}: TriviaApiParams): Promise<TriviaQuestion[]> {
  const numAmount = Number(amount);

  if (categories.includes(ALL_CATEGORIES) || categories.length === 0) {
    return fetchForCategory(ALL_CATEGORIES, numAmount, difficulty);
  }

  if (categories.length === 1) {
    return fetchForCategory(categories[0], numAmount, difficulty);
  }

  const perCategory = Math.ceil(numAmount / categories.length);
  const results = await Promise.all(
    categories.map((cat) => fetchForCategory(cat, perCategory, difficulty))
  );

  return shuffle(results.flat()).slice(0, numAmount);
}

export async function fetchTriviaCategories(): Promise<TriviaCategory[]> {
  const { data } = await axios.get(CATEGORIES_API);
  return data.trivia_categories;
}

export function useTriviaQuestions({
  categories,
  difficulty,
  amount,
}: TriviaApiParams) {
  const categoriesQuery = useTriviaCategories();
  return useQuery<TriviaQuestion[]>(
    ['triviaQuestions', [...categories].sort().join(','), difficulty, amount],
    async () => fetchTriviaQuestions({ categories, difficulty, amount }),
    {
      enabled: categoriesQuery.isSuccess,
    }
  );
}

export function useTriviaCategories() {
  return useQuery<TriviaCategory[]>(['triviaCategories'], async () =>
    fetchTriviaCategories()
  );
}
