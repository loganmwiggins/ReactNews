import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react";
import '../stylesheets/Nav.css';

function Nav() {
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
            setSearchQuery(""); // Clear search input
        }
    };

    const handleDirectory = (topic) => {
        if (topic == "Home") { navigate("/"); }
        else if (topic == "Favorites") { navigate("/favorites"); }
        else if (topic == "Hidden") { navigate("/hidden"); }
        else { navigate(`/results?query=${topic}`); }

        setSearchQuery(""); // Clear search input
    }

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
                <div className="title" title="by Vraj Patel & Logan Wiggins">
                    <motion.img
                        src="/assets/react.svg"
                        draggable="false"
                        animate={{ rotate: 360 }}
                        transition={{
                            repeat: Infinity,
                            duration: 10,
                            ease: "linear",
                        }}
                    />
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
                    <button type="button" onClick={() => handleDirectory("Home")}>Home</button>
                    <button type="button" onClick={() => handleDirectory("Favorites")}>Favorites</button>
                    <button type="button" onClick={() => handleDirectory("Hidden")}>Hidden</button>
                    <span>|</span>
                    <img src="/assets/compass.svg" draggable="false" />
                    <button type="button" onClick={() => handleDirectory("United States")}>U.S.</button>
                    <button type="button" onClick={() => handleDirectory("Technology")}>Tech</button>
                    <button type="button" onClick={() => handleDirectory("Entertainment")}>Entertainment</button>
                    <button type="button" onClick={() => handleDirectory("Sports")}>Sports</button>
                    <button type="button" onClick={() => handleDirectory("Science")}>Science</button>
                    <button type="button" onClick={() => handleDirectory("Health")}>Health</button>
                </div>
                
                <form onSubmit={handleSearch} className="search-container">
                    <input 
                        type="text"
                        id="searchbar"
                        className="searchbar" 
                        placeholder="Search for articles ..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
            </div>
        </div>
    );
}

export default Nav;
