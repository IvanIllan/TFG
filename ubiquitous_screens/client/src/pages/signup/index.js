import { useState } from 'react';
import signupImg from './images/sign-up.png';
import httpClient from '../../utils/httpClient';
// UI components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { ThemeProvider } from '@mui/material/styles';
// Components
import PanelWithImage from '../../components/panel-with-image';
// Others
import enLocale from './locales/en.js';
import Main from '../../themes/main';
import { fieldElementProps } from '../../utils';
import { FormContainer, TextFieldElement, PasswordElement } from 'react-hook-form-mui';

export const Signup = ({}) => {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [errors, setErrors] = useState({});
  const formLocales = enLocale.form;

  const submit = (data) => {
    const { firstName, lastName, email, password, passwordConfirmation } = data;
    const httpParams = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      password_confirmation: passwordConfirmation
    };

    httpClient
      .post('signup', { ...httpParams, locale: 'en' })
      .then(function () {
        setSuccessMessage('Registration successful! Please check your email to confirm your account.');
        setErrors({});
      })
      .catch(function (error) {
        console.error('Error response:', error.response);
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.');
        }
      });
  };

  const form = (
    <Grid container direction="row" justifyContent="center" alignItems="stretch" pt="40px">
      <Grid item direction="column" justifyContent="center" xs={12} md={10}>
        <Box
          pb="60px"
          sx={{
            '& .MuiTextField-root': { mt: 1, mb: 1, width: '100%' }
          }}
        >
          <FormContainer
            onSuccess={(data) => submit(data)}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            {errorMessage && (
              <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
                {errorMessage}
              </Alert>
            )}
            {successMessage && (
              <Alert severity="success" sx={{ mt: 1, mb: 1 }}>
                {successMessage}
              </Alert>
            )}

            <TextFieldElement
              {...fieldElementProps('firstName', errors, formLocales)}
              required
              error={!!errors.first_name}
              helperText={errors.first_name?.join(', ')}
            />
            <TextFieldElement
              {...fieldElementProps('lastName', errors, formLocales)}
              required
              error={!!errors.last_name}
              helperText={errors.last_name?.join(', ')}
            />
            <TextFieldElement
              {...fieldElementProps('email', errors, formLocales)}
              required
              error={!!errors.email}
              helperText={errors.email?.join(', ')}
            />
            <PasswordElement
              {...fieldElementProps('password', errors, formLocales)}
              required
              error={!!errors.password}
              helperText={errors.password?.join(', ')}
            />
            <PasswordElement
              {...fieldElementProps('passwordConfirmation', errors, formLocales)}
              required
              error={!!errors.password_confirmation}
              helperText={errors.password_confirmation?.join(', ')}
            />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              sx={{ fontWeight: 'medium' }}
            >
              {enLocale.form.submit}
            </Button>
          </FormContainer>
        </Box>
      </Grid>
    </Grid>
  );

  return (
    <ThemeProvider theme={Main}>
      <Box sx={{ mt: { xs: 5, sm: 8 } }}>
        <PanelWithImage
          image={signupImg}
          title={enLocale.title}
          subtitle={enLocale.subtitle}
          styles={{ textAlign: 'center' }}
        >
          {form}
        </PanelWithImage>
      </Box>
    </ThemeProvider>
  );
};

export default Signup;