import  { useEffect, useState } from 'react';
import {addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy} from "firebase/firestore";
import { db, auth } from '../firebase-config';
import "../App.css"

export default function Chat(props) {
  const {room} = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([])

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages =query(messagesRef, where("room", "==", room), orderBy("createdAt"))
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id});
        console.log(doc.data().user);
      });

      setMessages(messages)
    });

    return () => unsubscribe();
  }, [])


  const handleSubmit = async(e) => {
    e.preventDefault();
    if(newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
 
    setNewMessage("")
  }

   

  return (
    <>
      
      <h1 className='roomname'>You are in room: <span>{room}</span></h1>

      <div className='messages-cont'>{messages.map((message) => (
        <div className='messages-list' key={message.id}>
          <div className='messages-list-user_name'>{message.user}</div>
          <p className='messages-list-user_message'>{message.text}</p>
        </div>
      ))}</div>

      <form className="input-group" onSubmit={handleSubmit}>
        <input className="input" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}  placeholder='write massage...'/>
        <button className="button--submit" type='submit'>Send</button>
      </form>


    </>
  )
}
