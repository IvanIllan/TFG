import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Draggable from 'react-draggable';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const Screen = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

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
    setSelectedItems(prevSelectedItems => [...prevSelectedItems, newItem.id]); // Añade el nuevo elemento a la lista de seleccionados automáticamente
  };

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedItems(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleDrag = (id, newPosition) => {
    setItems(prevItems => prevItems.map(item => 
      item.id === id ? { ...item, left: newPosition.x, top: newPosition.y } : item
    ));
  };

  const containerBounds = { left: 0, top: 0, right: 450, bottom: 450 };

  const checkCollision = (item, otherItems) => {
    // Incremento para aumentar la sensibilidad de la detección de colisión.
    // Este valor añade un pequeño "buffer" alrededor de los objetos para evitar superposiciones visuales.
    const buffer = 10; // Ajusta este valor según sea necesario para evitar superposiciones.

    for (const otherItem of otherItems) {
      if (
        item.id !== otherItem.id &&
        item.left < otherItem.left + otherItem.width + buffer &&
        item.left + item.width + buffer > otherItem.left &&
        item.top < otherItem.top + otherItem.height + buffer &&
        item.top + item.height + buffer > otherItem.top
      ) {
        return true; // Hay colisión
      }
    }
    return false; // No hay colisión
  };

  return (
    <Box>
      <button onClick={handleAddItem}>Agregar Elemento</button>
      {items.length > 0 && (
        <FormControl fullWidth style={{ marginTop: '10px' }}>
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
          width: '500px',
          height: '500px',
          border: '2px solid #000',
          marginTop: '10px',
          overflow: 'hidden',
        }}
      >
        {items.filter((item) => selectedItems.includes(item.id)).map((item) => (
          <Draggable
            key={item.id}
            position={{ x: item.left, y: item.top }}
            onDrag={(event, { x, y }) => {
              const newPosition = { x, y };
              const isCollision = checkCollision(
                { ...item, left: x, top: y },
                items.filter(otherItem => otherItem.id !== item.id)
              );

              handleDrag(item.id, isCollision ? { x: item.left, y: item.top } : newPosition);
            }}
            bounds={containerBounds}
          >
            <div
              style={{
                width: `${item.width}px`,
                height: `${item.height}px`,
                background: '#ccc',
                border: '1px solid #000',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                cursor: 'move',
                fontSize: '10px',
                overflow: 'hidden',
                whiteSpace: 'normal',
                textAlign: 'center',
              }}
            >
              {item.text}
            </div>
          </Draggable>
        ))}
      </Box>
    </Box>
  );
};

export default Screen;