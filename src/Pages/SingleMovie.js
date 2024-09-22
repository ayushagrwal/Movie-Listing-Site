import React, { useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Grid, Typography } from '@mui/material';
import { MovieContext } from '../MovieContext';

export default function SingleMoviePage ({ match }) {
  const { selectedMovie } = useContext(MovieContext);
  // console.log("selectedMovie",selectedMovie);

  if (!selectedMovie) return <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;

  return (
    <>
    <Grid container spacing={2} mt={2}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'start' }}>
          <Typography sx={{ color: "#E1B43C", fontSize: "32px", fontWeight: '600' }}>
            {selectedMovie.Title}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ justifyContent: 'start' }} mt={1}>
          <Typography sx={{ color: "#E1B43C", fontSize: "22px", fontWeight: '600' }}>
            Type
          </Typography>
          <Typography sx={{ color: '#ffffff', fontSize:'16px', fontWeight:'600'}}>
            {selectedMovie.Type}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ justifyContent: 'start' }} mt={1}>
          <Typography sx={{ color: "#E1B43C", fontSize: "22px", fontWeight: '600' }}>
            Year
          </Typography>
          <Typography sx={{ color: '#ffffff', fontSize:'16px', fontWeight:'600'}}>
            {selectedMovie.Year}
          </Typography>
        </Box>
      </Grid>
    </Grid>
      {/* Additional details */}
    </>
  );
};
