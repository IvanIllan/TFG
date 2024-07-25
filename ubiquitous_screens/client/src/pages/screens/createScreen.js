import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Draggable from 'react-draggable';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import httpClient from '../../utils/httpClient';
import './styles.css';

const CreateScreen = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [screenSize, setScreenSize] = useState({ width: 375, height: 667 });
  const [availableItems, setAvailableItems] = useState([]);
  const [restructureMessage, setRestructureMessage] = useState(false);
  const [itemToAdd, setItemToAdd] = useState(null);
  const [screens, setScreens] = useState([]);
  const [screenName, setScreenName] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [factories, setFactories] = useState([]);
  const [selectedFactory, setSelectedFactory] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsResponse = await httpClient.get('/items');
        setAvailableItems(itemsResponse.data);

        const factoriesResponse = await httpClient.get('/factories');
        setFactories(factoriesResponse.data);
      } catch (error) {
        console.error('Error fetching items or factories:', error);
      }
    };

    fetchItems();
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

  const saveNewScreen = async () => {
    const newScreen = {
      name: `Pantalla ${screens.length + 1}`,
      width: screenSize.width,
      height: screenSize.height,
      mac: "123123asdawsd", // example mac address
      factory_id: selectedFactory?.id, // Make sure this is set correctly
      html_structure: items.map(({ id, left, top }) => ({ id, left, top }))
    };
  
    try {
      const response = await httpClient.post('/screens', { screen: newScreen });
      setScreens(prevScreens => [...prevScreens, response.data]);
      setItems([]);
      setSelectedItems([]);
      setScreenSize({ width: 375, height: 667 });
      alert('Nueva pantalla guardada.');
    } catch (error) {
      console.error('Error creando la pantalla:', error);
      alert('Error creando la pantalla.');
    }
  };

  const exportLayout = () => {
    const layoutData = items.map(({ id, left, top, width, height }) => ({
      id,
      position: { x: left, y: top },
      size: { width, height }
    }));

    const layoutJSON = JSON.stringify(layoutData, null, 2);
    console.log(layoutJSON);

    const blob = new Blob([layoutJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'layout.json';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <Paper elevation={3} className="sidebar" style={{ padding: '20px', background: '#fff', height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ flexGrow: 1 }}>
          <div className="screen-inputs" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <TextField
              label="Nombre de pantalla"
              type="text"
              name="name"
              value={screenName}
              onChange={(e) => setScreenName(e.target.value)}
              fullWidth
            />
            <TextField
              label="MAC Address"
              type="text"
              name="mac"
              value={macAddress}
              onChange={(e) => setMacAddress(e.target.value)}
              fullWidth
            />
            <TextField
              label="Ancho de pantalla"
              type="number"
              name="width"
              value={screenSize.width}
              onChange={handleScreenSizeChange}
              inputProps={{ min: 0 }}
              fullWidth
            />
            <TextField
              label="Alto de pantalla"
              type="number"
              name="height"
              value={screenSize.height}
              onChange={handleScreenSizeChange}
              inputProps={{ min: 0 }}
              fullWidth
            />
            <Autocomplete
              options={factories}
              getOptionLabel={(option) => option.name}
              value={selectedFactory}
              onChange={(event, value) => setSelectedFactory(value)}
              renderInput={(params) => <TextField {...params} variant="outlined" label="Seleccionar Factory" />}
              fullWidth
            />
          </div>
          <Autocomplete
            multiple
            options={availableItems}
            getOptionLabel={(option) => option.name}
            value={availableItems.filter(item => selectedItems.includes(item.id))}
            onChange={handleAddItem}
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
            fullWidth
            style={{ marginBottom: '20px' }}
          />
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={saveNewScreen} fullWidth>
            Guardar Nueva Pantalla
          </Button>
          <Button variant="contained" color="secondary" onClick={exportLayout} fullWidth style={{ marginTop: '10px' }}>
            Exportar Diseño
          </Button>
        </div>
      </Paper>
      <div className="device-frame" style={{ marginLeft: '20px' }}>
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
        <div className="restructure-message" style={{ position: 'absolute', bottom: '20px', left: '20px', padding: '10px', background: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: '4px' }}>
          <p>Reestructuración requerida para acomodar el nuevo elemento.</p>
          <Button variant="contained" color="primary" onClick={restructureItems} style={{ marginRight: '10px' }}>
            Reestructurar y Añadir Elemento
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleManualIntervention}>
            Proceder con la Intervención Manual
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateScreen;
