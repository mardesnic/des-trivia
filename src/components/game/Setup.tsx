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
  Checkbox,
  ListItemText,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import { Container } from '../layout/Container';
import { Loading } from '../shared/Loading';
import { Error } from '../shared/Error';
import { ALL_CATEGORIES, DIFICULTIES, NUMBER_OF_QUESTIONS } from '../../const';

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

const ButtonsWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
}));

export const Setup: React.FC<Props> = ({ onSubmit, settings }) => {
  const { data: categories = [], isFetching, isError } = useTriviaCategories();
  const sortedCategories = categories.sort(
    (a: TriviaCategory, b: TriviaCategory) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    }
  );
  const categoryOptions = [
    { id: ALL_CATEGORIES, value: ALL_CATEGORIES, name: ALL_CATEGORIES },
    ...sortedCategories,
  ];
  const difficultyOptions = Object.values(DIFICULTIES);
  const [difficulty, setDifficulty] = useState(settings.difficulty);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    settings.categories
  );
  const [amount, setAmount] = useState(settings.amount);

  const MAX_CATEGORIES = 3;

  const handleCategoryChange = (newValue: string[]) => {
    const hadAll = selectedCategories.includes(ALL_CATEGORIES);
    const hasAll = newValue.includes(ALL_CATEGORIES);

    if (newValue.length === 0) {
      setSelectedCategories([ALL_CATEGORIES]);
    } else if (hasAll && !hadAll) {
      setSelectedCategories([ALL_CATEGORIES]);
    } else if (hadAll && newValue.length > 1) {
      const specific = newValue.filter((v) => v !== ALL_CATEGORIES);
      setSelectedCategories(specific.slice(0, MAX_CATEGORIES));
    } else if (newValue.length > MAX_CATEGORIES) {
      setSelectedCategories(newValue.slice(0, MAX_CATEGORIES));
    } else {
      setSelectedCategories(newValue);
    }
  };

  const renderCategoryValue = (selected: string[]) => {
    if (selected.includes(ALL_CATEGORIES)) return ALL_CATEGORIES;
    return selected
      .map((id) => categoryOptions.find((c) => c.id === id)?.name ?? id)
      .join(', ');
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ difficulty, categories: selectedCategories, amount });
  };

  if (isFetching) return <Loading />;
  if (isError) return <Error />;

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
            {difficultyOptions.map((d: string) => (
              <MenuItem key={d} value={d}>
                {capitalize(d)}
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
            multiple
            value={selectedCategories}
            label='Category'
            onChange={(e) =>
              handleCategoryChange(e.target.value as string[])
            }
            renderValue={renderCategoryValue}
            fullWidth
          >
            {categoryOptions.map((cat) => {
              const isSelected = selectedCategories.includes(cat.id);
              const atLimit =
                !isSelected &&
                !selectedCategories.includes(ALL_CATEGORIES) &&
                selectedCategories.length >= MAX_CATEGORIES &&
                cat.id !== ALL_CATEGORIES;
              return (
                <MenuItem key={cat.id} value={cat.id} disabled={atLimit}>
                  <Checkbox
                    checked={isSelected}
                    color='secondary'
                  />
                  <ListItemText primary={cat.name} />
                </MenuItem>
              );
            })}
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
            {NUMBER_OF_QUESTIONS.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ButtonsWrapper>
          <SubmitButton variant='contained' color='primary' type='submit'>
            Start
          </SubmitButton>
        </ButtonsWrapper>
      </form>
    </Container>
  );
};
