import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieListing from './Pages/MovieListing';
import SingleMovie from './Pages/SingleMovie';
import Layout from './Pages/Layout';

function App() {
  return (
    <Router basename="/Movie-Listing-Site">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MovieListing />} />
          <Route path="/movie" element={<SingleMovie />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
