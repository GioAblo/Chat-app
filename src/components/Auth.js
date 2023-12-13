import {auth, provider} from "../firebase-config";
import { signInWithPopup } from "firebase/auth";

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
        <div>
            <p>Sign In With Google to Continue</p>
            <button onClick= {signInWithGoogle}>Sign In With Google</button>
        </div>
    )
}