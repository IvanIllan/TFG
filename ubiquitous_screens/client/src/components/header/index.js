import * as React from 'react';
import { useAuth } from '../../AuthContext';
import { useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useLocation, useResolvedPath, useMatch, Link } from 'react-router-dom';
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
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
// Components
import CustomLink from '../custom-link';
import CustomAnchorLink from '../custom-anchor-link';
// Others
import routes from '../../routes';
import sections from './sections.js';
import pages from './pages.js';

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const [sectionSelected, setSectionSelected] = useState(null);
  const { isAuthenticated, signOut } = useAuth();

  const location = useLocation().pathname;
  const currentSections = sections.public[location] || [];

  const logo = () => {
    if (currentSections.length > 0) {
      return (
        <AnchorLink
          key="link-home"
          href="#home"
          offset="64"
          onClick={() => setSectionSelected(null)}
          style={{ textDecoration: 'none' }}
        >
          <img src={LogoImg} alt="logo" width="50px" />
        </AnchorLink>
      );
    } else {
      return (
        <Link to={routes.home}>
          <img src={LogoImg} alt="logo" width="50px" />
        </Link>
      );
    }
  };

    const menuLinks = () => {
    const color = 'primary';

    const pagesMenu = pages.public.map((page) => {
      const { id, title, path: to } = page;
      const resolved = useResolvedPath(to);
      const match = useMatch({ path: resolved.pathname, end: true });
      const linkProps = {
        title,
        to,
        active: !!match,
        onClickHandler: () => setSectionSelected(null),
        color
      };

      return <CustomLink key={`link-${id}`} {...linkProps} />;
    });

    const sectionsMenu = currentSections.map((section) => {
      const { id, title, path: to } = section;
      const linkProps = {
        id,
        title,
        to,
        active: sectionSelected === id,
        onClickHandler: () => setSectionSelected(id),
        color
      };

      return <CustomAnchorLink key={`anchor-link-${id}`} {...linkProps} />;
    });

    return sectionsMenu.concat(pagesMenu);
  };

  const homeLinks = () => {
    const color = 'primary';

    const pagesMenu = pages.private.map((page) => {
      const { id, title, path: to } = page;
      const resolved = useResolvedPath(to);
      const match = useMatch({ path: resolved.pathname, end: true });
      const linkProps = {
        title,
        to,
        active: !!match,
        onClickHandler: () => setSectionSelected(null),
        color
      };

      return <CustomLink key={`link-${id}`} {...linkProps} />;
    });

    const sectionsMenu = currentSections.map((section) => {
      const { id, title, path: to } = section;
      const linkProps = {
        id,
        title,
        to,
        active: sectionSelected === id,
        onClickHandler: () => setSectionSelected(id),
        color
      };

      return <CustomAnchorLink key={`anchor-link-${id}`} {...linkProps} />;
    });

    return sectionsMenu.concat(pagesMenu);
  };

  const loggedInLinks = () => {
    return isAuthenticated ? (
      <>
        {console.log("autentifica bien")}
        {homeLinks()}
      </>
    ) : (
      <>
        {menuLinks()}
      </>
    );
  };

  return (
    <AppBar position="fixed" color="light" elevation={0} data-testid="header">
      <Toolbar disableGutters sx={{ padding: { xs: '0', md: '0px 40px' } }}>
        <Box sx={{ flexGrow: 1, padding: '5.5px 0', display: { xs: 'none', md: 'flex' } }}>
          {logo()}
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
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' }
            }}
          >
            {currentSections.map((section) => (
              <MenuItem key={section.id} onClick={handleCloseNavMenu}>
                <AnchorLink
                  offset="64"
                  key={`link-${section.id}`}
                  href={section.path}
                  onClick={() => setSectionSelected(section.id)}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    textAlign="center"
                    color="primary"
                    sx={{ fontWeight: sectionSelected === section.id ? 'bold' : 'medium' }}
                  >
                    {section.title}
                  </Typography>
                </AnchorLink>
              </MenuItem>
            ))}
            {pages.public.map((page) => (
              <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                <Link
                  offset="64"
                  key={`link-${page.id}`}
                  to={page.path}
                  onClick={() => setSectionSelected(page.id)}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    textAlign="center"
                    color="primary"
                    sx={{ fontWeight: sectionSelected === page.id ? 'bold' : 'medium' }}
                  >
                    {page.title}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Stack
          direction="row"
          spacing={3}
          justifyContent="right"
          alignItems="right"
          sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
        >
          {loggedInLinks()}
        </Stack>
        <Box sx={{ flexGrow: 1, padding: '5.5px 0', display: { xs: 'flex', md: 'none' } }}>
          {logo()}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;