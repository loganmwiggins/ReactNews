import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import ArticleCard from './ArticleCard';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    const [articlesJson, setArticlesJson] = useState([]);
    const url = "https://localhost:7081/api/SearchedArticles";
    
    // useEffect to listen for changes to 'query'
    useEffect(()=>{
        async function fetchSearchedArticles() {
            try {
                const response = await fetch(`${url}/${query}`);
                if (!response.ok) {
                    alert(response.status);
                    throw new Error(`Response status: ${response.status}`);
                }
                const json = await response.json();

                setArticlesJson(json);
            }
            catch (error) {
                alert(error.message);
                console.error(error.message);
            }
        }

        // Call the fetch function whenever the query changes
        if (query) {
            fetchSearchedArticles()
        }
    }, [query]);    // Add 'query' as a dependency

    const searchedArticles = articlesJson.map((article) => 
        <ArticleCard 
            key={article.url}
            imagePath={article.imagePath}
            title={article.title}
            author={article.author}
            dateTime={article.dateTime}
            description={article.description}
            url={article.url}
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
                        <p>No articles found for "{query}"</p>
                    )
                }
            </div>
        </div>
    );
}

export default SearchResults;