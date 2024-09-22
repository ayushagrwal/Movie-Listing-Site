import React, { useState, useEffect, useContext } from 'react';
import MovieSearch from '../Components/MovieSearch';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CircularProgress from '@mui/material/CircularProgress';
import { MovieContext } from '../MovieContext';

export default function MovieListingPage () {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { setSelectedMovie } = useContext(MovieContext);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://www.omdbapi.com/?apikey=b9bd48a6&s=marvel&page=${page}`)
      .then(response => {
        setMovies((prevMovies) => [...prevMovies, ...response.data.Search]);
        setLoading(false);
      });
  }, [page]);

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreMovies();
      }
    }, { threshold: 0.1 });
    observer.observe(document.querySelector('#load-more-trigger'));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <MovieSearch />

      <Grid container spacing={2} mt={2}>
        {movies?.map(movie => (
          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 400, backgroundColor: "#1E2832", padding:'16px' }} key={movie.imdbID} onClick={() => {
                setSelectedMovie(movie);
                navigate(`/movie`);
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="260"
                  image={movie.Poster}
                  alt={movie.Title}
                  sx={{ 
                    objectFit: 'cover',  // Ensures the image covers the area
                    objectPosition: 'top',  // Focuses on the top part of the image
                    borderRadius: '8px'
                  }}
                />
                <CardContent sx={{padding:'16px 0px'}}>
                  <Typography gutterBottom sx={{ color: '#ffffff', fontSize:'16px', fontWeight:'600', height: '48px' }}>
                    {movie.Title}
                  </Typography>
                  {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {movie.Year}
                  </Typography> */}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

        <div id="load-more-trigger"></div>
      {loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
    </>
  );
};

