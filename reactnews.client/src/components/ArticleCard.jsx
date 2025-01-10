import React from 'react';
import '../stylesheets/ArticleCard.css';

function ArticleCard({imagePath, title, author, dateTime, description, url, source}) {

    function openArticle(articleUrl) {
        window.open(articleUrl, "_blank");
    }

    async function addArticleToFavorites(article) {
        const articleData = {
            title,
            url,
            description,
            author, 
            imagePath,
            dateTime,
            source
        }

        try {
            const response = await fetch("https://localhost:7081/api/Favorites/Add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(articleData), // Convert article data to JSON
            });

            if (response.ok) {
                alert("Article added to favorites!");
                console.log("Article added to favorites!");
            } else {
                alert("Failed.")
                console.error("Failed to add article to favorites.");
            }
        } catch (error) {
            console.error("Error:", error);
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
                    onClick={(e) => {
                        e.stopPropagation();
                        addArticleToFavorites();
                    }}
                >
                    <img src="/assets/heart.svg" draggable="false" />
                </button>
            </div>
        </div>
    );
}

export default ArticleCard;