import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function SingleMoviePage ({ match }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?apikey=b9bd48a6&i=${id}`)
      .then(response => setMovie(response.data));
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h1>{movie.Title}</h1>
      <p>{movie.Year}</p>
      <img src={movie.Poster} alt={movie.Title} />
      {/* Additional details */}
    </div>
  );
};
