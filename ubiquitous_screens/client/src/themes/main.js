import { createTheme } from '@mui/material/styles';

const themeOptions = {
  palette: {
    type: 'light',
    primary: { main: '#2196f3' },
    light: { main: '#fff' },
    secondary: { main: '#441d38' },
    ternary: { main: '#fed8a3' },
    warning: { main: '#ff9800' }
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
};

const Main = createTheme(themeOptions);
export default Main;