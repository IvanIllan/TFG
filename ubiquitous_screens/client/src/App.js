import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import CreateScreen from './pages/screens/createScreen';
import UpdateScreen from './pages/screens/updateScreen';
import ScreenManager from './pages/screens/screenManager'; // Importa el ScreenManager
import ItemManager from './pages/items/itemManager'; 
import CreateItem from './pages/items/createItem';
import UpdateItem from './pages/items/updateItem';
import Header from './components/header';
import ResetPassword from './pages/reset-password';
import Items from './pages/items';
import { ThemeProvider } from '@mui/material/styles';
import Main from './themes/main';
import routes from './routes';

import './App.scss';

function App() {
  return (
    <ThemeProvider theme={Main}>
      <Router>
        <Header />
        <Routes>
          <Route path={routes.home} exact element={<Home />} />
          <Route path={routes.signin} exact element={<Signin />} />
          <Route path={routes.signup} exact element={<Signup />} />
          <Route path={routes.resetPassword} exact element={<ResetPassword />} />
          <Route path={routes.items} exact element={<Items />} />
          <Route path={routes.createScreen} element={<CreateScreen />} />
          <Route path={routes.updateScreen} element={<UpdateScreen />} />
          <Route path={routes.createItem} element={<CreateItem />} />
          <Route path={routes.updateItem} element={<UpdateItem />} />
          <Route path={routes.manageScreens} element={<ScreenManager />} />
          <Route path={routes.manageItems} element={<ItemManager />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;