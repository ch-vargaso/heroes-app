import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FavouritesContext } from "../contexts/FavoritesContext";

function HeroCard({ hero }) {
  const { user } = useContext(AuthContext);
  const { favourites, addFav, deleteHero } = useContext(FavouritesContext);
  const [isfavorite, setIsFavorite] = useState(false);
  const [docId, setDocId] = useState(null);

  useEffect(() => {
    const check = favourites.some((h) => {
      return h.id === hero.id;
    });
    setIsFavorite(check);
    if (check) {
      const findId = favourites.find((h) => {
        return h.id === hero.id;
      });
      setDocId(findId.docId);
    }
    console.log("check", check);
  }, [favourites, hero.id]);

  return (
    <div key={hero.id} className="home-card-container">
      {user ? (
        !isfavorite ? (
          <img
            className="bookmark"
            src="images/bookmark1.png"
            alt="add-favorite"
            onClick={() => addFav(hero)}
          />
        ) : (
          <img
            className="bookmark"
            src="images/bookmark2.png"
            alt="favorite-added"
            onClick={() => deleteHero(hero, docId)}
          />
        )
      ) : null}
      <div className="card-content-container">
        <p className="home-card-title">{hero.name}</p>
        <Link to={`/character/${hero.id}/${hero.name}`}>
          <img className="home-card-img" src={hero.image.url} alt="hero-home" />
        </Link>
      </div>
    </div>
  );
}

export default HeroCard;