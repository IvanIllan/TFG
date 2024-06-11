import React, { useState } from 'react';
import signinImg from './images/sign-up.png';
import { Link, useNavigate } from 'react-router-dom';
// UI components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; // Importa Typography para mostrar el mensaje de error
import { ThemeProvider } from '@mui/material/styles';
// Components
import PanelWithImage from '../../components/panel-with-image';
// Others
import enLocale from './locales/en.js';
import Main from '../../themes/main';
import routes from '../../routes';
// Utils
import httpClient from '../../utils/httpClient';

export const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para el mensaje de error

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await httpClient.post('/login', {
        user: {
          email: email,
          password: password,
        }
      });
      
      const token = response.headers['authorization'].split(' ')[1]; // Suponiendo que el token viene en el header 'Authorization'
      localStorage.setItem('token', token); // Guarda el token en el localStorage
      setError(''); // Resetea el mensaje de error
      navigate(routes.manageScreens); // Redirige a la pantalla principal
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Invalid Email or Password'); // Establece el mensaje de error
    }
  };

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
          <TextField 
            required 
            id="email" 
            label={`${enLocale.form.email}`} 
            color="secondary" 
            focused 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            id="password"
            label={`${enLocale.form.password}`}
            color="secondary"
            focused
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}
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
          {signInForm}
        </PanelWithImage>
      </Box>
    </ThemeProvider>
  );
};

export default Signin;