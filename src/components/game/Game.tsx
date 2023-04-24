import React from 'react';
import { TriviaQuestion as TriviaQuestionType } from '../../services/triviaService';
import he from 'he';
import {
  Typography,
  List,
  ListItem as MuiListItem,
  ListItemText,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { Container } from '../layout/Container';

interface Props {
  question: TriviaQuestionType;
  onAnswer: (answer: string) => void;
  progress: number;
}

const Progress = styled(LinearProgress)(() => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
}));

const QuestionText = styled(Typography)(() => ({
  minHeight: 48,
}));

const ListItem = styled(MuiListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    cursor: 'pointer',
  },
}));

export const Game: React.FC<Props> = ({ question, onAnswer, progress }) => {
  const answers = [...question.incorrect_answers, question.correct_answer].sort(
    () => Math.random() - 0.5
  );
  const theme = useTheme();

  return (
    <Container>
      <Progress variant='determinate' value={progress} />
      <QuestionText>{he.decode(question.question)}</QuestionText>
      <List>
        {answers.map((answer, index) => (
          <ListItem key={index} theme={theme} onClick={() => onAnswer(answer)}>
            <ListItemText primary={he.decode(answer)} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
