import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import ChatPage from './pages/ChatPage';
import SearchPage from './components/search/SearchPage';
import CityDetail from './components/city/CityDetail';
import PlaceDetail from './components/place/PlaceDetail';
import NotFoundPage from './pages/NotFoundPage';

import './index.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/city/:cityId" element={<CityDetail />} />
            <Route path="/place/:placeId" element={<PlaceDetail />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;