import { collection, doc, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import HeroCard from '../components/HeroCard';
import { AuthContext } from '../contexts/AuthContext';
import { FavouritesContext } from '../contexts/FavoritesContext';
import { db } from '../Firebase';

function Favourites() {
  const { user } = useContext(AuthContext);
  const { favourites } = useContext(FavouritesContext);
  // const [heroes, setHeroes] = useState([]);

  // const getAllFavourites = async () => {
  //   if (user) {
  //       try {
  //     const userRef = doc(db, `users/${user.uid}`);
  //     const heroFavRef = collection(userRef, "favourites");
  //     const querySnapShot = await getDocs(heroFavRef);
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
  //         setHeroes(herosArray);
  //       } catch (error) {
  //         console.log(error)
  //     };
  //   };
  // };

  // useEffect(() => {
  //   getAllFavourites()
  // }, []);
    
  return (
    <div>
      <div>
        <div className='heros-container'>
          {console.log("fav heros", favourites)}
          {favourites && favourites.map((hero) => {
            return (
              <>
                <HeroCard hero={hero} />
              </>
            );
          })};
        </div>
      </div>
    </div>
  );
};

export default Favourites