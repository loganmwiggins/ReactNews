import React from 'react';
import '../stylesheets/ArticleCard.css';

function ArticleCard({imagePath, title, author, dateTime, description, url, source, isFavorited, setFavorites}) {

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
                <button type="button" className="btn-icon" onClick={toggleFavorite}>
                    <img
                        src={isFavorited ? "/assets/heart-filled.svg" : "/assets/heart.svg"}
                        style={isFavorited ? {filter: "none"} : {}}
                        alt="Favorite"
                        draggable="false"
                    />
                </button>
            </div>
        </div>
    );
}

export default ArticleCard;