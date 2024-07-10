import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { db } from "../Firebase";
import { collection, onSnapshot, query, addDoc, deleteDoc, doc } from "firebase/firestore";
// import { auth } from "../Firebase";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = (props) => {
  const [favourites, setFavourites] = useState([]);
  const { user } = useContext(AuthContext);

  const addFav = async (hero) => {
    const userId = user.uid;
    const newFav = {
      id: hero.id,
      name: hero.name,
      image: {
        url: hero.image.url,
      },
      uid: user.uid,
    };
    console.log("Favhero", newFav);
    try {
      const userRef = doc(db, "users", userId);
      const heroFavRef = collection(userRef, "favourites");
      await addDoc(heroFavRef, newFav);
    } catch (error) {
      console.error("Error adding to Favourites:", error.message);
    }
  };

  const deleteHero = async (hero, docId) => {
    console.log(user.uid);
    try {
      await deleteDoc(doc(db, "users", user.uid, "favourites", docId));
      console.log("hero defeated... :>> ", hero.name);
    } catch (error) {
      console.log("Error deleting hero from your favourites...", error);
    }
  };

  useEffect(() => {
    
    let unsubscribe;
    const listenToFavourites = async () => {
      if (user) {
        const q = query(collection(db, `users/${user.uid}/favourites`));
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const herosArray = [];
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, "=>", doc.data());
            const heroFav = {
              docId: doc.id,
              ...doc.data(),
            };
            herosArray.push(heroFav);
          });
          setFavourites(herosArray);
          console.log("Current favourites: ", herosArray);
        });
      }
    };

    listenToFavourites();
    // Cleanup function to unsubscribe from the listener
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  return (
    <FavouritesContext.Provider value={{ favourites, addFav, deleteHero }}>
      {props.children}
    </FavouritesContext.Provider>
  );
};
