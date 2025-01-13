import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Nav from './components/Nav';
import HomeFeed from './components/HomeFeed';
import SearchResults from './components/SearchResults';
import Favorites from './components/Favorites';
import Hidden from './components/Hidden';

function App() {
    return (
        <BrowserRouter>
            <div className="body-gradient"></div>
            <div>
                <Nav />

                {/* Content changes based on route */}
                <Routes>
                    {/* Home Page route */}
                    <Route path="/" element={<HomeFeed />} />

                    {/* Search Results route */}
                    <Route path="/results" element={<SearchResults />} />

                    {/* Favorites route */}
                    <Route path="/favorites" element={<Favorites />} />

                    {/* Hidden route */}
                    <Route path="/hidden" element={<Hidden />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;