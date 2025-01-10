import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import '../stylesheets/HomeFeed.css';

function HomeFeed() {
    // JAVASCRIPT
    const url = "https://localhost:7081/api/TopArticles";

    const [articles, setArticles] = useState([]);   // External API articles
    const [favorites, setFavorites] = useState([]); // Favorited articles from DB

    // useEffect(()=>{
    //     async function getTopArticles() {
    //         try {
    //             const response = await fetch(url);
    //             if (!response.ok) {
    //                 throw new Error(`Response status: ${response.status}`);
    //             }
    //             const json = await response.json();
    //             // console.log(json);

    //             setTopArticlesJson(json);
    //         }
    //         catch (error) {
    //             alert(error.message);
    //             console.error(error.message);
    //         }
    //     }

    //     getTopArticles()
    // }, []);

    useEffect(() => {
        async function fetchArticlesAndFavorites() {
            try {
                // Fetch articles from external API
                const articlesResponse = await fetch("https://localhost:7081/api/TopArticles");
                const articlesData = await articlesResponse.json();

                // Fetch favorited articles from your backend
                const favoritesResponse = await fetch("https://localhost:7081/api/Favorites/GetFavorites");
                const favoritesData = await favoritesResponse.json();

                setArticles(articlesData);
                setFavorites(favoritesData);
            } catch (error) {
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
    

    // HTML
    return (
    <>
        <div className="page-header">
            <img src="/assets/home.svg" draggable="false" />
            <h1>Today's Top Stories</h1>
        </div>

        <div className="news-container">
            {topArticles}
        </div>

        {/* Search */}
        {/* <form method="post" action="">
            <input type="text" placeholder="Search for articles" />
        </form> */}

        {/* Filters */}
        {/* <form method="post" action="">
            <div className="filter-row">
                <button type="submit" name="filter" value="United States" className="">U.S.</button>
                <button type="submit" name="filter" value="Technology" className="">Technology</button>
                <button type="submit" name="filter" value="Entertainment" className="">Entertainment</button>
                <button type="submit" name="filter" value="Sports" className="">Sports</button>
                <button type="submit" name="filter" value="Science" className="">Science</button>
                <button type="submit" name="filter" value="Health" className="">Health</button>
            </div>
        </form> */}

        {/* Articles */}

    </>
    );
}

export default HomeFeed;