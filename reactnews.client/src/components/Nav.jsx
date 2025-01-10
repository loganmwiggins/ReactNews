import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../stylesheets/Nav.css';

function Nav() {
    // JAVASCRIPT
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    // Update the current date and time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/results?query=${searchQuery}`); // Navigate to the results page with the search query
        }
    };

    const formattedDate = currentDateTime.toLocaleDateString("en-US", {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });

    const formattedTime = currentDateTime.toLocaleTimeString("en-US", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    // HTML
    return (
        <div className="nav-container">
            {/* Main Row */}
            <div className="main-row">
                <div className="title">
                    <img src="/assets/react.svg" draggable="false" />
                    <h3>ReactNews</h3>
                </div>

                <div className="date">
                    <p>{formattedDate}</p>
                    <p>{formattedTime}</p>
                </div>
            </div>

            {/* Directory Row */}
            <div className="directory-row">
                <div className="directory-btns">
                    <button>Home</button>
                    <button>My Favorites</button>
                    <span>|</span>
                    <button type="submit" value="United States" className="">U.S.</button>
                    <button type="submit" value="Technology" className="">Technology</button>
                    <button type="submit" value="Entertainment" className="">Entertainment</button>
                    <button type="submit" value="Sports" className="">Sports</button>
                    <button type="submit" value="Science" className="">Science</button>
                    <button type="submit" value="Health" className="">Health</button>
                </div>
                
                <form onSubmit={handleSearch} className="search-container">
                    <input 
                        type="text"
                        className="searchbar" 
                        placeholder="Search for articles ..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* <button type="submit" className="btn-icon">
                        <img src="/assets/search.svg" draggable="false" />
                    </button> */}
                </form>
            </div>
        </div>
    );
}

export default Nav;
