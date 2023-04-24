import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import { collection, addDoc, setDoc, doc, getDocs, query, onSnapshot, orderBy } from "firebase/firestore"; 
import { db } from '../Firebase';
import MessageCard from '../components/MessageCard';
import { async } from '@firebase/util';


function Chat() {
    const { user } = useContext(AuthContext);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Esto se hace para que la página no se actualice cuando se hace un submit. The form tag hast this
        // property and eith e.preventDefault we disable this property to mantain the data without refreshing the page.
        console.log(inputValue);
        // aquí se crea la estructura que va a ir al data base
        const newMessage = {
            // Este es el usuario con la sesion activa...
            author: user.email,
            text: inputValue,
            date: Date.now()
        }
        console.log(newMessage);
        // aqußi se pone la función que se quiere para hacer el submit con el texto que esté creando... pilas con hacer lo mismo para 
        // poner los favoritos... tiene que estar dentro de una función asincrona!!!!!
        try {
            // in this database is a collection called users and I want to add this document (newMessage) to it
            // si no existe una collection, Firebase la crea automaticamente...
            // pilas que el nombre sea correcto!! para adherir a la collection que se quiere...
            // mejor comparar con FireBase al la do para comprobar que se estána haciendo las cosas bien. 
            const docRef = await addDoc(collection(db, "chat"), newMessage);
            // Esta es la manera en la que se hace con el setDoc... (ver base de datos...)

            // Utilizando el querySnapshot, no es necesario crear un nuevo statement de la base de datos... con el querySnapShot se deja a la base de datos hacer toda la
            // actuaización de la base de datos live. (creo que este método me gusta)

            // const docRef = await setDoc(doc(db, "chat", "documento1"), newMessage)
            // console.log("Document written with ID: ", docRef.id);
            // const messagesCopy = messages; 
            // console.log("messages copy: ", messagesCopy);
            // const message = {
            //     id: docRef.id, 
            //     ...newMessage
            // }
            // messagesCopy.push(message);
            // setMessages(messagesCopy);
            setInputValue('')
        } catch (e) {            
            console.error("Error adding document: ", e);            
        }        
    }
    // Solo se hace una llamada a la base de datos y se la variable local para manipular los datos mostrados
    const getAllMessages = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "chat"));
            const messagesArray = [];
            // console.log("querySnapshot", querySnapshot);
            querySnapshot.forEach((doc) => {
                // doc.data()is never undefined of query doc snapshots
                // console.log(doc.id, "=>", doc.data());
                const message = {
                    id: doc.id,
                    ...doc.data()
                }
                messagesArray.push(message);
                setMessages(messagesArray);
                // console.log(message);
            });
        } catch (error) {
            console.log(error)
        };
    };


//   Aquí hay que tener una conexión constante con la base de datos (Fire base) y eso utiliza poder de procesamiento
    // la ventaja es que uno no tiene que preocuparse por el state de las cosas en JavaScript
    const listenAllMessages = async () => {
        const q = query(collection(db, "chat"), orderBy("date"));
        const unsuscribe = onSnapshot(q, (querySnapshot) => {
            const messagesArray = [];
            querySnapshot.forEach((doc) => {
                const newMessage = { 
                    id: doc.id,
                    ...doc.data()
                }
                messagesArray.push(newMessage);
            });
            setMessages(messagesArray);
        });
    };
    //  Este UseEffect se utiliza para llamar el data que se está generando en la base de datos
    // Esto se puede utilizar para hacer un "getAllFavourites... de los heroes"
    useEffect(() => {
        // getAllMessages()
        listenAllMessages()
    }, [])
    
    const handleOnChange = (event) => setInputValue(event.target.value);

    return (
        <div>
            <h2>Chat Working</h2>
            <div>
                messages are here...
                {messages.map((message) => {
                    return (
                        <MessageCard message={message} />
                    )
                })}
            </div>
            <form onSubmit={handleSubmit} className="chat-container">    
                <textarea value={inputValue} onChange={handleOnChange} />                
                <button type='submit'>Add Message</button>
            </form>
        </div>
    )
}

export default Chat