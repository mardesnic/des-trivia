import React from 'react';
import { Container } from '../layout/Container';
import { SmartToyOutlined as SmartToyOutlinedIcon } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

export const Error: React.FC = () => {
  return (
    <Container>
      <Box textAlign='center'>
        <SmartToyOutlinedIcon />
        <Typography>Network error</Typography>
      </Box>
    </Container>
  );
};
