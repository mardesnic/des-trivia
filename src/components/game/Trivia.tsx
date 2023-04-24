import React, { useEffect, useState } from 'react';
import {
  TriviaApiParams,
  useTriviaQuestions,
} from '../../services/triviaService';
import { Game } from './Game';
import { Results } from './Results';
import { Setup } from './Setup';
import { Loading } from '../shared/Loading';
import { Error } from '../shared/Error';
import { DEFAULT_SETTINGS, LOCAL_STORAGE_KEY } from '../../const';
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/functions';

export const Trivia: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [incorrectAnswerIndexes, setIncorrectAnswerIndexes] = useState<
    number[]
  >([]);
  const [settings, setSettings] = useState(
    loadFromLocalStorage(LOCAL_STORAGE_KEY, DEFAULT_SETTINGS)
  );
  const [showSettings, setShowSettings] = useState(true);

  useEffect(() => {
    saveToLocalStorage(LOCAL_STORAGE_KEY, settings);
  }, [settings]);

  const {
    data: questions = [],
    isLoading,
    isFetching,
    isError,
    refetch: refetchQuestions,
  } = useTriviaQuestions(settings as TriviaApiParams);

  const handleQuizStart = async (settings: TriviaApiParams) => {
    setSettings(settings);
    setShowSettings(false);
  };

  const handleAnswerQuestion = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct_answer;
    if (!isCorrect) {
      setIncorrectAnswerIndexes((prev) => [...prev, currentQuestionIndex]);
    }
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleChangeSettings = async () => {
    setShowSettings(true);
    handleQuizRestart();
  };

  const handleQuizRestart = async () => {
    setCurrentQuestionIndex(0);
    setIncorrectAnswerIndexes([]);
    await refetchQuestions();
  };

  if (showSettings) {
    return <Setup onSubmit={handleQuizStart} settings={settings} />;
  }

  if (isLoading || isFetching) return <Loading />;
  if (isError) return <Error />;

  if (currentQuestionIndex < questions.length) {
    return (
      <Game
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswerQuestion}
        progress={Math.round(
          ((currentQuestionIndex + 1) / Number(settings.amount)) * 100
        )}
      />
    );
  }

  return (
    <Results
      questions={questions}
      incorrectAnswerIndexes={incorrectAnswerIndexes}
      onRestart={handleQuizRestart}
      settings={settings}
      onChangeSettings={handleChangeSettings}
    />
  );
};
