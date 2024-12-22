import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TweetDetails from './pages/TweetDetails';
import About from './pages/About';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tweets/:id" element={<TweetDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
