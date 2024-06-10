import React, { useState, useEffect } from 'react';
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
import httpClient from '../../utils/httpClient';
import enLocale from './locales/en.js';
import './styles.css';

const filter = createFilterOptions();

const CreateItem = () => {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [errors, setErrors] = useState({});
  const [name, setName] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [contentType, setContentType] = useState('content'); // 'content' or 'image'
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [factories, setFactories] = useState([]);
  const [selectedFactory, setSelectedFactory] = useState(null);

  useEffect(() => {
    const fetchFactories = async () => {
      try {
        const response = await httpClient.get('/factories');
        setFactories(response.data);
      } catch (error) {
        console.error('Error fetching factories:', error);
        setFactories([]); // Ensure factories is an array
      }
    };
  
    fetchFactories();
  }, []);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeWidth = (event) => {
    setWidth(parseInt(event.target.value));
  };

  const handleChangeHeight = (event) => {
    setHeight(parseInt(event.target.value));
  };

  const handleTagChange = (event, newValue) => {
    setSelectedTags(newValue);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImageName(file.name);
  };

  const handleContentTypeChange = (event) => {
    setContentType(event.target.value);
    setContent(''); // Clear content when switching content type
    setImage(null); // Clear image when switching content type
    setImageName(''); // Clear image name when switching content type
  };

  const handleFactoryChange = (event, value) => {
    setSelectedFactory(value);
  };

  const formLocales = enLocale.form;

  const submit = async (data) => {
    const httpParams = new FormData();
    httpParams.append('item[name]', name);
    httpParams.append('item[width]', width);
    httpParams.append('item[height]', height);
    selectedTags.forEach((tag) => {
      httpParams.append('item[tags][]', tag); // Enviar tags como array
    });
    httpParams.append('item[content_type]', contentType); // Usar 'content_type'
    httpParams.append('item[factory_id]', selectedFactory?.id); // Añadir factory_id

    if (contentType === 'content') {
      httpParams.append('item[content]', content);
    } else if (contentType === 'image' && image) {
      httpParams.append('item[image]', image);
    }

    try {
      const response = await httpClient.post('/items', httpParams, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Datos enviados:', response.data);
      alert('Item creado exitosamente.');
    } catch (error) {
      console.error('Error creando el item:', error);
      setErrorMessage('Error creando el item. Intenta nuevamente.');
    }
  };

  return (
    <Paper elevation={3} className="container" style={{ background: '#fff', minHeight: '100vh', display: 'flex' }}>
      <Box className="sidebar" sx={{ width: '30%', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <FormContainer
          onSuccess={(data) => submit(data)}
          sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          {errorMessage && (
            <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
              {errorMessage}
            </Alert>
          )}
          <TextField
            label="Tipo de Contenido"
            variant="outlined"
            select
            SelectProps={{ native: true }}
            value={contentType}
            onChange={handleContentTypeChange}
            fullWidth
            margin="normal"
          >
            <option value="content">Contenido HTML</option>
            <option value="image">Imagen</option>
          </TextField>
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
            options={factories}
            getOptionLabel={(option) => option.name || ""}
            value={selectedFactory}
            onChange={handleFactoryChange}
            renderInput={(params) => <TextField {...params} variant="outlined" label="Seleccionar Factory" />}
            fullWidth
            margin="normal"
          />
          {contentType === 'content' ? (
            <TextField
              label="Contenido HTML"
              variant="outlined"
              error={!!errors.content}
              helperText={errors.content ? formLocales.errors[errors.content.type] : ''}
              onChange={handleContentChange}
              value={content}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TextField
                value={imageName}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                sx={{ flex: 1, marginTop: '12px', marginBottom: '16px' }}
              />
              <Button
                variant="contained"
                component="label"
                sx={{ padding: '8px 16px' }}
              >
                Subir Imagen
                <input
                  type="file"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
            </div>
          )}
          <Autocomplete
            multiple
            freeSolo
            options={tags}
            value={selectedTags}
            onChange={handleTagChange}
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
            renderInput={(params) => <TextField {...params} variant="outlined" label="Etiquetas" />}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            sx={{ fontWeight: 'medium', marginTop: '40px' }}
          >
            {enLocale.form.submit}
          </Button>
        </FormContainer>
      </Box>
      {width && height && (
        <Box className="item-preview" sx={{ width: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Card sx={{ width: `${width}px`, height: `${height}px`, border: '1px solid black' }}>
            <CardContent sx={{ padding: 0 }}>
              {contentType === 'content' ? (
                <div className="content" style={{ display: 'flex', justifyContent: 'center', height: '100%' }} dangerouslySetInnerHTML={{ __html: content }}></div>
              ) : (
                image && (
                  <img src={URL.createObjectURL(image)} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                )
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </Paper>
  );
};

export default CreateItem;
