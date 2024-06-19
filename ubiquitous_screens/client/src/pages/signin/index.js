import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Grid, TextField, Button, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import PanelWithImage from '../../components/panel-with-image';
import enLocale from './locales/en.js';
import Main from '../../themes/main';
import routes from '../../routes';
import httpClient from '../../utils/httpClient';
import signinImg from './images/sign-up.png';
import './signin.css';

export const Signin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await httpClient.post('/login', {
        user: { email, password }
      });
      const token = response.headers['authorization'].split(' ')[1];
      localStorage.setItem('token', token);
      setError('');
      onLogin();
      navigate(routes.dashboard, { replace: true });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Invalid Email or Password');
    }
  };

  const signInForm = (
    <Grid container direction="row" justifyContent="center" alignItems="stretch" pt="40px">
      <Grid item direction="column" justifyContent="center" xs={12} md={10}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          pb="60px"
          sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="email"
            label={enLocale.form.email}
            color="secondary"
            focused
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            id="password"
            label={enLocale.form.password}
            color="secondary"
            focused
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" size="large" sx={{ fontWeight: 'medium' }}>
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
            style={{ color: `${Main.palette.primary.main}`, textDecoration: 'none', fontWeight: 'bold' }}
            to={routes.signup}
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
