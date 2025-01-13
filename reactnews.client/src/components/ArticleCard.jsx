import React from 'react';
import '../stylesheets/ArticleCard.css';

function ArticleCard({imagePath, title, author, dateTime, description, url, source, isFavorited, setFavorites, isHidden, setHidden}) {

    function openArticle(articleUrl) {
        window.open(articleUrl, "_blank");
    }

    function shareArticle(event) {
        event.stopPropagation(); // Prevent triggering the `onClick` for opening the article

        if (navigator.share) {
            navigator
                .share({
                    title: title,
                    text: `Check out this article: ${title}`,
                    url: url,
                })
                .then(() => console.log("Article shared successfully!"))
                .catch((error) => console.error("Error sharing article:", error));
        } else {
            alert("Sharing is not supported on your browser. Please copy the URL manually.");
        }
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
                const articleData = {
                    title: title || "",
                    author: author || "",
                    dateTime: dateTime || "",
                    description: description || "",
                    imagePath: imagePath || "",
                    url: url || "",
                    source: source || "",
                };

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

                // Add article to hidden
                const articleData = {
                    title: title || "",
                    author: author || "",
                    dateTime: dateTime || "",
                    description: description || "",
                    imagePath: imagePath || "",
                    url: url || "",
                    source: source || "",
                };

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
                        alt="Hidden icon"
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
                        alt="Favorite icon"
                    />
                </button>
                <button 
                    type="button" 
                    className="btn-icon"
                    onClick={shareArticle}
                    title="Share this article"
                >
                    <img src="/assets/share.svg" draggable="false" />
                </button>
            </div>
        </div>
    );
}

export default ArticleCard;