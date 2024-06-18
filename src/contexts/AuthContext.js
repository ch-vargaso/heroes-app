import { createContext, useEffect, useState } from "react";
import { auth } from '../Firebase'
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged, signOut
} from "firebase/auth";


export const AuthContext = createContext();
export const AuthContextProvider = (props) => {


    const [user, setUser] = useState(null);
    const [userChecked, setUserSchecked] = useState(false);
    const createNewUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
    // Signed in 
    const newUser = userCredential.user;
                console.log(newUser)
                alert("Sign up successful - now please log in")
            })            
            .catch((error) => {      
                const errorCode = error.code;                
                const errorMessage = error.message;                
                console.log(errorMessage)
            });
    }

    const logIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const loggedUser = userCredential.user;
            setUser(loggedUser);
            alert('Log in succesful!!!')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('errorMessage :>> ', errorMessage);
        });   
    }
    const logOut = () => {
        signOut(auth).then(() => {
            setUser(null);
            console.log('user logged out');
            alert('You have logged out')

        }).catch((error) => {
                console.log(error)
            });

    }

    const checkForCurrentUser = () => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setUserSchecked(true);
            } else {
                setUser(null);
                setUserSchecked(true);
            }
        }); 
    }

    useEffect(() => {
        checkForCurrentUser();
    }, []);
    
    console.log("current user", user);
    return ( 
        // se hace doble corchete porque se esta exportando como un objeto 
        <AuthContext.Provider value={{user, logIn, logOut, createNewUser, userChecked}} >
            {props.children}
        </AuthContext.Provider>
    )
}
 