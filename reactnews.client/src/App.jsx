import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Nav from './components/Nav';
import HomeFeed from './components/HomeFeed';
import SearchResults from './components/SearchResults';
import Favorites from './components/Favorites';

function App() {
    return (
        <BrowserRouter>
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
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;