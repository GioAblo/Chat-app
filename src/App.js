import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import Chat from './components/Chat';

import Cookies from "universal-cookie";
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

const cookies = new Cookies();
 

function App() {

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const [config, setConfig] = useState()

  const roomInputRef = useRef(null);
 
  useEffect(() => {
    if (isAuth === undefined) {
      setConfig( { alignItems: 'center', justifyContent: 'center' })
    } 
  
  }, [])

  console.log(isAuth);
  console.log(config);
   


  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null)
  }


  if(!isAuth){
    return (
      <section>
        <div className="main  " style={config}>
        <Auth setIsAuth={setIsAuth}/>
      </div>
      </section>
      
    );
  }

  return (
    <section>
      <div className='main'>
        
      {room ?
       (<div className='chat'>
        <Chat room={room} />
      </div>) 
      
      :
      
      (<div className='room-cont'> 
        
        <label>Enter room name</label>
        <div class="textInputWrapper">
            <input placeholder="Type Here" type="text" class="textInput"  ref={roomInputRef} />
        </div>  
    
        <button className='button' onClick={() => setRoom(roomInputRef.current.value)} >Enter chat</button>

        <p className='warning'> <span> &#9888;</span> Remember after each webpage refresh you will be returned to the "Enter room name" page. Please remember the room name if you want not to lose your messages with your friends!</p>
      </div>
      )}


      <div className='sign-out'>
        <button className='button' onClick={signUserOut}>Sign Out</button>
      </div>
      
    </div>
    </section>
    
      
   
  ) 
    
}

export default App;
