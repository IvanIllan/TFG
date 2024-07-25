import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import './styles.css';  // Asegúrate de que este archivo se importe correctamente

const ScreenDisplay = () => {
  const { macAddress } = useParams();
  const [screenData, setScreenData] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001/cable');

    const sendConfirmation = (socket) => {
      console.log('Sending confirmation...');
      socket.send(JSON.stringify({
        command: 'message',
        identifier: JSON.stringify({ channel: 'ScreenChannel', mac_address: macAddress }),
        data: JSON.stringify({ mac_address: macAddress, message: { type: 'confirmation', status: 'Received' } })
      }));
    };

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
      socket.send(JSON.stringify({
        command: 'subscribe',
        identifier: JSON.stringify({ channel: 'ScreenChannel', mac_address: macAddress })
      }));
    };

    socket.onmessage = (event) => {
      console.log('Raw message data:', event.data);
      const parsedData = JSON.parse(event.data);
      console.log('Parsed data:', parsedData);

      if (parsedData.message && parsedData.message.type === 'initial_data') {
        console.log('Setting screen data:', parsedData.message.screen);
        setScreenData(parsedData.message.screen);
        sendConfirmation(socket);
      }
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, [macAddress]);

  useEffect(() => {
    if (screenData) {
      console.log('Screen data updated:', screenData);
    }
  }, [screenData]);

  if (!screenData) {
    return <div>Loading screen data...</div>;
  }

  return (
    <div className="device-frame">
      <Box
        className="screen"
        style={{
          width: `${screenData.width}px`,
          height: `${screenData.height}px`,
          position: 'relative'
        }}
      >
        {screenData.html_structure.map((element, index) => (
          <Box
            key={index}
            className="draggable-item"
            style={{
              position: 'absolute',
              top: `${element.top}px`,
              left: `${element.left}px`,
              width: `${element.width}px`,
              height: `${element.height}px`
            }}
          >
            {element.content_type === 'image' ? (
              <img src={element.image_url} alt={`item-${element.id}`} className="item-content" />
            ) : (
              <div className="item-content" dangerouslySetInnerHTML={{ __html: element.content }} />
            )}
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default ScreenDisplay;
