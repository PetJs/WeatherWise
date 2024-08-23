import { useState, useContext } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import SidebarItem from './SidebarItem';
import { SidebarItemContext } from './SidebarContext';
import { Box, IconButton, useTheme, Button } from '@mui/material';
import { tokens, ColorModeContext } from '../../../theme';


const Sidebarr = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext); // Access the color mode context
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  
  const sidebarItems = [
    { icon: 'cloud-sun', label: 'Weather', link: '/weather' },
    { icon: 'city', label: 'Cities', link: '/cities' },
    { icon: 'map', label: 'Map', link: '/map' },
    { icon: 'cog', label: 'Settings', link: '/settings' },
    { icon: 'user', label: 'Account', link: '/account' },
  ];

  return (
    <Box 
      sx={{
        height: '100vh', // Ensures the sidebar takes up the full height of the viewport
        padding: 0,
        margin: 0,
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          display: 'flex',
          alignItems: 'center',
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        }
      }}
    >
      <Sidebar collapsed={open} style={{ height: '100%', overflowY: 'auto' }}>
        <Menu style={{ display: 'flex', flexDirection: 'column', margin: "10px" }}>
          <MenuItem
            onClick={() => setOpen(!open)}
            icon={open ? <IconButton><i className="fa fa-bars"></i></IconButton> : undefined}
            style={{
              margin: "20px 0 30px 0",
              color: colors.grey[200],
            }}
          >
            {!open && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="5px"
              >
                <h1 style={{ color: colors.grey[100] }}>
                  Weather
                </h1>
                <IconButton onClick={() => setOpen(!open)}>
                  <i className="fa fa-bars"></i>
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* Menu Items */}
          <Box paddingLeft={open ? undefined : "5%"}>
            {sidebarItems.map((item, index) => (
              <SidebarItemContext.Provider key={index} value={item}>
                <a href={item.link}  style={{ 
                  textDecoration: "none", 
                  fontSize: "22px",
                  color: "#fff", }}>

                  <MenuItem
                    icon = {<i className={`fas fa-${item.icon}`}></i>}
                    style={{
                      marginBottom: "10px", // Space below each item
                      marginTop: "10px",
                    }}
                  >
                    {!open && item.label}
                  </MenuItem> 
                </a>
              </SidebarItemContext.Provider>   
            ))}
          </Box>

          {/* Dark Mode Toggle Button */}
          <Box marginTop="30px" textAlign="center">
            <IconButton
              onClick={colorMode.toggleColorMode}
              sx={{
                width: "40px", // Keep a consistent width
                padding: "6px",
                transition: "width 0.3s ease",
              }}
            >
              {theme.palette.mode === "dark" ? (
                <i className="fa fa-sun"></i> // Sun icon for dark mode
              ) : (
                <i className="fa fa-moon"></i> // Moon icon for light mode
              )}
            </IconButton>
          </Box>


        </Menu>
      </Sidebar>
    </Box>
  );
};

export default Sidebarr;
