import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import '../stylesheets/HomeFeed.css';

function HomeFeed() {
    const [articles, setArticles] = useState([]);   // External API articles
    const [favorites, setFavorites] = useState([]); // Favorited articles from DB
    const [hidden, setHidden] = useState([]);   // Hidden articles from DB

    useEffect(() => {
        async function fetchAllArticles() {
            try {
                // Fetch articles from external API
                const articlesResponse = await fetch("https://localhost:7081/api/HomeFeed/TopArticles");
                const articlesData = await articlesResponse.json();

                // Fetch favorited articles from backend
                const favoritesResponse = await fetch("https://localhost:7081/api/Favorites/GetFavorites");
                const favoritesData = await favoritesResponse.json();

                // Fetch hidden articles from backend
                const hiddenResponse = await fetch("https://localhost:7081/api/Hidden/GetHiddenArticles");
                const hiddenData = await hiddenResponse.json();

                setArticles(articlesData);
                setFavorites(favoritesData);
                setHidden(hiddenData);
            } 
            catch (error) {
                alert(error.message);
                console.error("Error fetching data:", error);
            }
        }

        fetchAllArticles();
    }, []);

    // Helper function to check if an article is favorited or hidden
    const isFavorited = (articleUrl) => {
        return favorites.some((fav) => fav.url === articleUrl);
    };
    const isHidden = (articleUrl) => {
        return hidden.some((hid) => hid.url === articleUrl)
    };

    // Filter out hidden articles from list
    const visibleArticles = articles.filter((article) => !isHidden(article.url));

    const topArticles = visibleArticles.map((article) => 
        <ArticleCard 
            key={article.url}
            {...article}
            isFavorited={isFavorited(article.url)}
            setFavorites={setFavorites}
            isHidden={isHidden(article.url)}
            setHidden={setHidden}
        />
    );
    


    return (
    <>
        <div className="page-header">
            <img src="/assets/home.svg" draggable="false" alt="Home Icon" />
            <h1>Today's Top Stories</h1>
        </div>

        <div className="news-container">
        {
            topArticles.length > 0 ? (
                topArticles
            ) : (
                <p className="empty-msg">Loading ...</p>
            )
        }
        </div>
    </>
    );
}

export default HomeFeed;