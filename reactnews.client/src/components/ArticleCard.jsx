import React from 'react';
import '../stylesheets/ArticleCard.css';

function ArticleCard({key, imagePath, title, author, dateTime, description}) {
    return (
        <div className="news-item">
            <p>{key}</p>
            <img className="news-image" src={imagePath} alt="Article image" draggable="false" />
            <div className="news-title">{title}</div>
            
            <div className="news-meta">
                <span className="news-author">{author}</span> &bull;
                <span className="news-date">{dateTime.toString()}</span>
            </div>
            <p className="news-description">{description}</p>
        </div>
    );
}

export default ArticleCard