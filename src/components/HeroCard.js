import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../Firebase';

function HeroCard({hero, heroes}) {
    const { user } = useContext(AuthContext);
    const [isfavorite, setIsFavorite] = useState(false);

    
    console.log(hero);
    const addFav = async () => {
        const userId = user.uid
        const newFav = {
            id: hero.id,
            name: hero.name,
            image: {
                url: hero.image.url
            },
            uid: user.uid
        }
        console.log("Favhero", newFav);
        try {
            const userRef = doc(db, "users", userId);
            const heroFavRef = collection(userRef, "favourites");
            const docRef = await addDoc( heroFavRef, newFav);
        } catch (e) {
            console.error("Error adding to Favourites");
        }
    }

    const deleteHero = async () => {
        console.log("hero ", hero);
        console.log(user.uid);
        try {
            const userRef = doc(db, `users/${user.uid}`)
            const test = await deleteDoc(userRef, "favourites", hero.docId);
            const test2 = await deleteDoc(doc(db, "users", user.uid, "favourites", hero.docId));
            console.log("hero defeated...", test2);
        } catch (error) {
            console.log("Error deleting hero from your favourites...", error);
        };
    };
    // const deleteHero = async (hero) => {
    //     try {
    //         const userRef = doc(db,`users/${user.uid}`)
    //         await deleteDoc(userRef, "favourites", hero.id);
    //         console.log("hero defeated...");
    //     } catch (error) {
    //         console.log("Error deleting hero from your favourites...", error);
    //     };
    // };

    useEffect(() => {
        const check = heroes.some((h) => {
            return (
               h.id === hero.id
            )
        }) 
        setIsFavorite(check);
        console.log("check", check);
  }, [heroes]);
    return (
        <div key={hero.id} className="home-card-container" >         
            <p className='home-card-title' >{hero.name}</p>
            <div>  
            </div>
            { user ? !isfavorite ? <img className='bookmark' src="images/bookmark1.png" alt="add-favorite" onClick={addFav} /> 
            : <img className='bookmark' src="images/bookmark2.png" alt="favorite-added" onClick={deleteHero} /> :null }

            <Link to={`/character/${hero.id}/${hero.name}`} >
            <img className="home-card-img" src={hero.image.url} alt="hero-home" /> 
            </Link>
        </div>
        // Para crear el link personlizado tengo que crear la funcion aquí...
        // por el momento lo dejo sin link, pero tengo que llenarlo...
    )
}

export default HeroCard

