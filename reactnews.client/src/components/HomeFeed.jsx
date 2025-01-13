import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import '../stylesheets/HomeFeed.css';

function HomeFeed() {
    const [articles, setArticles] = useState([]);   // External API articles
    const [favorites, setFavorites] = useState([]); // Favorited articles from DB

    useEffect(() => {
        async function fetchArticlesAndFavorites() {
            try {
                // Fetch articles from external API
                const articlesResponse = await fetch("https://localhost:7081/api/HomeFeed/TopArticles");
                const articlesData = await articlesResponse.json();

                // Fetch favorited articles from backend
                const favoritesResponse = await fetch("https://localhost:7081/api/Favorites/GetFavorites");
                const favoritesData = await favoritesResponse.json();

                setArticles(articlesData);
                setFavorites(favoritesData);
            } 
            catch (error) {
                alert(error.message);
                console.error("Error fetching data:", error);
            }
        }

        fetchArticlesAndFavorites();
    }, []);

    // Helper function to check if an article is favorited
    const isFavorited = (articleUrl) => {
        return favorites.some((fav) => fav.url === articleUrl);
    };

    const topArticles = articles.map((article) => 
        <ArticleCard 
            key={article.url}
            {...article}
            isFavorited={isFavorited(article.url)}
            setFavorites={setFavorites}
        />
    );
    


    return (
    <>
        <div className="page-header">
            <img src="/assets/home.svg" draggable="false" />
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