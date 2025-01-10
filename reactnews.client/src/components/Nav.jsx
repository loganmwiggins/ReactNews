import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../stylesheets/Nav.css';

function Nav() {
    // JAVASCRIPT
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/results?query=${searchQuery}`);  // Navigate to the results page with the search query
        }
    };

    // HTML
    return (
    <div className="nav-container">
        <div className="title">
            <img src="/assets/react.svg" draggable="false" />
            <h3>ReactNews</h3>
        </div>

        <form onSubmit={handleSearch} className="search-container">
            <input 
                type="text"
                className="searchbar" 
                placeholder="Search for articles" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn-icon">
                <img src="/assets/search.svg" draggable="false" />
            </button>
        </form>

        <button type="button" className="btn-icon">
            <img src="/assets/heart.svg" draggable="false" />
        </button>
    </div>
    )
}

export default Nav;