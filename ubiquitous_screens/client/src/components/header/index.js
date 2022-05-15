import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import LogoImg from '../../pages/home/images/logo.png';
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

export const Header = ({ pages }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const [pageSelected, setPageSelected] = useState(null);

  return (
    <AppBar position="fixed" color="light" elevation={0}>
      <Toolbar disableGutters sx={{ padding: { xs: '0', md: '0px 40px' } }}>
        <Box sx={{ flexGrow: 1, padding: '5.5px 0', display: { xs: 'none', md: 'flex' } }}>
          <AnchorLink
            key="link-home"
            href="#home"
            offset="64"
            onClick={() => setPageSelected(null)}
            style={{ textDecoration: 'none' }}
          >
            <img src={LogoImg} alt="logo" width="50px" />
          </AnchorLink>
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
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <AnchorLink
                  offset="64"
                  key={`link-${page.toLowerCase()}`}
                  href={`#${page.toLowerCase()}`}
                  onClick={() => setPageSelected(page)}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    textAlign="center"
                    color="primary"
                    sx={{ fontWeight: pageSelected === page ? 'bold' : 'medium' }}
                  >
                    {page}
                  </Typography>
                </AnchorLink>
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
          {pages.map((page) => (
            <AnchorLink
              offset="64"
              key={`link-${page.toLowerCase()}`}
              href={`#${page.toLowerCase()}`}
              onClick={() => setPageSelected(page)}
              style={{ textDecoration: 'none' }}
            >
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                color="primary"
                underline="none"
                size="large"
                sx={{
                  fontWeight: pageSelected === page ? 'bold' : 'medium',
                  padding: '7px 21px'
                }}
                variant={pageSelected === page ? 'outlined' : 'text'}
              >
                {page}
              </Button>
            </AnchorLink>
          ))}
        </Stack>
        <Box sx={{ flexGrow: 1, padding: '5.5px 0', display: { xs: 'flex', md: 'none' } }}>
          <AnchorLink
            key="link-home"
            href="#home"
            offset="64"
            onClick={() => setPageSelected(null)}
            style={{ textDecoration: 'none' }}
          >
            <img src={LogoImg} alt="logo" width="50px" />
          </AnchorLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

Header.propTypes = {
  pages: PropTypes.array.isRequired
};