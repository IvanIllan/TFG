import { useState } from 'react';
import signupImg from './images/sign-up.png';
import axios from 'axios';
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

const httClient = axios.create({
  baseURL: 'http://127.0.0.1:3001/',
  timeout: 1000
});

export const Signup = ({}) => {
  const [errorMessage, setErrorMessage] = useState(undefined);
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

    httClient
      .post('signup', { ...httpParams, locale: 'en' })
      .then(function (response) {
        // redirect to success
      })
      .catch(function (error) {
        const { message: responseMessage, errors: responseErrors } = error.response.data;
        setErrorMessage(responseMessage);
        setErrors(responseErrors);
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

            <TextFieldElement {...fieldElementProps('firstName', errors, formLocales)} required />
            <TextFieldElement {...fieldElementProps('lastName', errors, formLocales)} required />
            <TextFieldElement {...fieldElementProps('email', errors, formLocales)} required />
            <PasswordElement {...fieldElementProps('password', errors, formLocales)} required />
            <PasswordElement
              {...fieldElementProps('passwordConfirmation', errors, formLocales)}
              required
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