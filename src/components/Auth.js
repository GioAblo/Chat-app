import {auth, provider} from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import '../App.css'

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = (props) => {

    const {setIsAuth} = props;

    const signInWithGoogle = async() => {
        try {
            const result = await signInWithPopup(auth, provider);  
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div className="sign-in">
            <h2>Sign In With Google to Continue</h2>
            <button className="button" onClick= {signInWithGoogle}>
                Sign In With 

                <span className="first"> G</span> 
                <span className="sec">o</span> 
                <span className="third">o</span> 
                <span className="fourth">g</span> 
                <span className="fifth">l</span> 
                <span className="six">e</span> 
            </button>
        </div>
    )
}