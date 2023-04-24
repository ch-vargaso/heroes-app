import { collection, doc, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import HeroCard from '../components/HeroCard';
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../Firebase';

function Favourites() {
  const { user } = useContext(AuthContext);
  const [heroes, setHeroes] = useState([]);
  // Experimento... 
  const [ismarked, setIsMarked] = useState(false);

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
          ...doc.data()
        }
        herosArray.push(heroFav);
        console.log("heros array", herosArray);
      });
          setHeroes(herosArray);

  
        } catch (error) {
          console.log(error)
      };
    }
  };

  useEffect(() => {
    getAllFavourites()
  }, []);
    
  return (
    <div>
      <div>
        <div className='heros-container'>
          {console.log("fav heros", heroes)}
          {heroes && heroes.map((hero) => {
          return (
            <>
              <HeroCard hero={hero} heroes={heroes}/>
              
            </>
          )
        })};
      </div>
      </div>
    </div>
  )
}

export default Favourites


// the farourites 