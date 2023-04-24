import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { db } from '../Firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
// import { auth } from '../Firebase'
export const FavouritesContext = createContext();
export const FavouritesContextProvider = (props) => {
    const [favourites, setFavourites] = useState([]);
    const { user } = useContext(AuthContext);
    const listenToFavourites = async () => {
    const q = query(collection(db, `users/${user.uid}`, "favourites"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const herosArray = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        const heroFav = {
          docId: doc.id,
          ...doc.data()
        }
        herosArray.push(heroFav);
        console.log("heros array", herosArray);
      });
      setFavourites(herosArray);
          console.log("Current cities in CA: ", herosArray);
    });
    };
    useEffect(() => {
        if (user) {
            listenToFavourites()   
        }
  }, [user]);


    
    return (
        // se hace doble corchete porque se esta exportando como un objeto 
        <FavouritesContext.Provider value ={{favourites}}>
            {props.children}
        </FavouritesContext.Provider>
    )
};
 