import React, { useState, useEffect } from 'react';
import MovieSearch from '../Components/MovieSearch';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieTypeAhead = ({ movies }) => {
  const navigate = useNavigate();

  return (
    <ul>
      {movies?.map(movie => (
        <li key={movie.imdbID} onClick={() => navigate(`/movie/${movie.imdbID}`)}>
          {movie.Title} ({movie.Year})
        </li>
      ))}
    </ul>
  );
};

export default function MovieListingPage () {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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
    }, { threshold: 1.0 });
    observer.observe(document.querySelector('#load-more-trigger'));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <MovieSearch setMovies={setMovies} />
      <MovieTypeAhead movies={movies} />
      <div id="load-more-trigger"></div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

