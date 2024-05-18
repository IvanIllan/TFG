import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoImg from '../../pages/home/images/logo.png';
// UI components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
// Others
import routes from '../../routes';
import sections from './sections.js';
import pages from './pages.js';

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate(routes.signin);
  };

  const logo = (
    <Link to={routes.home}>
      <img src={LogoImg} alt="logo" width="50px" />
    </Link>
  );

  const renderLinks = (links) => {
    return links.map(({ id, title, path }) => {
      const isActive = location === path;
      const linkProps = {
        key: id,
        to: path,
        style: { textDecoration: 'none', color: isActive ? 'primary' : 'inherit' },
        onClick: handleCloseNavMenu
      };

      return (
        <Link {...linkProps}>
          <Typography
            textAlign="center"
            color="primary"
            sx={{ fontWeight: isActive ? 'bold' : 'medium' }}
          >
            {title}
          </Typography>
        </Link>
      );
    });
  };

  const sectionsLinks = renderLinks(sections.public[location] || []);
  const publicPageLinks = renderLinks(pages.public);
  const privatePageLinks = renderLinks(pages.private);

  const loggedInLinks = (
    <>
      {privatePageLinks}
      <Button color="primary" onClick={handleLogout}>Logout</Button>
    </>
  );

  const loggedOutLinks = (
    <>
      {publicPageLinks}
    </>
  );

  return (
    <AppBar position="fixed" color="light" elevation={0} data-testid="header">
      <Toolbar disableGutters sx={{ padding: { xs: '0', md: '0px 40px' } }}>
        <Box sx={{ flexGrow: 1, padding: '5.5px 0', display: { xs: 'none', md: 'flex' } }}>
          {logo}
        </Box>
        <Box sx={{ flexGrow: 1, flex: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="appbar menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="primary"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            {sectionsLinks}
            {isAuthenticated ? loggedInLinks : loggedOutLinks}
          </Menu>
        </Box>
        <Stack direction="row" spacing={3} justifyContent="right" alignItems="right" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {isAuthenticated ? loggedInLinks : loggedOutLinks}
        </Stack>
        <Box sx={{ flexGrow: 1, padding: '5.5px 0', display: { xs: 'flex', md: 'none' } }}>
          {logo}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;