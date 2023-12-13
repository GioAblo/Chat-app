import  { useEffect, useState } from 'react';
import {addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy} from "firebase/firestore";
import { db, auth } from '../firebase-config';

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
    <div>
      <div>
         
      </div>
      <div><h1>You are in room: {room}</h1></div>
      <div>{messages.map((message) => (
        <div key={message.id}>
          <span>{message.user}</span>
          {message.text}
        </div>
      ))}</div>
      <form onSubmit={handleSubmit}>
        <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)}  placeholder='write massage...'/>
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}
