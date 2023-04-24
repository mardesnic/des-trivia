import React from 'react';
import { TriviaApiParams, TriviaQuestion } from '../../services/triviaService';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button as MuiButton,
} from '@mui/material';
import { Container } from '../layout/Container';
import he from 'he';
import { styled } from '@mui/system';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

type Props = {
  questions: TriviaQuestion[];
  incorrectAnswerIndexes: number[];
  onRestart: () => void;
  onChangeSettings: () => void;
  settings: TriviaApiParams;
};

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const QuestionList = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const SetupButton = styled(MuiButton)(({ theme }) => ({
  color: theme.palette.secondary.light,
  marginTop: theme.spacing(2),
  marginRight: theme.spacing(1),
}));

const RestartButton = styled(MuiButton)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginRight: theme.spacing(1),
}));

export const Results: React.FC<Props> = ({
  questions,
  incorrectAnswerIndexes,
  onRestart,
  settings,
  onChangeSettings,
}) => {
  const { width, height } = useWindowSize();
  const numQuestions = Number(settings.amount);
  const numCorrectAnswers = numQuestions - incorrectAnswerIndexes.length;
  const percentageCorrect = Math.round(
    (numCorrectAnswers / numQuestions) * 100
  );

  const getEndGameMessage = (
    numCorrectAnswers: number,
    numQuestions: number
  ) => {
    if (numCorrectAnswers === numQuestions) {
      return '🏆 Perfect score! Well done!';
    }
    if (numCorrectAnswers >= numQuestions * 0.9) {
      return '🌟 Excellent! You really know your stuff!';
    }
    if (numCorrectAnswers >= numQuestions * 0.7) {
      return '👍 Great job! You have a good general knowledge!';
    }
    if (numCorrectAnswers >= numQuestions * 0.5) {
      return '😊 Not bad, but you can do better!';
    }
    return '🍀 Better luck next time!';
  };

  const message = getEndGameMessage(numCorrectAnswers, numQuestions);

  return (
    <>
      {incorrectAnswerIndexes.length === 0 && (
        <Confetti width={width} height={height} />
      )}
      <Container>
        <Title variant='h6'>{message}</Title>
        <Typography>
          You got {numCorrectAnswers} out of {numQuestions} questions correct (
          {percentageCorrect}%).
        </Typography>
        {incorrectAnswerIndexes.length > 0 && (
          <QuestionList>
            <Typography>
              Here are the questions you missed, along with the correct answers:
            </Typography>
            <List>
              {incorrectAnswerIndexes.map((i) => (
                <ListItem key={`q-${i}`}>
                  <ListItemText
                    primary={he.decode(questions[i].question)}
                    secondary={`Correct answer: ${he.decode(
                      questions[i].correct_answer
                    )}`}
                  />
                </ListItem>
              ))}
            </List>
          </QuestionList>
        )}
        <Typography>
          Ready for another round? Click the button below to try again!
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SetupButton variant='text' onClick={onChangeSettings}>
            Change settings
          </SetupButton>
          <RestartButton variant='contained' onClick={onRestart}>
            Restart
          </RestartButton>
        </Box>
      </Container>
    </>
  );
};
