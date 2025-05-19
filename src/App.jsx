import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import EventPage from './components/EventPage';
import Dashboard from './components/DashBoard';
import Layout from './components/Layout';
import CategoryPage from './components/CategoryPage';
import './Styling/App.css';
import ArtistCard from './components/ArtistCard';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/event/:events_id" element={<EventPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="ArtistCard" element={<ArtistCard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;