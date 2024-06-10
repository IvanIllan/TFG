// index.js (Node.js)
const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3001/cable');

ws.on('open', () => {
  console.log('Connected to WebSocket server');
  ws.send(JSON.stringify({ command: 'subscribe', identifier: JSON.stringify({ channel: 'ScreenChannel' }) }));

  // Enviar mensaje de prueba
  setTimeout(() => {
    ws.send(JSON.stringify({ command: 'message', identifier: JSON.stringify({ channel: 'ScreenChannel' }), data: JSON.stringify({ content: 'Hello from Node.js' }) }));
  }, 5000);
});

ws.on('message', (data) => {
  console.log('Received:', data);
});

ws.on('close', () => {
  console.log('Disconnected from WebSocket server');
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});
