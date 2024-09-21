import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MovieSearch ({ setMovies }) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);

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
          setMovies(response.data.Search);
        });
    }
  }, [debouncedQuery]);

  return (
    <input
      type="text"
      placeholder="Search for a movie..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
