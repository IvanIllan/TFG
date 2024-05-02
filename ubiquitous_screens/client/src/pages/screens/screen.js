import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Draggable from 'react-draggable';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const Screen = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [screenSize, setScreenSize] = useState({ width: 500, height: 500 });

  const handleScreenSizeChange = (e) => {
    const { name, value } = e.target;
    setScreenSize(prevSize => ({
      ...prevSize,
      [name]: Number(value) // Asegúrate de convertir el valor a un número
    }));
  };

  const exportLayout = () => {
    // Filtra solo los elementos seleccionados para la exportación
    const layoutData = items
      .filter(item => selectedItems.includes(item.id))
      .map(({ id, left, top, width, height }) => ({
        id,
        position: {
          x: left,
          y: top
        },
        size: {
          width,
          height
        }
      }));

    // Aquí convertimos el array de objetos a un string JSON
    const layoutJSON = JSON.stringify(layoutData, null, 2);
    
    // Ahora tienes un JSON que puedes enviar a otro software,
    // mostrar en la consola, o incluso descargar como un archivo.
    console.log(layoutJSON);

    // Opcional: Código para descargar el JSON como un archivo.
    const blob = new Blob([layoutJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'layout.json';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleAddItem = () => {
    const newItem = {
      id: items.length + 1,
      left: 0,
      top: 0,
      width: 50,
      height: 50,
      text: `Elemento ${items.length + 1}`,
    };
    setItems(prevItems => [...prevItems, newItem]);
    setSelectedItems(prevSelectedItems => [...prevSelectedItems, newItem.id]);
  };

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedItems(
      // Asegúrate de convertir cada valor a un número si están llegando como strings
      typeof value === 'string' ? value.split(',').map(v => Number(v)) : value,
    );
  };

  const handleDrag = (id, newPosition) => {
    setItems(prevItems => prevItems.map(item =>
      item.id === id ? { ...item, left: newPosition.x, top: newPosition.y } : item
    ));
  };

  const checkCollision = (item, otherItems) => {
    const buffer = 1; // Ajusta este buffer si necesitas más espacio entre elementos
    for (const otherItem of otherItems) {
      if (
        item.id !== otherItem.id &&
        item.left < otherItem.left + otherItem.width + buffer &&
        item.left + item.width + buffer > otherItem.left &&
        item.top < otherItem.top + otherItem.height + buffer &&
        item.top + item.height + buffer > otherItem.top
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <Paper elevation={3} sx={{ margin: '64px', padding: '20px', background: '#fff', minHeight: '100vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleAddItem}>
          Agregar Elemento
        </Button>
        <Button variant="outlined" color="secondary" onClick={exportLayout} style={{ marginLeft: '10px' }}>
          Exportar Diseño
        </Button>
      </div>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
        <TextField
          label="Ancho de pantalla"
          type="number"
          name="width"
          value={screenSize.width}
          onChange={handleScreenSizeChange}
          inputProps={{ min: 0 }}
        />
        <TextField
          label="Alto de pantalla"
          type="number"
          name="height"
          value={screenSize.height}
          onChange={handleScreenSizeChange}
          inputProps={{ min: 0 }}
        />
      </Box>
      {items.length > 0 && (
        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
          <InputLabel id="select-multiple-label">Elementos</InputLabel>
          <Select
            labelId="select-multiple-label"
            id="select-multiple"
            multiple
            value={selectedItems}
            onChange={handleSelectChange}
            renderValue={(selected) => `Seleccionados: ${selected.length}`}
          >
            {items.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <Box
        sx={{
          position: 'relative',
          width: `${screenSize.width}px`,
          height: `${screenSize.height}px`,
          border: '1px solid #000',
          overflow: 'hidden',
        }}
      >
        {items.filter((item) => selectedItems.includes(item.id)).map((item) => (
          <Draggable
            key={item.id}
            bounds="parent"
            position={{ x: item.left, y: item.top }}
            onDrag={(event, { x, y }) => {
              const newPosition = { x, y };
              const visibleItems = items.filter(otherItem => selectedItems.includes(otherItem.id));
              const isCollision = checkCollision(
                { ...item, left: x, top: y },
                visibleItems.filter(otherItem => otherItem.id !== item.id)
              );

              if (!isCollision) {
                handleDrag(item.id, newPosition);
              }
            }}
          >
            <Box
              sx={{
                width: `${item.width}px`,
                height: `${item.height}px`,
                backgroundColor: '#ccc',
                border: '1px solid #000',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                cursor: 'move',
                fontSize: '10px',
                textAlign: 'center',
              }}
            >
              {item.text}
            </Box>
          </Draggable>
        ))}
      </Box>
    </Paper>
  );
};

export default Screen;