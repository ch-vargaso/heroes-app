import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';

function Character() {
  //  here i'm destructuring the result and showiing only the id of params, reason why I use it with "{}"
  const {id} = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
 
  // +++++++++++++++++ Fetch ++++++++++++++++++
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
    console.log("resultado:", result);
  } catch (error) {
      console.log("error", error)
      setError(error)
      
  }
}
    fechtHero()  
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{ error }</p>}

      <div className='card-container'>
             {/* <h2 className='hero-title' >{character.name}</h2> */}
        {character && <h1 className='hero-title' >{character.name}</h1>}
        <div className='hero-info' >
            {/* <img src={character.image.url} alt={character.name}/> */}
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

// Anotaciones e ideas para la página 
      // <h2>poner boton de add to favourites con un más y un botón de "my favourites"</h2>
      // <h2>cuando adhiero un super heroe tengo que mostrar una notificación "added to favourites"</h2>
      // <h2>Si clickeo dos veces se muestra una notificación "already added"</h2>
      // <h2>botón favoritos en la barra para ver lo que se tiene guardado</h2>
      // <h2>En la página de favoritos se puede poner solo la imagen y el nombre con un boton de "show details" o "remove"</h2>
      // <h3>como idea se puede hacer una "build your team" y ahí se puede filtrar o ver los heroes con los stats al lado <br />
      //   tambien se puede organizar por los stats con checkboxes y combinarlos</h3>
      // <h3>Posibilidad.... se pueden construir diferentes Teams????? sería bacano.... solo si estoy listo con el resto...</h3>