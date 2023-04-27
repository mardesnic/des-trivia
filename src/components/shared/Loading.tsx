import React from 'react';
import { Container } from '../layout/Container';
import { Skeleton, Box } from '@mui/material';
import { styled } from '@mui/system';

const LoadingSkeleton = styled(Skeleton)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(3),
}));

const ButtonsWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
}));

export const Loading: React.FC = () => {
  return (
    <Container>
      <LoadingSkeleton variant='rounded' height={56} />
      <LoadingSkeleton variant='rounded' height={56} />
      <LoadingSkeleton variant='rounded' height={56} />
      <ButtonsWrapper>
        <Skeleton variant='rounded' width={69} height={36} />
      </ButtonsWrapper>
    </Container>
  );
};
