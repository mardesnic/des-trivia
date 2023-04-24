import { useState } from 'react';
import {
  TriviaApiParams,
  TriviaCategory,
  useTriviaCategories,
} from '../../services/triviaService';
import {
  FormControl,
  Button,
  InputLabel,
  MenuItem,
  Select,
  capitalize,
} from '@mui/material';
import { styled } from '@mui/system';
import { Container } from '../layout/Container';
import { Loading } from '../shared/Loading';
import { Error } from '../shared/Error';
import { ALL_CATEGORIES, DIFICULTIES } from '../../const';

type Props = {
  onSubmit: (values: TriviaApiParams) => void;
  settings: TriviaApiParams;
};

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Label = styled(InputLabel)(() => ({
  '&.Mui-focused': {
    color: 'inherit',
  },
}));

export const Setup: React.FC<Props> = ({ onSubmit, settings }) => {
  const { data: categories = [], isFetching, isError } = useTriviaCategories();
  const sortedCategories = categories.sort(
    (a: TriviaCategory, b: TriviaCategory) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }
  );
  const categorieOptions = [
    { id: ALL_CATEGORIES, value: ALL_CATEGORIES, name: ALL_CATEGORIES },
    ...sortedCategories,
  ];
  const dificultyOptions = Object.values(DIFICULTIES);
  const [difficulty, setDifficulty] = useState(settings.difficulty);
  const [category, setCategory] = useState(settings.category);
  const [amount, setAmount] = useState(settings.amount);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = { difficulty, category, amount };
    onSubmit(values);
  };

  if (isFetching) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <Container>
      <form onSubmit={handleFormSubmit}>
        <FormControl fullWidth margin='normal'>
          <Label id='difficulty-label'>Difficulty</Label>
          <Select
            labelId='difficulty-label'
            id='difficulty'
            name='difficulty'
            label='Difficulty'
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            fullWidth
          >
            {dificultyOptions.map((dificulty: string) => (
              <MenuItem key={dificulty} value={dificulty}>
                {capitalize(dificulty)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin='normal'>
          <Label id='category-label'>Category</Label>
          <Select
            labelId='category-label'
            id='category'
            name='category'
            value={category}
            label='Category'
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          >
            {categorieOptions.map((category: TriviaCategory) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin='normal'>
          <Label id='amount-label'>Number of Questions</Label>
          <Select
            labelId='amount-label'
            id='amount'
            name='amount'
            label='Number of Questions'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
          >
            {[1, 5, 10].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <SubmitButton variant='contained' color='primary' type='submit'>
          Start Trivia
        </SubmitButton>
      </form>
    </Container>
  );
};
