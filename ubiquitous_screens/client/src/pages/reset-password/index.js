import resetPasswordImg from './images/reset-password.png';
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

const resetPasswordForm = (
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
        <TextField required id="email" label={`${enLocale.form.email}`} color="secondary" focused />
        <TextField
          required
          id="password"
          label={`${enLocale.form.password}`}
          color="secondary"
          focused
        />

        <Button
          href="#"
          key="signin-form-submit"
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

export const Signin = ({}) => {
  return (
    <ThemeProvider theme={Main}>
      <Box sx={{ mt: { xs: 5, sm: 8 } }}>
        <PanelWithImage
          image={resetPasswordImg}
          title={enLocale.title}
          subtitle={enLocale.subtitle}
          description={enLocale.description}
          children={resetPasswordForm}
          styles={{ textAlign: 'center' }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Signin;