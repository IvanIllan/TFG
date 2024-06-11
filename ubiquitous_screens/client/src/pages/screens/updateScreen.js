import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Draggable from 'react-draggable';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import httpClient from '../../utils/httpClient';
import './styles.css';

const UpdateScreen = () => {
  const location = useLocation();
  const screenId = location.state?.screenId || null;

  const [availableItems, setAvailableItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [screenSize, setScreenSize] = useState({ width: 375, height: 667 });
  const [restructureMessage, setRestructureMessage] = useState(false);
  const [itemToAdd, setItemToAdd] = useState(null);

  useEffect(() => {
    const fetchItemsAndScreen = async () => {
      try {
        const itemsResponse = await httpClient.get('/items');
        setAvailableItems(itemsResponse.data);

        if (screenId) {
          const screenResponse = await httpClient.get(`/screens/${screenId}`);
          const screenData = screenResponse.data;
          setSelectedScreen(screenData);
          setScreenSize({ width: screenData.width, height: screenData.height });
          const screenItems = screenData.items.map(item => {
            const screenItem = itemsResponse.data.find(ai => ai.id === item.id);
            return screenItem ? { ...screenItem, left: item.left, top: item.top } : null;
          }).filter(item => item !== null);
          setSelectedItems(screenItems);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchItemsAndScreen();
  }, [screenId]);

  const handleScreenSizeChange = (e) => {
    const { name, value } = e.target;
    setScreenSize(prevSize => ({
      ...prevSize,
      [name]: Number(value)
    }));
  };

  const handleAddItem = (event, value) => {
    const selectedItemIds = value.map(item => item.id);
    const newItems = selectedItemIds.filter(id => !selectedItems.some(item => item.id === id))
      .map(selectedItemId => {
        const selectedItem = availableItems.find(item => item.id === selectedItemId);
        if (!selectedItem) return null;

        const newItem = {
          ...selectedItem,
          left: 0,
          top: 0
        };

        const result = checkSpaceAvailability(newItem);

        if (result.result === 'space-available') {
          newItem.left = result.position.left;
          newItem.top = result.position.top;
          return newItem;
        } else if (result.result === 'restructure-required') {
          setRestructureMessage(true);
          setItemToAdd(newItem);
          return null;
        } else if (result.result === 'no-space') {
          alert('No hay espacio disponible para el nuevo elemento.');
          return null;
        }
        return null;
      }).filter(item => item !== null);

    setSelectedItems(prevItems => prevItems.concat(newItems));
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleDrag = (id, newPosition) => {
    const newItem = { ...selectedItems.find(item => item.id === id), left: newPosition.x, top: newPosition.y };
    const isCollision = checkCollision(newItem, selectedItems.filter(item => item.id !== id));
  
    if (!isCollision) {
      setSelectedItems(prevItems => prevItems.map(item =>
        item.id === id ? { ...item, left: newPosition.x, top: newPosition.y } : item
      ));
    }
  };


  const checkCollision = (item, otherItems) => {
    const buffer = 1; // Espacio entre elementos
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


  const checkSpaceAvailability = (newItem) => {
    const visibleItems = selectedItems;

    const canPlaceImmediately = (item) => {
      for (let x = 0; x <= screenSize.width - item.width; x += 10) {
        for (let y = 0; y <= screenSize.height - item.height; y += 10) {
          const tempItem = { ...item, left: x, top: y };
          if (!checkCollision(tempItem, visibleItems)) {
            return { available: true, position: { left: x, top: y } };
          }
        }
      }
      return { available: false };
    };

    const immediatePlacement = canPlaceImmediately(newItem);
    if (immediatePlacement.available) {
      return { result: 'space-available', position: immediatePlacement.position };
    }

    const canRestructure = (item) => {
      const allItems = [...visibleItems, item];
      allItems.sort((a, b) => a.width * a.height - b.width * b.height);
      for (let i = 0; i < allItems.length; i++) {
        for (let x = 0; x <= screenSize.width - allItems[i].width; x += 10) {
          for (let y = 0; y <= screenSize.height - allItems[i].height; y += 10) {
            const tempItem = { ...allItems[i], left: x, top: y };
            if (!checkCollision(tempItem, allItems.filter((_, index) => index !== i))) {
              allItems[i] = tempItem;
              break;
            }
          }
        }
      }
      return !checkCollision(item, allItems);
    };

    if (canRestructure(newItem)) {
      return { result: 'restructure-required' };
    }

    return { result: 'no-space' };
  };

  const restructureItems = () => {
    if (!itemToAdd) return;

    const allItems = [...selectedItems, itemToAdd];
    allItems.sort((a, b) => a.width * a.height - b.width * b.height);
    for (let i = 0; i < allItems.length; i++) {
      for (let x = 0; x <= screenSize.width - allItems[i].width; x += 10) {
        for (let y = 0; y <= screenSize.height - allItems[i].height; y += 10) {
          const tempItem = { ...allItems[i], left: x, top: y };
          if (!checkCollision(tempItem, allItems.filter((_, index) => index !== i))) {
            allItems[i] = tempItem;
            break;
          }
        }
      }
    }
    setSelectedItems(allItems);
    setRestructureMessage(false);
    setItemToAdd(null);
  };

  const handleManualIntervention = () => {
    setRestructureMessage(false);
    setItemToAdd(null);
  };

  const saveUpdatedScreen = async () => {
    if (!selectedScreen) return;

    const updatedScreen = {
      ...selectedScreen,
      width: screenSize.width,
      height: screenSize.height,
      items: selectedItems.map(({ id, left, top }) => ({ id, left, top }))
    };

    try {
      await httpClient.put(`/screens/${selectedScreen.id}`, updatedScreen);
      alert('Pantalla actualizada.');
    } catch (error) {
      console.error('Error updating screen:', error);
      alert('Error actualizando pantalla.');
    }
  };

  return (
    <Paper elevation={3} className="screen-container" style={{ padding: '20px', background: '#fff', minHeight: '100vh' }}>
      {selectedScreen && (
        <>
          <div className="screen-header">
            <div className="screen-inputs" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
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
            </div>
          </div>
          <Autocomplete
            multiple
            options={availableItems}
            getOptionLabel={(option) => option.name}
            value={selectedItems}
            onChange={handleAddItem}
            style={{ minWidth: '250px', marginBottom: '20px' }}
            renderInput={(params) => <TextField {...params} variant="outlined" label="Seleccionar Elemento" />}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={option.id}
                  label={option.name}
                  {...getTagProps({ index })}
                  onDelete={() => handleRemoveItem(option.id)}
                />
              ))
            }
          />
          <div className="device-frame" style={{ marginBottom: '20px' }}>
            <Box
              className="screen"
              style={{
                width: `${screenSize.width}px`,
                height: `${screenSize.height}px`,
              }}
            >
              {selectedItems.map((item) => (
                <Draggable
                  key={item.id}
                  bounds="parent"
                  position={{ x: item.left, y: item.top }}
                  onStop={(event, { x, y }) => handleDrag(item.id, { x, y })}
                >
                  <Box
                    className="draggable-item"
                    style={{
                      width: `${item.width}px`,
                      height: `${item.height}px`,
                    }}
                  >
                    {item.content_type === 'image' ? (
                      <img src={item.image_url} alt="item" style={{ width: '100%', height: '100%' }} />
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: item.content }} />
                    )}
                  </Box>
                </Draggable>
              ))}
            </Box>
          </div>
          {restructureMessage && (
            <div style={{ marginBottom: '20px', padding: '10px', background: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: '4px' }}>
              <p>Reestructuración requerida para acomodar el nuevo elemento.</p>
              <Button variant="contained" color="primary" onClick={restructureItems} style={{ marginRight: '10px' }}>
                Reestructurar y Añadir Elemento
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleManualIntervention}>
                Proceder con la Intervención Manual
              </Button>
            </div>
          )}
          <Button variant="contained" color="primary" onClick={saveUpdatedScreen} style={{ marginRight: '10px' }}>
            Guardar Pantalla
          </Button>
        </>
      )}
    </Paper>
  );
};

export default UpdateScreen;
