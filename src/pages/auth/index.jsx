import { auth , provider } from "../../config/firebase-config";
import {signInWithPopup} from 'firebase/auth'
import {useNavigate, Navigate} from 'react-router-dom'
import './style.css'
import { useGetUserInfo } from '../../hooks/useGetUserInfo'


export const Auth = ()=>{
    
    const navigate = useNavigate();
    const { isAuth } = useGetUserInfo();


    const SignInWithGoogle = async ()=>{
        const results = await signInWithPopup(auth , provider)
        const authInfo = {
            userId : results.user.uid ,
            username: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth : true,
        };

        localStorage.setItem("auth",JSON.stringify(authInfo))
        navigate("/expense-tracker");
    };
    if (isAuth){
        return <Navigate to='/expense-tracker'/>
    }

   

    return ( <div className="login-page">
        <p>Sign In with google to continue </p>
        <button className="login-with-google-btn" onClick={SignInWithGoogle}>
            {" "}
            Sign In With Google
        </button>
    </div>
    )
}