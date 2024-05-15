// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Explorer from './Explorer';
import Chat from './Chat';
import Create from './Create';
import Navbar from './Navbar';

const App = () => {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
};

export default App;
