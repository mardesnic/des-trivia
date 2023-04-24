import React from 'react';
import { Container } from '../layout/Container';
import { Skeleton } from '@mui/material';
import { styled } from '@mui/system';

const LoadingSkeleton = styled(Skeleton)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(3),
}));

export const Loading: React.FC = () => {
  return (
    <Container>
      <LoadingSkeleton variant='rounded' height={58} />
      <LoadingSkeleton variant='rounded' height={58} />
      <LoadingSkeleton variant='rounded' height={58} />
      <Skeleton variant='rounded' width={124} height={38} />
    </Container>
  );
};
