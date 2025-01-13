import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArticleCard from './ArticleCard';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    const [articles, setArticles] = useState([]);   // External API articles
    const [favorites, setFavorites] = useState([]); // Favorited articles from DB
    const [hidden, setHidden] = useState([]);   // Hidden articles from DB

    useEffect(() => {
        async function fetchAllArticles() {
            try {
                // Fetch articles from external API
                const articlesResponse = await fetch(`https://localhost:7081/api/HomeFeed/SearchedArticles/${query}`);
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
                //alert(error.message);
                console.error("Error fetching data:", error);
            }
        }

        // Call the fetch function whenever the query changes
        if (query) {
            fetchAllArticles();
        }
    }, [query]);

    // Helper function to check if an article is favorited
    const isFavorited = (articleUrl) => {
        return favorites.some((fav) => fav.url === articleUrl);
    };
    const isHidden = (articleUrl) => {
        return hidden.some((hid) => hid.url === articleUrl)
    };

    // Filter out hidden articles from list
    const visibleArticles = articles.filter((article) => !isHidden(article.url));

    const searchedArticles = visibleArticles.map((article) => 
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