import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { db } from '../Firebase';

function MessageCard({ message }) {
    const deleteMessage = async () => {
        try {
            await deleteDoc(doc(db, "chat", message.id));
            console.log("message deleted");
        } catch (error) {
            console.error("Error deleting message...", error);
        };
    };

    const formatDate = (date) => {    
        const dateObject = new Date(date);
        return dateObject.toDateString();
    }

    return (
        // minuto 48 del Spike 22
        <div className='messages-container' >
            <p>Posted by: {message.author}</p>  
            <p>{message.text}</p>
            <p>Posted on: {formatDate(message.date)}</p>
            <button type="submit" onClick={deleteMessage} >delete Message</button>
        </div>    
  )
}

export default MessageCard