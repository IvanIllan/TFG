import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Header from './components/header';
import ResetPassword from './pages/reset-password';
import Screens from './pages/screens';
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
          <Route path={routes.screens} exact element={<Screens />} />
          <Route path={routes.items} exact element={<Items />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;