import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
      <AppBar position="static" sx={{backgroundColor: "#FFFFFF31"}}>
        <Toolbar>
            <Box display="flex" justifyContent="center" width="100%">
                <Box component="img" width="100px" src="/assets/Trello-logo.png" />
            </Box>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}