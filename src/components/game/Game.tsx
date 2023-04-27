import React, { useEffect, useState } from 'react';
import { TriviaQuestion as TriviaQuestionType } from '../../services/triviaService';
import he from 'he';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  ListItemButton,
} from '@mui/material';
import { styled } from '@mui/system';
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
interface AnswerProps {
  selected: boolean;
  disabledAnswer: boolean;
}
const Answer = styled(ListItemButton)<AnswerProps>(
  ({ theme, selected, disabledAnswer }) => ({
    borderRadius: theme.shape.borderRadius,
    opacity: selected ? 1 : 0.3,
    pointerEvents: disabledAnswer ? 'none' : 'auto',
  })
);

export const Game: React.FC<Props> = ({ question, onAnswer, progress }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    const answers = [...question.incorrect_answers, question.correct_answer];
    answers.sort(() => Math.random() - 0.5);
    setShuffledAnswers(answers);
  }, [question]);

  useEffect(() => {
    if (selectedAnswer === null) {
      return;
    }

    const timeoutId = setTimeout(() => {
      onAnswer(selectedAnswer);
      setSelectedAnswer(null);
    }, 380);

    return () => clearTimeout(timeoutId);
  }, [selectedAnswer, onAnswer]);

  return (
    <Container>
      <Progress variant='determinate' value={progress} />
      <QuestionText variant='subtitle1'>
        {he.decode(question.question)}
      </QuestionText>
      <List>
        {shuffledAnswers.map((answer, index) => (
          <ListItem
            sx={{ paddingLeft: 0, paddingRight: 0 }}
            key={index}
            onClick={() => setSelectedAnswer(answer)}
          >
            <Answer
              disabledAnswer={selectedAnswer !== null}
              selected={selectedAnswer === answer || selectedAnswer === null}
            >
              <ListItemText primary={he.decode(answer)} />
            </Answer>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
