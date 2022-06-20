import { signInWithGoogle } from "../../firebase/Provider";
import { chekingCredentials } from "./authSlice";

export const chekingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(chekingCredentials());
    }
}

export const startGoogleLogin = () => {
    return async (dispatch) => {
        dispatch(chekingCredentials());
        const result = await signInWithGoogle();
        console.log({ result })
    }
}