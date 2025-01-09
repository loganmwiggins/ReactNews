import React from 'react';
import '../stylesheets/ArticleCard.css';

function ArticleCard({key, imagePath, title, author, dateTime, description}) {
    return (
        <div class="news-item">
            <img class="news-image" src={imagePath} alt="Article image" draggable="false" />
            <div class="news-title">{title}</div>
            
            <div class="news-meta">
                <span class="news-author">{author}</span> &bull;
                <span class="news-date">{dateTime.toString()}</span>
            </div>
            <p class="news-description">{description}</p>
        </div>
    );
}

export default ArticleCard