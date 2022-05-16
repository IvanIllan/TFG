import { BrowserRouter, Routes, Route } from 'react-router-dom';

// UI components
import { ThemeProvider } from '@mui/material/styles';
// Components
import Home from './pages/home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Header from './components/header';
import ResetPassword from './pages/reset-password';
// Others
import Main from './themes/main';
import routes from './routes';

import './App.scss';

function App() {
  return (
    <>
      <ThemeProvider theme={Main}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={routes.home} exact element={<Home />} />
            <Route path={routes.signin} exact element={<Signin />} />
            <Route path={routes.signup} exact element={<Signup />} />
            <Route path={routes.resetPassword} exact element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;