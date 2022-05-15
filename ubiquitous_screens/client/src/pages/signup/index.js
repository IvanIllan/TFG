
import signupImg from './images/sign-up.png';
// UI components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
// Components
import PanelWithImage from '../../components/panel-with-image';
// Others
import enLocale from './locales/en.js';
import Main from '../../themes/main';

const signUpForm = (
  <Grid container direction="row" justifyContent="center" alignItems="stretch" pt="40px">
    <Grid item direction="column" justifyContent="center" xs={12} md={10}>
      <Box
        component="form"
        pb="60px"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="fullname"
          label={`${enLocale.form.fullName}`}
          color="secondary"
          focused
        />
        <TextField required id="email" label={`${enLocale.form.email}`} color="secondary" focused />
        <TextField
          required
          id="password"
          label={`${enLocale.form.password}`}
          color="secondary"
          focused
        />
        <TextField
          required
          id="passwordConfirmation"
          label={`${enLocale.form.passwordConfirmation}`}
          color="secondary"
          focused
        />

        <Button
          href="#"
          key="signup-form-submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ fontWeight: 'medium' }}
        >
          {enLocale.form.submit}
        </Button>
      </Box>
    </Grid>
  </Grid>
);

export const Signup = ({}) => {
  return (
    <ThemeProvider theme={Main}>
      <Box sx={{ mt: { xs: 5, sm: 8 } }}>
        <PanelWithImage
          image={signupImg}
          title={enLocale.title}
          subtitle={enLocale.subtitle}
          children={signUpForm}
          styles={{ textAlign: 'center' }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Signup;