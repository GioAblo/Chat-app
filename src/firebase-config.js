// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore" 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8eQ2Y6TNa6_IkZRPCpZi5UZ2WIxLxvx0",
  authDomain: "chat-app-c59c9.firebaseapp.com",
  projectId: "chat-app-c59c9",
  storageBucket: "chat-app-c59c9.appspot.com",
  messagingSenderId: "946946832456",
  appId: "1:946946832456:web:c4443358e730c9f513807d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)