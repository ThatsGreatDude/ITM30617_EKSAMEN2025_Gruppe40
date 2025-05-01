import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home'
import EventPage from './components/EventPage';
import './App.css'
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:events_id" element={<EventPage />} />
      </Routes>
    </Router>
  )
}

export default App;
