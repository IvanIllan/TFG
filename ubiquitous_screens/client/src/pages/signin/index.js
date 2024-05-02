
import React from 'react';
import { useAuth } from '../../AuthContext';
import signinImg from './images/sign-up.png';
import { Link, useNavigate } from 'react-router-dom';
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
import routes from '../../routes';

export const Signin = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí iría la lógica real de inicio de sesión, que comunicaría con el backend
    signIn(); // Esto es solo para fines de demostración
    navigate(routes.screens);
  };

  // Mueve el componente de formulario dentro de Signin para manejar los eventos
  const signInForm = (
    <Grid container direction="row" justifyContent="center" alignItems="stretch" pt="40px">
      <Grid item direction="column" justifyContent="center" xs={12} md={10}>
        <Box
          component="form"
          onSubmit={handleSubmit}
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
            type="password" // Asegúrate de que el campo de contraseña sea de tipo "password"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ fontWeight: 'medium' }}
          >
            {enLocale.form.submit}
          </Button>
        </Box>
        <Box pb="60px">
          <Link
            style={{
              color: `${Main.palette.primary.main}`,
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
            to={routes.screens}
          >
            {enLocale.forgotPassword}
          </Link>
        </Box>
      </Grid>
    </Grid>
  );

  return (
    <ThemeProvider theme={Main}>
      <Box sx={{ mt: { xs: 5, sm: 8 } }}>
        <PanelWithImage
          image={signinImg}
          title={enLocale.title}
          subtitle={enLocale.subtitle}
          styles={{ textAlign: 'center' }}
        >
          {signInForm} {/* Coloca el formulario como children aquí */}
        </PanelWithImage>
      </Box>
    </ThemeProvider>
  );
};

export default Signin;