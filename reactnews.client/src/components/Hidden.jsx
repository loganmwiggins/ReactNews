import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';

function Hidden() {

    const [hidden, setHidden] = useState([]);

    useEffect(() => {
        async function fetchHiddenArticles() {
            try {
                const hiddenResponse = await fetch("https://localhost:7081/api/Hidden/GetHiddenArticles");
                const hiddenData = await hiddenResponse.json();

                setHidden(hiddenData);
            } 
            catch (error) {
                alert(error.message);
                console.error("Error fetching data:", error);
            }
        }

        fetchHiddenArticles();
    }, []);

    const hiddenArticles = hidden.map((article) => 
        <ArticleCard 
          key={article.url}
          {...article}
          isHidden={true}
          setHidden={setHidden}
        />
      );

    return (
    <>
        <div className="page-header">
        <img src="/assets/hidden.svg" draggable="false" />
            <h1>Hidden Articles</h1>
        </div>

        <div className="news-container">
        {
            hiddenArticles.length > 0 ? (
                hiddenArticles
            ) : (
                <>
                    <p className="empty-msg">No hidden articles yet.</p>
                    <p className="empty-msg">Click an article's <img src="/assets/hidden.svg" draggable="false" alt="Hidden icon"/> icon to hide it. The article will be hidden from all results and will only be accessible here.</p>
                </>
            )
        }
        </div>
    </>
    );
}

export default Hidden;