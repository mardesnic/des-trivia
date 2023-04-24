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
  category: string;
}

export async function fetchTriviaQuestions({
  category,
  difficulty,
  amount,
}: TriviaApiParams): Promise<TriviaQuestion[]> {
  const { data } = await axios.get(QUESTIONS_API, {
    params: {
      amount,
      difficulty,
      type: 'multiple',
      category: category === ALL_CATEGORIES ? '' : category,
    },
  });

  return data.results;
}

export async function fetchTriviaCategories(): Promise<TriviaCategory[]> {
  const { data } = await axios.get(CATEGORIES_API);
  return data.trivia_categories;
}

export function useTriviaQuestions({
  category,
  difficulty,
  amount,
}: TriviaApiParams) {
  const categoriesQuery = useTriviaCategories();
  return useQuery<TriviaQuestion[]>(
    ['triviaQuestions', category, difficulty, amount],
    async () => fetchTriviaQuestions({ category, difficulty, amount }),
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
