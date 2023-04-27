import { ReactNode } from 'react';
import { styled } from '@mui/system';
import {
  Container as MuiContainer,
  Box,
  Paper as MuiPaper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Navbar } from './Navbar';

interface Props {
  children: ReactNode;
}

const Content = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    paddingBlock: theme.spacing(2),
    paddingInline: theme.spacing(0),
  },
}));

const Paper = styled(MuiPaper)(({ theme }) => ({
  paddingInline: theme.spacing(2),
  paddingBlock: theme.spacing(3),
  color: theme.palette.text.primary,
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const Container: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  return (
    <>
      <Navbar />
      <MuiContainer maxWidth='md'>
        <Content>
          <Paper theme={theme}>{children}</Paper>
        </Content>
      </MuiContainer>
    </>
  );
};
