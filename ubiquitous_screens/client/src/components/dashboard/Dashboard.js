import React from 'react';
import {
  Box,
  CssBaseline,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  AppBar,
  Toolbar,
  Hidden,
} from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportIcon from '@mui/icons-material/BarChart';
import ProductsIcon from '@mui/icons-material/Category';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PerformanceIcon from '@mui/icons-material/Speed';
import CustomersIcon from '@mui/icons-material/People';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import ItemIcon from '@mui/icons-material/Inventory';
import ScreenIcon from '@mui/icons-material/ScreenShare';
import LogoImg from '../../pages/home/images/logo.png';

const drawerWidth = 240;

function Dashboard({ onLogout }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/signin');
  };

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px 0',
          backgroundColor: '#222',
          height: '64px',
          boxSizing: 'border-box',
        }}
      >
        <img src={LogoImg} alt="logo" width="50px" />
      </Box>
      <Divider />
      <Box sx={{ flexGrow: 1 }}>
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon sx={{ color: '#333' }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ color: '#333' }} />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/item-manager">
            <ListItemIcon sx={{ color: '#333' }}>
              <ItemIcon />
            </ListItemIcon>
            <ListItemText primary="Item Manager" sx={{ color: '#333' }} />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/screen-manager">
            <ListItemIcon sx={{ color: '#333' }}>
              <ScreenIcon />
            </ListItemIcon>
            <ListItemText primary="Screen Manager" sx={{ color: '#333' }} />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/report">
            <ListItemIcon sx={{ color: '#333' }}>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Report" sx={{ color: '#333' }} />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/products">
            <ListItemIcon sx={{ color: '#333' }}>
              <ProductsIcon />
            </ListItemIcon>
            <ListItemText primary="Products" sx={{ color: '#333' }} />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/analytics">
            <ListItemIcon sx={{ color: '#333' }}>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" sx={{ color: '#333' }} />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/performance">
            <ListItemIcon sx={{ color: '#333' }}>
              <PerformanceIcon />
            </ListItemIcon>
            <ListItemText primary="Performance" sx={{ color: '#333' }} />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/customers">
            <ListItemIcon sx={{ color: '#333' }}>
              <CustomersIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" sx={{ color: '#333' }} />
          </ListItem>
        </List>
      </Box>
      <Divider />
      <List>
        <ListItem button component={Link} to="/dashboard/help">
          <ListItemIcon sx={{ color: '#333' }}>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Help Center" sx={{ color: '#333' }} />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/settings">
          <ListItemIcon sx={{ color: '#333' }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" sx={{ color: '#333' }} />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon sx={{ color: '#333' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: '#333' }} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#222',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit">
              <MailIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: 'flex',
          flexDirection: 'column',
          height: '100vh', // Ensure it takes full height of the viewport
          overflow: 'auto', // Enable scrolling
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Dashboard;
