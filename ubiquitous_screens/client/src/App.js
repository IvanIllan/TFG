import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/header';
import ScreenManager from './pages/screens/screenManager';
import ItemManager from './pages/items/itemManager';
import UpdateScreen from './pages/screens/updateScreen';
import CreateScreen from './pages/screens/createScreen';
import CreateItem from './pages/items/createItem';
import UpdateItem from './pages/items/updateItem';
import { ThemeProvider } from '@mui/material/styles';
import Main from './themes/main';
import routes from './routes';

import './App.scss';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <ThemeProvider theme={Main}>
      <Router>
        {!isAuthenticated && <Header />}
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.signup} element={<Signup />} />
          <Route path={routes.signin} element={<Signin onLogin={() => setIsAuthenticated(true)} />} />
          <Route
            path={routes.dashboard}
            element={isAuthenticated ? <Dashboard onLogout={() => setIsAuthenticated(false)} /> : <Navigate to={routes.signin} />}
          >
            <Route path="item-manager" element={<ItemManager />} />
            <Route path="screen-manager" element={<ScreenManager />} />
            <Route path="update-screen/:id" element={<UpdateScreen />} />
            <Route path="create-screen" element={<CreateScreen />} /> {/* Ruta de creación */}
            <Route path="create-item" element={<CreateItem />} />
            <Route path="update-item/:id" element={<UpdateItem />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? routes.dashboard : routes.home} replace />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
