import React, { useContext, useEffect, useState } from 'react'
import HeroCard from '../components/HeroCard';
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../Firebase';
import { collection, doc, getDocs, onSnapshot, query } from 'firebase/firestore';
import { FavouritesContext } from '../contexts/FavoritesContext';


function Home() {
  const { user } = useContext(AuthContext);
  const { favourites } = useContext(FavouritesContext);

  const [heros, setHeros] = useState(null);
  // const [favourites, setFavourites] = useState([]);
  const [heroSearch, setHeroSearch] = useState('');
  const [heroHome, setHeroHome] = useState(null);

  // const listenToFavourites = async () => {

  //   const q = query(collection(db, `users/${user.uid}`, "favourites"));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const herosArray = [];
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.id, "=>", doc.data());
  //       const heroFav = {
  //         docId: doc.id,
  //         ...doc.data()
  //       }
  //       herosArray.push(heroFav);
  //       console.log("heros array", herosArray);
  //     });
  //     setFavourites(herosArray);
  //         console.log("Current cities in CA: ", herosArray);
  //   });
  // };
  // console.log('busqueda', heroSearch)

  // +++++++++++++Search Fetch +++++++++++++++++

  const url =`https://www.superheroapi.com/api.php/10166984457950198/search/${heroSearch}`

  useEffect(() => {
    const fechtHero = async () => {
      try {
        // line 15 and 16 are promises, ""
        const response = await fetch(url);
        const result = await response.json();
          setHeros(result.results);
          // console.log("heros", result.results);  
      } catch (error) {
        console.log("error", error)
      }
    }
    fechtHero()
  }, [heroSearch]);

  // +++++++++++++++++++++     Hero Fetch Homepage +++++++++++++++++++++++++
  useEffect(() => {
    const herosHomepage = () => {
      let hero1 = "https://www.superheroapi.com/api.php/10166984457950198/38";
      let hero2 = "https://www.superheroapi.com/api.php/10166984457950198/265";
      let hero3 = "https://www.superheroapi.com/api.php/10166984457950198/620";
      let hero4 = "https://www.superheroapi.com/api.php/10166984457950198/289";
      let hero5 = "https://www.superheroapi.com/api.php/10166984457950198/547";
      let hero6 = "https://www.superheroapi.com/api.php/10166984457950198/660";
      // se crea function para poner los ids en un solo array...

      let herosArray = [hero1, hero2, hero3, hero4, hero5, hero6];
      let promisesArray = herosArray.map( (singleUrl) => {
        return fetch(singleUrl).then((singleResponse) => {
          return singleResponse.json();
        })
      });
    Promise.all(promisesArray).then((resultado) => {
      console.log("Array de heroes para homepage", resultado);
      setHeroHome(resultado);
      })
    };
    herosHomepage()
  }, []);

  // const getAllFavourites = async () => {
  
  //   if (user) {
  //       try {
  //     const userRef = doc(db, `users/${user.uid}`);
  //     const heroFavRef = collection(userRef, "favourites");
  //     const querySnapShot = await getDocs(heroFavRef);
  //     // this is important if I want to have the fav heroes only from one user... now i'm working on the general favs...
  //     // const querySnapShot = await getDocs(collection(db, `${userID}`));
  //     const herosArray = [];
  //     querySnapShot.forEach((doc) => {
  //       console.log(doc.id, "=>", doc.data());
  //       const heroFav = {
  //         docId: doc.id,
  //         ...doc.data()
  //       }
  //       herosArray.push(heroFav);
  //       console.log("heros array", herosArray);
  //     });
  //         setFavourites(herosArray);

  //       } catch (error) {
  //         console.log(error)
  //     };
  //   }
  // };



  // useEffect(() => {
  //   // getAllFavourites()
  //   listenToFavourites()
  // }, [user]);


  return (
    <div>
      <div className='search-bar' >
        <label className='search-label' htmlFor="search-hero">Look for your Hero</label><br/>
        <input className='search-input' type="text" name="search-hero" id="search-hero" placeholder='Search your Hero...'
          onChange={(event) => setHeroSearch (event.target.value) } />
      </div>
      <div className='heros-container'>
        {/* ++++++++++++++++++ Search Bar ++++++++++++++++++++++ */}
        {heros && heros.filter((hero) => {
          return heroSearch.toLowerCase() === '' ? hero : hero.name.toLowerCase().includes(heroSearch)
        }).map((hero) => {
          return (
            <div className='result-container'>
                <HeroCard hero={hero} />
            </div>
          )
        })}
      </div>
      <h2>Look for a Random Hero...</h2>
      <div className='heros-container'>
        {heroHome && heroHome.map((hero) => {
          return (
            <>
                <HeroCard hero={hero} />
            </>
          )
        })}
      </div>
    </div>    
  )
}

export default Home




// ++++++++++++++++++++++++++ Ideas del Projecto +++++++++++++++++++++++++

      

      // <h2>- quiero que se puedan comparar stats con checkboxes "esto se podrá hacer en el area de usuario como una funcion especial después de haber iniciado sesión"</h2>
      // <h2>lista de 8 superheros random con un Slide Bar?</h2>
      // <h3>necesito tener una sección de favoritos y un botón en cada carta</h3>
      // <h3>en el search button se puede activar con el enter o haciendo click</h3>
      // <h3>Tiene que tener el search bar un background???? transparente????</h3>
      // <h3>se hace @media screen and (max-width: con algunos pixeles) para hacer la página responsive a diferentes tamaños</h3>
      // necesito crear una pagina de registro

