import { useState } from 'react';
import axios from 'axios';
// UI components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// Others
import enLocale from './locales/en.js';
import { fieldElementProps } from '../../utils';

import { FormContainer } from 'react-hook-form-mui';

const styles = {
  minHeight: '95vmin',
  display: 'flex',
  alignItems: 'center',
  padding: '40px 0'
};

const screenStyles = { background: '#fafafa' };

const httClient = axios.create({
  baseURL: 'http://127.0.0.1:3001/',
  timeout: 1000
});

export const Items = ({}) => {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  }

  const handleHeight = (event) => {
    setHeight(parseInt(event.target.value));
  }

  const handleWidth = (event) => {
    setWidth(parseInt(event.target.value));
  }
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
      <Grid item justifyContent="center" xs={10} md={3}>
        <Box
          pb="60px"
          sx={{
            '& .MuiTextField-root': { mt: 1, mb: 1, width: '100%' }
          }}
        >
          <Typography fontFamily={'Pacifico'} color="secondary" variant="h2" mb="18px">
            Creación de Items
          </Typography>
          <FormContainer
            onSuccess={(data) => submit(data)}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            {errorMessage && (
              <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
                {errorMessage}
              </Alert>
            )}

            <TextField
              {...fieldElementProps('name', errors, formLocales)}
              onChange={handleChange}
              value={message}
            />
            <TextField
              {...fieldElementProps('width', errors, formLocales)}
              onChange={handleWidth}
              value={width}
            />
            <TextField
              {...fieldElementProps('height', errors, formLocales)}
              onChange={handleHeight}
              value={height}
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
    <div id="items" style={{ ...styles, ...screenStyles }}>
      <Grid
        container
        direction="row"
        alignItems="left"
        justifyContent="left"
        alignItems="stretch"
      >
        {form}
        {console.log(message)}
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="left"
        justifyContent="left"
        alignItems="stretch"
      >
        <Box>
          <Card sx={{ width: width, height: height, mt: { xs: 0, sm: 11 }}}>
            <CardContent>
              <div className="content" style={{ display:'flex', justifyContent:'center'}} dangerouslySetInnerHTML={{__html: message}}></div>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </div>
  );
};

export default Items;