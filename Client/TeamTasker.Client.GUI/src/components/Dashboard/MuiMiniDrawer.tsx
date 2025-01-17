import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import UserElements from './UserElements';
import LogoOrange from "../../assets/logo_orange.png";

import AppBar from "../Navigation/AppBar/AppBar.tsx";
import {DrawerHeader, Drawer} from "../Navigation/Drawer/DrawerHelpers.tsx";
import ModulesLinks from "../Navigation/Drawer/ModulesLinks.tsx";


export default function MuiMiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <AppBar sx={{backgroundColor: "white"}} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon sx={{color: "#363b4d"}} />
          </IconButton>
          {/*Here is the top navbar*/}
          <UserElements />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}
      >
        <DrawerHeader sx={{backgroundColor: "#363b4d"}}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <><span style={{color: "white"}}>{"TeamTasker  "}</span><ChevronLeftIcon /></>}
          </IconButton>
        </DrawerHeader>

        <Divider />

        {/*Drawers sidebar body*/}
        <Box sx={{width: "100%", height:"100%", backgroundColor: "#363b4d"}}>
          <ModulesLinks isOpen={open}/>
        </Box>
        {/*End of drawers sidebar body*/}
        <Box sx={{backgroundColor: "#363b4d"}}>
          <img src={LogoOrange} style={{width: `calc(${theme.spacing(7)} - 15px)`}}/>
        </Box>
      </Drawer>
    </>
  );
}