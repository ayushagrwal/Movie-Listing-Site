import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TextField, List, ListItem, ListItemText, Paper, ClickAwayListener } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Ensure react-router is being used for navigation
import { MovieContext } from '../MovieContext';

export default function MovieSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [moviesDropdown, setMoviesDropdown] = useState([]);
  const { setSelectedMovie } = useContext(MovieContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false); // Control dropdown visibility

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Debounce API call

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      axios
        .get(`https://www.omdbapi.com/?apikey=b9bd48a6&s=${debouncedQuery}`)
        .then(response => {
          if (response.data.Search) {
            setMoviesDropdown(response.data.Search);
            setShowDropdown(true); // Show dropdown when results are available
          }
        });
    } else {
      setMoviesDropdown([]);
      setShowDropdown(false); // Hide dropdown if no query or results
    }
  }, [debouncedQuery]);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setShowDropdown(false);
    navigate(`/movie`);
  };

  const handleClickAway = () => {
    setShowDropdown(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div style={{ position: 'relative' }}>
        <TextField
          fullWidth
          placeholder="Search..."
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: '8px',
            fontSize: "12px",
            fontWeight: '500',
            height: '50px',
            '& .MuiInputBase-root': {
              height: '100%', // Ensures the input matches the height
            },
          }}
          onChange={(e) => setQuery(e.target.value)}
        />

        {showDropdown && moviesDropdown.length > 0 && (
          <Paper style={{ 
            position: 'absolute', 
            top: '55px', 
            left: 0, 
            right: 0, 
            zIndex: 1, 
            maxHeight: '300px',
            overflowY: 'auto',
            cursor: 'pointer'
          }}>
            <List>
              {moviesDropdown.map((movie) => (
                <ListItem button key={movie.imdbID} onClick={() => handleMovieSelect(movie)}>
                  <ListItemText primary={movie.Title} secondary={movie.Year} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </div>
    </ClickAwayListener>
  );
};
