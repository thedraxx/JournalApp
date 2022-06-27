import { registerUserWithEmailAndPassword, signInWithGoogle } from "../../firebase/Provider";
import { chekingCredentials, login, logout } from "./authSlice";

export const chekingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(chekingCredentials());
    }
}

export const startGoogleLogin = () => {
    return async (dispatch) => {

        //Disparamos el action de chekingCredentials del authslice
        dispatch(chekingCredentials());
        // result me va a decir si el usuario se logueo o no
        //Esto viene del Provider de firebase
        const result = await signInWithGoogle();

        if (!result.ok) {
            // Si el usuario no se logueo 
            dispatch(logout(result.errorMessage));
            return;
        }

        //Despachamos el action de login del authslice
        dispatch(dispatch(login(result)));
    }
}

// Registramos un nuevo usuario 
export const startCreatingUserWithEmailAndPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        //Disparamos el action de chekingCredentials del authslice
        dispatch(chekingCredentials());
        // Llamamos a registerUserWithEmailAndPassword del provider de firebase
        // Esperamos a obtener la respuesta que nos dara si el usuario se registro o no
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailAndPassword({ email, password, displayName });

        // Si el usuario no se registro, es decir ok = false, llamamos al logout del authslice
        if (!ok) return dispatch(logout({ errorMessage }));

        //Si todo salio bien, Despachamos el action de login del authslice
        dispatch(dispatch(login({ uid, photoURL, email, displayName })));
    }
}