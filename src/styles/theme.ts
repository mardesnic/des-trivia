import { createTheme } from '@mui/material/styles';

const primary = '#333';
const secondary = '#fff';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
  },
  spacing: 8,
  typography: {
    fontFamily: 'Monospace, Courier, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
