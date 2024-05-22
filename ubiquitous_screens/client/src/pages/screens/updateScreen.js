import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Draggable from 'react-draggable';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import './styles.css';

const UpdateScreen = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [screenSize, setScreenSize] = useState({ width: 375, height: 667 });
  const [availableItems, setAvailableItems] = useState([]);
  const [restructureMessage, setRestructureMessage] = useState(false);
  const [itemToAdd, setItemToAdd] = useState(null);
  const [screens, setScreens] = useState([]);
  const [selectedScreen, setSelectedScreen] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = {
          data: [
            { id: 1, width: 50, height: 50, text: 'Elemento 1' },
            { id: 2, width: 100, height: 50, text: 'Elemento 2' },
            { id: 3, width: 150, height: 100, text: 'Elemento 3' },
            { id: 4, width: 200, height: 150, text: 'Elemento 4' },
            { id: 5, width: 100, height: 100, text: 'Elemento 5' }
          ]
        };
        setAvailableItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const fetchScreens = async () => {
      try {
        // Simulación de solicitud para obtener pantallas desde la base de datos
        const response = {
          data: [
            { id: 1, name: 'Pantalla 1', width: 375, height: 667, items: [{ id: 1, left: 10, top: 10 }, { id: 2, left: 100, top: 100 }] },
            { id: 2, name: 'Pantalla 2', width: 500, height: 800, items: [{ id: 3, left: 200, top: 200 }] }
          ]
        };
        setScreens(response.data);
      } catch (error) {
        console.error('Error fetching screens:', error);
      }
    };

    fetchScreens();
  }, []);

  const handleScreenSizeChange = (e) => {
    const { name, value } = e.target;
    setScreenSize(prevSize => ({
      ...prevSize,
      [name]: Number(value)
    }));
  };

  const handleAddItem = (event, value) => {
    const selectedItemIds = value.map(item => item.id);
    const newItems = selectedItemIds.filter(id => !selectedItems.includes(id))
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
          setSelectedItems(prevSelectedItems => prevSelectedItems.filter(id => id !== selectedItemId));
          return null;
        } else if (result.result === 'no-space') {
          alert('No hay espacio disponible para el nuevo elemento.');
          setSelectedItems(prevSelectedItems => prevSelectedItems.filter(id => id !== selectedItemId));
          return null;
        }
        return null;
      }).filter(item => item !== null);

    const removedItems = selectedItems.filter(id => !selectedItemIds.includes(id));
    setItems(prevItems => prevItems.filter(item => !removedItems.includes(item.id)).concat(newItems));
    setSelectedItems(selectedItemIds);
  };

  const handleRemoveItem = (itemId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    setSelectedItems(prevSelectedItems => prevSelectedItems.filter(id => id !== itemId));
  };

  const handleDrag = (id, newPosition) => {
    setItems(prevItems => prevItems.map(item =>
      item.id === id ? { ...item, left: newPosition.x, top: newPosition.y } : item
    ));
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
    const visibleItems = items.filter(item => selectedItems.includes(item.id));

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

    const allItems = [...items, itemToAdd];
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
    setItems(allItems);
    setSelectedItems(prevSelectedItems => [...prevSelectedItems, itemToAdd.id]);
    setRestructureMessage(false);
    setItemToAdd(null);
  };

  const handleManualIntervention = () => {
    setRestructureMessage(false);
    setItemToAdd(null);
  };

  const handleScreenSelect = (event, value) => {
    setSelectedScreen(value);
    if (value) {
      const screenItems = value.items.map(item => {
        const screenItem = availableItems.find(ai => ai.id === item.id);
        return { ...screenItem, left: item.left, top: item.top };
      });
      setItems(screenItems);
      setSelectedItems(value.items.map(item => item.id));
      setScreenSize({ width: value.width, height: value.height });
    } else {
      setItems([]);
      setSelectedItems([]);
    }
  };

  const handleDeleteScreen = () => {
    if (!selectedScreen) return;
    const updatedScreens = screens.filter(screen => screen.id !== selectedScreen.id);
    setScreens(updatedScreens);
    setSelectedScreen(null);
    setItems([]);
    setSelectedItems([]);
  };

  const saveUpdatedScreen = () => {
    if (!selectedScreen) return;

    const updatedScreen = {
      ...selectedScreen,
      width: screenSize.width,
      height: screenSize.height,
      items: items.map(({ id, left, top }) => ({ id, left, top }))
    };

    setScreens(prevScreens => prevScreens.map(screen => screen.id === updatedScreen.id ? updatedScreen : screen));
    alert('Pantalla actualizada.');
  };

  return (
    <Paper elevation={3} className="screen-container" style={{ padding: '20px', background: '#fff', minHeight: '100vh' }}>
      <Autocomplete
        options={screens}
        getOptionLabel={(option) => option.name}
        value={selectedScreen}
        onChange={handleScreenSelect}
        style={{ minWidth: '250px', marginBottom: '20px' }}
        renderInput={(params) => <TextField {...params} variant="outlined" label="Seleccionar Pantalla" />}
      />
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
            getOptionLabel={(option) => option.text}
            value={availableItems.filter(item => selectedItems.includes(item.id))}
            onChange={handleAddItem}
            style={{ minWidth: '250px', marginBottom: '20px' }}
            renderInput={(params) => <TextField {...params} variant="outlined" label="Seleccionar Elemento" />}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={option.id}
                  label={option.text}
                  {...getTagProps({ index })}
                  onDelete={() => handleRemoveItem(option.id)}
                />
              ))
            }
          />
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
          <div className="device-frame" style={{ marginBottom: '20px' }}>
            <Box
              className="screen"
              style={{
                width: `${screenSize.width}px`,
                height: `${screenSize.height}px`,
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
                    className="draggable-item"
                    style={{
                      width: `${item.width}px`,
                      height: `${item.height}px`,
                    }}
                  >
                    {item.text}
                  </Box>
                </Draggable>
              ))}
            </Box>
          </div>
          <Button variant="contained" color="primary" onClick={saveUpdatedScreen} style={{ marginRight: '10px' }}>
            Guardar Pantalla
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteScreen}>
            Eliminar Pantalla
          </Button>
        </>
      )}
    </Paper>
  );
};

export default UpdateScreen;