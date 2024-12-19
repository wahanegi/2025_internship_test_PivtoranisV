import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TweetDetails from './pages/TweetDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tweets/:id" element={<TweetDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
