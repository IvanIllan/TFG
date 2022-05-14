import homeImg from './images/home/home.png';
import circuitImg from './images/home/background.png';
import enLocale from './locales/en.js';
// UI components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Header from './Header';
import { ThemeProvider } from '@mui/material/styles';
import Main from './themes/main';

import './App.scss';

const homePages = ['Features', 'About', 'Contact', 'Sign in', 'Sign up'];
const styles = {
  home: {
    content: {
      main: {
        backgroundImage: `url(${circuitImg})`,
        backgroundBlendMode: 'color',
        backgroundSize: 'cover',
        mixBlendMode: 'darken'
      },
      mobile: [
        { display: { xs: 'flex', lg: 'none' } },
        { textAlign: { xs: 'center', md: 'left' } },
        { alignItems: { xs: 'center', md: 'flex-start' } },
        { padding: '20px 10px 0 10px' }
      ],
      desktop: [{ display: { xs: 'none', lg: 'flex' } }, { minHeight: '93vmin' }]
    }
  }
};

const home = (
  <Grid container direction="row" justifyContent="center" alignItems="stretch">
    <Grid
      item
      direction="column"
      justifyContent="center"
      xs={12}
      md={4}
      lg={5}
      sx={styles.home.content.desktop.concat(styles.home.content.main)}
    >
      <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
        {enLocale.home.title}
      </Typography>
      <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
        {enLocale.home.subtitle}
      </Typography>
      <Typography variant="h5" pt="30px" sx={{ fontWeight: 'light' }}>
        {enLocale.home.description}
      </Typography>
    </Grid>
    <Grid
      item
      xs={12}
      md={5}
      lg={5}
      direction="column"
      justifyContent="center"
      textAlign={'center'}
      className="App-home"
      sx={styles.home.content.mobile.concat(styles.home.content.main)}
    >
      <Typography color="secondary" variant="h2">
        {enLocale.home.title}
      </Typography>
      <Typography color="secondary" variant="h3" sx={{ fontWeight: 'bold' }}>
        {enLocale.home.subtitle}
      </Typography>
      <Typography variant="h6" pt="30px" sx={{ fontWeight: 'light' }}>
        {enLocale.home.description}
      </Typography>
    </Grid>
    <Grid
      item
      xs={12}
      md={6}
      lg={5}
      display="flex"
      justifyContent="center"
      alignItems="center"
      pl="20px"
      pt="20px"
    >
      <img src={homeImg} alt="home-image" width={'90%'} />
    </Grid>
  </Grid>
);

function App() {
  return (
    <ThemeProvider theme={Main}>
      <Grid container direction="row" justifyContent="center" alignItems="stretch">
        <Grid item xs={12} md={10}>
          <Header pages={homePages} />
        </Grid>
      </Grid>
      {home}
    </ThemeProvider>
  );
}

export default App;