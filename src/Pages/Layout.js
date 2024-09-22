
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {Box, Grid, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Layout () {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "#140519", minHeight: '100vh', height: '100%', flexGrow:'1', padding:'8px'}}>
      <Grid container spacing={1} justifyContent="space-between">
        <Grid item xs={6}>
          <Typography sx={{ color: "#E1B43C", fontSize: "32px", fontWeight: '600', cursor: 'pointer' }} onClick={() => navigate('/')}>
            Movie List
          </Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
          <Typography 
            sx={{ color: "#ffffff", fontSize: "12px", fontWeight: '500', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate('/')}
          >
            Home
          </Typography>
        </Grid>
      </Grid>
        <main style={{ flexGrow: 1}}>
          <Outlet /> {/* This will render the matched child route */}
        </main>
    </Box>
  );
};
