import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import ArticleCard from './ArticleCard';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    const [articlesJson, setArticlesJson] = useState([]);
    const url = "https://localhost:7081/api/SearchedArticles";
    
    useEffect(()=>{
        async function getSearchedArticles() {
            try {
                const response = await fetch(`${url}/${query}`);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const json = await response.json();

                setArticlesJson(json);
            }
            catch (error) {
                console.error(error.message);
            }
        }

        getSearchedArticles()
    }, []);

    const searchedArticles = articlesJson.map((article) => 
        <ArticleCard 
            key={article.imagePath}
            imagePath={article.imagePath}
            title={article.title}
            author={article.author}
            dateTime={article.dateTime}
            description={article.description}
        />
    );

    return (
        <div>
            <h1>Search Results for: {query}</h1>
            <div className="news-container">
                {searchedArticles}
            </div>
        </div>
    );
}

export default SearchResults;