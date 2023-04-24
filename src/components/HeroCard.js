import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FavouritesContext } from '../contexts/FavoritesContext';
import { db } from '../Firebase';

function HeroCard({hero}) {
    const { user } = useContext(AuthContext);
    const { favourites } = useContext(FavouritesContext);
    const [isfavorite, setIsFavorite] = useState(false);
    const [docid, setDocId] = useState(null);

    // console.log(hero);
    const addFav = async () => {
        const userId = user.uid
        const newFav = {
            id: hero.id,
            name: hero.name,
            image: {
                url: hero.image.url
            },
            uid: user.uid
        };
        console.log("Favhero", newFav);
        try {
            const userRef = doc(db, "users", userId);
            const heroFavRef = collection(userRef, "favourites");
            const docRef = await addDoc(heroFavRef, newFav);
        } catch (e) {
            console.error("Error adding to Favourites");
        };
    };

    const deleteHero = async () => {
        console.log("hero ", hero);
        console.log(user.uid);
        try {
            const userRef = doc(db, `users/${user.uid}`);
            const test2 = await deleteDoc(doc(db, "users", user.uid, "favourites", docid));
            console.log("hero defeated...", test2);
        } catch (error) {
            console.log("Error deleting hero from your favourites...", error);
        };
    };

    useEffect(() => {
        const check = favourites.some((h) => {
            return (
                h.id === hero.id
            )
        });
        setIsFavorite(check);
        
        if (check) {
            const findId = favourites.find((h) => {        
            return (
                h.id === hero.id
            )    
            });

            console.log("findId", findId);
            setDocId(findId.docId)
        }
        // console.log("check", check);
    }, [favourites]);

    return (
        <div key={hero.id} className="home-card-container" >
            <p className='home-card-title' >{hero.name}</p>
            {user ? !isfavorite ? <img className='bookmark' src="images/bookmark1.png" alt="add-favorite" onClick={addFav} />
            : <img className='bookmark' src="images/bookmark2.png" alt="favorite-added" onClick={deleteHero} /> : null}
            <Link to={`/character/${hero.id}/${hero.name}`} >
                <img className="home-card-img" src={hero.image.url} alt="hero-home" />
            </Link>
        </div>
    );
};

export default HeroCard

