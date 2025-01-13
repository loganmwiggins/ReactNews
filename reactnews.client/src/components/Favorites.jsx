import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';

function Favorites() {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const favoritesResponse = await fetch("https://localhost:7081/api/Favorites/GetFavorites");
        const favoritesData = await favoritesResponse.json();

        setFavorites(favoritesData);
      } 
      catch (error) {
        alert(error.message);
        console.error("Error fetching data:", error);
      }
    }

    fetchFavorites();
  }, []);

  const favArticles = favorites.map((article) => 
    <ArticleCard 
      key={article.url}
      {...article}
      isFavorited={true}
      setFavorites={setFavorites}
    />
  );



  return (
  <>
    <div className="page-header">
      <img src="/assets/heart.svg" draggable="false" alt="Heart icon" />
      <h1>My Favorites</h1>
    </div>

    <div className="news-container">
    {
      favArticles.length > 0 ? (
        favArticles
      ) : (
        <>
          <p className="empty-msg">No favorited articles yet.</p>
          <p className="empty-msg">Click an article's <img src="/assets/heart.svg" draggable="false" alt="Heart icon" /> icon to save it here.</p>
        </>
      )
    }
    </div>
  </>
  );
}

export default Favorites;