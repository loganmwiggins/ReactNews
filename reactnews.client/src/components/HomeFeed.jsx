import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import '../stylesheets/HomeFeed.css';

function HomeFeed() {
    // JAVASCRIPT
    const [topArticlesJson, setTopArticlesJson] = useState([]);
    const url = "https://localhost:7081/api/TopArticles";

    useEffect(()=>{
        async function getTopArticles() {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const json = await response.json();
                // console.log(json);

                setTopArticlesJson(json);
            }
            catch (error) {
                alert(error.message);
                console.error(error.message);
            }
        }

        getTopArticles()
    }, []);

    const topArticles = topArticlesJson.map((article) => 
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
      

    // HTML
    return (
    <>
        <h1>Today's Top Stories</h1>

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