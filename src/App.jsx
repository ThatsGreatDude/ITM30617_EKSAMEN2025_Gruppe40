import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home'
import EventPage from './components/EventPage';
import './App.css'
import Layout from './components/Layout'
import CategoryPage from './components/CategoryPage';

function App() {
  return (
    <Router>
      <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/event/:events_id" element={<EventPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
          </Route>
      </Routes>
    </Router>
  )
}

export default App;
