import { signInWithGoogle } from "../../firebase/Provider";
import { chekingCredentials, login, logout } from "./authSlice";

export const chekingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(chekingCredentials());
    }
}

export const startGoogleLogin = () => {
    return async (dispatch) => {

        dispatch(chekingCredentials());
        // result me va a decir si el usuario se logueo o no
        //Esto viene del Provider de firebase
        const result = await signInWithGoogle();

        if (!result.ok) {
            // Si el usuario no se logueo 
            dispatch(logout(result.errorMessage));
            return;
        }

        dispatch(dispatch(login(result)));
    }
}