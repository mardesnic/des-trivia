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
import { getEndGameMessage } from '../../utils/functions';

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

const FailWrapper = styled(Box)(({ theme }) => ({
  maxHeight: '35vh',
  overflowY: 'auto',
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.primary.dark,
}));

const ButtonsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(4),
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

  const message = getEndGameMessage(
    numCorrectAnswers,
    numQuestions,
    settings.difficulty
  );

  return (
    <>
      {incorrectAnswerIndexes.length === 0 && (
        <Confetti width={width} height={height} gravity={0.05} />
      )}
      <Container>
        <Title variant='subtitle1'>{message}</Title>
        <Typography>
          You got {numCorrectAnswers} out of {numQuestions} questions correct (
          {percentageCorrect}%) on {settings.difficulty} difficulty.
        </Typography>
        {incorrectAnswerIndexes.length > 0 && (
          <QuestionList>
            <Typography>
              Here are the questions you missed, along with the correct answers:
            </Typography>
            <FailWrapper>
              <List>
                {incorrectAnswerIndexes.map((i) => (
                  <ListItem key={`q-${i}`}>
                    <ListItemText
                      primary={he.decode(questions[i].question)}
                      secondary={`Answer: ${he.decode(
                        questions[i].correct_answer
                      )}`}
                    />
                  </ListItem>
                ))}
              </List>
            </FailWrapper>
          </QuestionList>
        )}
        <Typography>
          Ready for another round? Click the button below to try again!
        </Typography>
        <ButtonsWrapper>
          <SetupButton variant='text' onClick={onChangeSettings}>
            Change settings
          </SetupButton>
          <RestartButton variant='contained' onClick={onRestart}>
            Restart
          </RestartButton>
        </ButtonsWrapper>
      </Container>
    </>
  );
};
