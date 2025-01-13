import React from 'react';
import '../stylesheets/ArticleCard.css';

function ArticleCard({imagePath, title, author, dateTime, description, url, source, isFavorited, setFavorites, isHidden, setHidden}) {

    function openArticle(articleUrl) {
        window.open(articleUrl, "_blank");
    }

    // Add or remove article from favorites
    async function toggleFavorite(event) {
        event.stopPropagation(); // Prevent triggering the `onClick` for opening the article

        try {
            if (isFavorited) {
                // Remove article from favorites
                await fetch("https://localhost:7081/api/Favorites/Remove", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(url),
                });

                setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.url !== url));
            } else {
                // Validate article data
                if (title == null) title = "";
                if (author == null) author = "";
                if (dateTime == null) dateTime = "";
                if (description == null) description = "";
                if (imagePath == null) imagePath = "";
                if (url == null) url = "";
                if (source == null) source = "";

                // Add article to favorites
                const articleData = { title, author, dateTime, description, imagePath, url, source };
                await fetch("https://localhost:7081/api/Favorites/Add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(articleData),
                });

                setFavorites((prevFavorites) => [...prevFavorites, articleData]);
            }
        } catch (error) {
            alert("Error toggling favorite:", error);
            console.error("Error toggling favorite:", error);
        }
    }

    // Add or remove article from hidden
    async function toggleHidden(event) {
        event.stopPropagation(); // Prevent triggering the `onClick` for opening the article

        try {
            if (isHidden) {
                // Remove article from hidden
                await fetch("https://localhost:7081/api/Hidden/Remove", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(url),
                });

                setHidden((prevHidden) => prevHidden.filter((hid) => hid.url !== url));
            } else {
                // Validate article data
                if (title == null) title = "";
                if (author == null) author = "";
                if (dateTime == null) dateTime = "";
                if (description == null) description = "";
                if (imagePath == null) imagePath = "";
                if (url == null) url = "";
                if (source == null) source = "";

                // Add article to hidden
                const articleData = { title, author, dateTime, description, imagePath, url, source };
                await fetch("https://localhost:7081/api/Hidden/Add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(articleData),
                });

                setHidden((prevHidden) => [...prevHidden, articleData]);
            }
        } catch (error) {
            alert("Error toggling hidden:", error);
            console.error("Error toggling hidden:", error);
        }
    }


    
    return (
        <div className="news-item" onClick={() => openArticle(url)}>
            <div className="news-item-content">
                <img className="news-image" src={imagePath} alt="Article image" draggable="false" />

                <div className="news-text">
                    <div className="news-meta">
                        { author ? (<span className="news-author">{author} • </span>) : (<span></span>) }
                        <span className="news-date">{new Date(dateTime).toLocaleDateString()}</span>
                    </div>

                    <div className="news-title">{title}</div>
                    <p className="news-description">{description}</p>
                </div>
            </div>
            <div className="news-item-btns">
                <button 
                    type="button" 
                    className="btn-icon" 
                    style={isFavorited ? {display: "none"} : {}}
                    onClick={toggleHidden}
                    title="Hide this article"
                >
                    <img 
                        src={isHidden ? "/assets/hidden-filled.svg" : "/assets/hidden.svg"} 
                        draggable="false" 
                    />
                </button>
                <button 
                    type="button" 
                    className="btn-icon"
                    style={isHidden ? {display: "none"} : {}}
                    onClick={toggleFavorite}
                    title="Favorite this article"
                >
                    <img
                        src={isFavorited ? "/assets/heart-filled.svg" : "/assets/heart.svg"}
                        style={isFavorited ? {filter: "none"} : {}}
                        draggable="false"
                    />
                </button>
            </div>
        </div>
    );
}

export default ArticleCard;