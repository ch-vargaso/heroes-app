/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import HeroCard from "../components/HeroCard";
import { AuthContext } from "../contexts/AuthContext";
import { db } from "../Firebase";
import {
  collection,
  doc,
  getDocs,
  // onSnapshot,
  // query,
} from "firebase/firestore";
import { FavouritesContext } from "../contexts/FavoritesContext";

function Feed() {
  const { user } = useContext(AuthContext);
  const { favourites } = useContext(FavouritesContext);

  console.log('favourites :>> ', favourites);

  const [heros, setHeros] = useState(null);
  const [heroSearch, setHeroSearch] = useState("");
  const [heroHome, setHeroHome] = useState(null);

  console.log("busqueda", heroSearch);

  // +++++++++++++Search Fetch +++++++++++++++++

  const url = `https://www.superheroapi.com/api.php/10166984457950198/search/${heroSearch}`;

  useEffect(() => {
    const fechtHero = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setHeros(result.results);
        console.log("heros", result.results);
      } catch (error) {
        console.log("error", error);
      }
    };
    fechtHero();
  }, [heroSearch, url]);

  // +++++++++++++++++++++     Hero Fetch Homepage +++++++++++++++++++++++++
  useEffect(() => {
    const herosHomepage = () => {
      const heroesNumber = 5;
      const apiKey = "10166984457950198";
      const baseUrl = "https://www.superheroapi.com/api.php/";
      const getRandomIds = (count) => {
        const maxHeroId = 731;
        const ids = new Set();
        while (ids.size < count) {
          const randomId = Math.floor(Math.random() * maxHeroId) + 1;
          ids.add(randomId);
        }
        return Array.from(ids);
      };
      const heroesIds = getRandomIds(heroesNumber);
      const heroesArray = heroesIds.map((id) => `${baseUrl}${apiKey}/${id}`);

      let promisesArray = heroesArray.map((singleUrl) => {
        return fetch(singleUrl).then((singleResponse) => {
          return singleResponse.json();
        });
      });
      Promise.all(promisesArray).then((resultado) => {
        console.log("Array de heroes para homepage", resultado);
        setHeroHome(resultado);
      });
    };
    herosHomepage();
  }, []);

  const getAllFavourites = async () => {
    if (user) {
      try {
        const userRef = doc(db, `users/${user.uid}`);
        const heroFavRef = collection(userRef, "favourites");
        const querySnapShot = await getDocs(heroFavRef);
        // this is important if I want to have the fav heroes only from one user... now i'm working on the general favs...
        // const querySnapShot = await getDocs(collection(db, `${userID}`));
        const herosArray = [];
        querySnapShot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          const heroFav = {
            docId: doc.id,
            ...doc.data(),
          };
          herosArray.push(heroFav);
          console.log("heros array", herosArray);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getAllFavourites();
  }, [user]);

  return (
    <div className="feed-container">
      <div className="search-bar">
        <label className="search-label" htmlFor="search-hero">
          find Your Hero
        </label>
        <input
          className="search-input"
          type="text"
          name="search-hero"
          id="search-hero"
          placeholder="Search your Hero..."
          onChange={(event) => setHeroSearch(event.target.value)}
        />
      </div>
      <div className="result">
        {heros &&
          heros
            .filter((hero) => {
              return heroSearch.toLowerCase() === ""
                ? hero
                : hero.name.toLowerCase().includes(heroSearch);
            })
            .map((hero) => {
              return (
                <div className="heros-container">
                  <HeroCard hero={hero} />
                </div>
              );
            })}
      </div>
      <h2>Discover Epic Heroes</h2>
      <div className="result">
        {heroHome &&
          heroHome.map((hero) => {
            return (
              <div className="heros-container">
                <HeroCard hero={hero} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default Feed;
