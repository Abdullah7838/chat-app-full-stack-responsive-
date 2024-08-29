import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Chat from './components/Chat';
import Login from './components/Login';
import Signup from './components/Signup';
import WorldChat from './components/WorldChat';
import './App.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact/:id" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/world" element={<WorldChat />} />

      </Routes>
    </Router>
  );
}

export default App;
