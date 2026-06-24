import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Movie, Bookmark, Home } from '@mui/icons-material';

function Navbar() {
  return (
    <AppBar position="static" color="primary" sx={{ mb: 4 }}>
      <Toolbar>
        <Movie sx={{ mr: 2 }} />
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
          Cinema Booking
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/" startIcon={<Home />}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/my-bookings" startIcon={<Bookmark />}>
            My Bookings
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;