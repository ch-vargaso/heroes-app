import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { FavouritesContext } from "../contexts/FavoritesContext";
import { useParams } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';

function Character() {
  const {id} = useParams();
  const { addFav } = useContext(FavouritesContext);

  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fechtHero = async () => {
    try {
      const response = await fetch(`https://www.superheroapi.com/api.php/10166984457950198/${id}`);
      const result = await response.json();
      if (result.error) {
        setError(result.error)
        setLoading(false);
      } else {
        setCharacter(result);
        setLoading(false);
      }
  } catch (error) {
      console.log("error", error)
      setError(error)
      
  }
}
    fechtHero()  
  }, [id]);

  return (
    <div className='character-container'>
      {loading && <p>Loading...</p>}
      {error && <p>{ error }</p>}

      <div className='card-container'>
        {character && <h1 className='hero-title' >{character.name}</h1>}
        <button type="button" onClick={() => addFav(character)}>Add to Favourites</button>
        <div className='hero-info' >
          {character && <img className='hero-img' src={character.image.url} alt={character.name} />} 
          <div className='hero-stats'>
            {character && <div><h4>Gender:</h4>{character.appearance.gender}</div>}
            {character && <div><h4>Height:</h4>{character.appearance.height[1]}</div>}
            {character && <div><h4>Weight:</h4> {character.appearance.weight[1]}</div>}
            {character && <div><h4>Race:</h4>{character.appearance.race}</div>}
            {character && <div><h4>Occupation:</h4>{character.work.occupation}</div>}
            {character && <div><h4>Publisher:</h4>{character.biography.publisher}</div>}
          </div>
        </div>
        <div className='hero-combatstats'>
          <h2>Combat Stats</h2>
          {/* puedo tener imagenes para los poderes */}
          {character && <div>Combat: <br /><ProgressBar key={character.id} completed={character.powerstats.combat} ></ProgressBar></div>}
          {character && <div>Durability: <br /><ProgressBar key={character.id} completed={character.powerstats.durability} ></ProgressBar></div>}
          {character && <div>Intelligence: <br /><ProgressBar key={character.id} completed={character.powerstats.intelligence} ></ProgressBar></div>}
          {character && <div>Power: <br /><ProgressBar key={character.id} completed={character.powerstats.power} ></ProgressBar></div>}
          {character && <div>Speed: <br /><ProgressBar key={character.id} completed={character.powerstats.speed} ></ProgressBar></div>}
          {character && <div>Strength: <br/><ProgressBar key={character.id} completed={character.powerstats.strength} ></ProgressBar></div>}
          </div>
      </div>
    </div>
  )
}

export default Character
