import { useEffect, useState, useRef } from 'react';
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import '../App.css';

export default function Chat(props) {
  const { room } = props;
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
   
  const messagesRef = collection(db, 'messages');
  const messagesContainerRef = useRef(null);
  const lastMessageRef = useRef(null);
  


  

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where('room', '==', room),
      orderBy('createdAt')
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });

      setMessages(messages);
    });

    return () => unsubscribe();
  }, [room]);

 

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === '') return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage('');
  };

  return (
    <>


      <div className="roomNameCont">
        <div className="roomname">
          <div>room</div>
          <p>{room}</p>
        </div>
      </div>


    
        
      

      <div className='chatCont'>

            <form className="input-group" onSubmit={handleSubmit}>
                  <input
                    className="input"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="write massage..."
                  />
                  <button className="button--submit" type="submit">
                    Send
                  </button>
            </form>

            <div  className="messages-cont" ref={messagesContainerRef}>
              {messages.map((message, index) => (
                <div
                  className="messages-list"
                  key={message.id}
                  ref={index === messages.length - 1 ? lastMessageRef : null}
                >
                  <div className="messages-list-user_name">{message.user}</div>
                  <p className="messages-list-user_message">{message.text}</p>
                </div>
              ))}
        </div>
        


      </div>
    </>
  );
}
