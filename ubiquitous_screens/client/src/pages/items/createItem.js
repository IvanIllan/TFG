import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { FormContainer } from 'react-hook-form-mui';
import enLocale from './locales/en.js';
import './styles.css';

const filter = createFilterOptions();

const CreateItem = () => {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [errors, setErrors] = useState({});
  const [name, setName] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeWidth = (event) => {
    setWidth(parseInt(event.target.value));
  };

  const handleChangeHeight = (event) => {
    setHeight(parseInt(event.target.value));
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategories(newValue);
  };

  const formLocales = enLocale.form;
  const submit = (data) => {
    const { name, width, height } = data;
    const httpParams = {
      name,
      width,
      height,
      categories: selectedCategories
    };

    console.log('Datos enviados:', httpParams);
  };

  return (
    <Paper elevation={3} className="screen-container" style={{ padding: '20px', background: '#fff', minHeight: '100vh' }}>
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
          label="Nombre"
          variant="outlined"
          error={!!errors.name}
          helperText={errors.name ? formLocales.errors[errors.name.type] : ''}
          onChange={handleChangeName}
          value={name}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Ancho"
          variant="outlined"
          error={!!errors.width}
          helperText={errors.width ? formLocales.errors[errors.width.type] : ''}
          onChange={handleChangeWidth}
          value={width}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Alto"
          variant="outlined"
          error={!!errors.height}
          helperText={errors.height ? formLocales.errors[errors.height.type] : ''}
          onChange={handleChangeHeight}
          value={height}
          fullWidth
          margin="normal"
        />
        <Autocomplete
          multiple
          freeSolo
          options={categories}
          value={selectedCategories}
          onChange={handleCategoryChange}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            if (params.inputValue !== '') {
              filtered.push(params.inputValue);
            }
            return filtered;
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip key={option} label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => <TextField {...params} variant="outlined" label="Categorías" />}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          sx={{ fontWeight: 'medium', marginTop: '20px' }}
        >
          {enLocale.form.submit}
        </Button>
      </FormContainer>
      <Box>
        <Card sx={{ width: width, height: height, mt: { xs: 0, sm: 11 }, border: '1px solid black' }}>
          <CardContent>
            <div className="content" style={{ display: 'flex', justifyContent: 'center' }} dangerouslySetInnerHTML={{ __html: name }}></div>
          </CardContent>
        </Card>
      </Box>
    </Paper>
  );
};

export default CreateItem;