import React from 'react';
import '../stylesheets/ArticleCard.css';

function ArticleCard({imagePath, title, author, dateTime, description, url}) {

    function openArticle(articleUrl) {
        window.open(articleUrl, "_blank");
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
                <button type="button" className="btn-icon">
                    <img src="/assets/heart.svg" draggable="false" />
                </button>
            </div>
        </div>
    );
}

export default ArticleCard;