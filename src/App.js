import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieListing from './Pages/MovieListing';
import SingleMovie from './Pages/SingleMovie';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieListing />} />
        {/* <Route path="/movie/:id" element={<SingleMovie />} /> */}
        <Route path="/movie/:id" element={<SingleMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
