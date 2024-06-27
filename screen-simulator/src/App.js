import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScreenDisplay from './components/ScreenDisplay';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/display/:macAddress" element={<ScreenDisplay />} />
      </Routes>
    </Router>
  );
};

export default App;
