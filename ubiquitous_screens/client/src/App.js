import homeImg from './images/home/home.png';
import backgroundImg from './images/home/background.png';
import featureOneImg from './images/features/feature-one.png';
import featureTwoImg from './images/features/feature-two.png';
import featureThreeImg from './images/features/feature-three.png';
import contactImg from './images/contact/contact-us.png';
import enLocale from './locales/en.js';
// UI components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Header from './Header';
import { ThemeProvider } from '@mui/material/styles';
import Main from './themes/main';

import './App.scss';

const homePages = ['Features', 'About', 'Contact'];
const styles = {
  home: {
    content: {
      main: {
        backgroundImage: `url(${backgroundImg})`,
        backgroundBlendMode: 'color',
        backgroundSize: 'cover',
        mixBlendMode: 'darken'
      },
      mobile: {
        display: { xs: 'flex', lg: 'none' },
        textAlign: { xs: 'center', md: 'left' },
        alignItems: { xs: 'center', md: 'flex-start' },
        padding: '20px 10px 0 10px'
      },
      desktop: { display: { xs: 'none', lg: 'flex' }, minHeight: '93vmin' }
    },
    features: {
      main: {
        backgroundColor: 'ternary.main',
        padding: '60px 10px'
      },
      img: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', sm: 'end' },
        maxHeight: { xs: '50vmin', sm: '22vmin' },
        paddingRight: { xs: '0', sm: '30px' },
        marginBottom: { xs: '30px' }
      }
    },
    contact: {
      main: {
        backgroundColor: `${Main.palette.primary.main}`,
        padding: '60px 10px'
      }
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
      sx={{ ...styles.home.content.desktop, ...styles.home.content.main }}
    >
      <Typography fontFamily={'Pacifico'} color="secondary" variant="h1">
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
      sx={{ ...styles.home.content.mobile, ...styles.home.content.main }}
    >
      <Typography fontFamily={'Pacifico'} color="secondary" variant="h2">
        {enLocale.home.title}
      </Typography>
      <Typography color="secondary" variant="h3" sx={{ fontWeight: 'bold' }}>
        {enLocale.home.subtitle}
      </Typography>
      <Typography variant="h6" pt="30px" sx={{ fontWeight: 'light' }}>
        {enLocale.home.description}
      </Typography>
    </Grid>
    <Grid item xs={12} md={6} lg={5} display="flex" justifyContent="center" alignItems="center">
      <img src={homeImg} alt="home-image" width={'90%'} />
    </Grid>
  </Grid>
);

const features = (
  <Box sx={styles.home.features.main}>
    <Grid container direction="row" justifyContent="center" alignItems="stretch">
      <Grid item xs={12} md={10} pb="40px">
        <Typography fontFamily={'Pacifico'} color="secondary" variant="h3">
          {enLocale.features.title}
        </Typography>
      </Grid>
    </Grid>
    <Grid container direction="row" justifyContent="center" alignItems="stretch" mb="40px">
      <Grid item xs={12} sm={3} sx={styles.home.features.img}>
        <img src={featureOneImg} alt="feature-one-image" height={'100%'} />
      </Grid>
      <Grid
        item
        direction="column"
        justifyContent="center"
        display="flex"
        xs={12}
        sm={6}
        md={5}
        lg={4}
      >
        <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
          {enLocale.features.featureOne.title}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'light' }}>
          {enLocale.features.featureOne.description}
        </Typography>
      </Grid>
    </Grid>
    <Grid container direction="row" justifyContent="center" alignItems="stretch" mb="40px">
      <Grid item xs={12} sm={3} sx={styles.home.features.img}>
        <img src={featureTwoImg} alt="feature-two-image" height={'100%'} />
      </Grid>
      <Grid
        item
        direction="column"
        justifyContent="center"
        display="flex"
        xs={12}
        sm={6}
        md={5}
        lg={4}
      >
        <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
          {enLocale.features.featureTwo.title}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'light' }}>
          {enLocale.features.featureTwo.description}
        </Typography>
      </Grid>
    </Grid>
    <Grid container direction="row" justifyContent="center" alignItems="stretch" mb="40px">
      <Grid item xs={12} sm={3} sx={styles.home.features.img}>
        <img src={featureThreeImg} alt="feature-three-image" height={'100%'} />
      </Grid>
      <Grid
        item
        direction="column"
        justifyContent="center"
        display="flex"
        xs={12}
        sm={6}
        md={5}
        lg={4}
      >
        <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
          {enLocale.features.featureThree.title}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'light' }}>
          {enLocale.features.featureThree.description}
        </Typography>
      </Grid>
    </Grid>
  </Box>
);

const contact = (
  <Box sx={styles.home.contact.main}>
    <Grid container direction="row" justifyContent="center" alignItems="stretch">
      <Grid item xs={12} md={10} pb="40px">
        <Typography fontFamily={'Pacifico'} color="white" variant="h3">
          {enLocale.contact.title}
        </Typography>
      </Grid>
    </Grid>
    <Grid container direction="row" justifyContent="center" alignItems="stretch">
      <Grid item direction="column" justifyContent="center" xs={10} md={3}>
        <Box
          component="form"
          pb="60px"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%', color: 'white' },
            '& .MuiInputBase-input': { color: 'white' }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="fullname"
            label={`${enLocale.contact.form.fullName}`}
            color="light"
            focused
          />
          <TextField
            required
            id="email"
            label={`${enLocale.contact.form.email}`}
            color="light"
            focused
          />
          <TextField
            required
            id="message"
            label={`${enLocale.contact.form.message}`}
            color="light"
            focused
            multiline
            rows={6}
            maxRows={6}
          />
          <Button
            href="#"
            key="contact-form-submit"
            variant="contained"
            color="secondary"
            backgroundColor="light"
            size="large"
            sx={{ fontWeight: 'medium' }}
          >
            {enLocale.contact.form.submit}
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={5} display="flex" justifyContent="center" alignItems="center">
        <img src={contactImg} alt="contact-image" width={'90%'} />
      </Grid>
    </Grid>
  </Box>
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
      {features}
      {contact}
    </ThemeProvider>
  );
}

export default App;