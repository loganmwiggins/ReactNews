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
            // Navigate to the results page with the search query
            navigate(`/results?query=${searchQuery}`);
        }
    };

    // HTML
    return (
    <div className="nav-container">
        <p>ReactNews</p>

        <form onSubmit={handleSearch}>
            <input 
                type="text" 
                placeholder="Search for articles" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>

        <button type="button">Favorites</button>
    </div>
    )
}

export default Nav;