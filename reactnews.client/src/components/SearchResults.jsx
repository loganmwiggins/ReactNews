import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArticleCard from './ArticleCard';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    const [articles, setArticles] = useState([]);   // External API articles
    const [favorites, setFavorites] = useState([]); // Favorited articles from DB

    useEffect(() => {
        async function fetchArticlesAndFavorites() {
            try {
                // Fetch articles from external API
                const articlesResponse = await fetch(`https://localhost:7081/api/SearchedArticles/${query}`);
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

        // Call the fetch function whenever the query changes
        if (query) {
            fetchArticlesAndFavorites();
        }
    }, [query]);

    // Helper function to check if an article is favorited
    const isFavorited = (articleUrl) => {
        return favorites.some((fav) => fav.url === articleUrl);
    };

    const searchedArticles = articles.map((article) => 
        <ArticleCard 
            key={article.url}
            {...article}
            isFavorited={isFavorited(article.url)}
            setFavorites={setFavorites}
        />
    );



    return (
        <div>
            <div className="page-header">
                <img src="/assets/search.svg" draggable="false" />
                <h1>{query}</h1>
            </div>
            <div className="news-container">
            {
                searchedArticles.length > 0 ? (
                    searchedArticles
                ) : (
                    <p className="empty-msg">No articles found for "{query}".</p>
                )
            }
            </div>
        </div>
    );
}

export default SearchResults;