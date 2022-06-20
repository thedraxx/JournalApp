import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./Config";


// Aca estan todos los provedores de autenticacion

const googleProvider = new GoogleAuthProvider();

// Autenticacion con Google
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        // Obtenemos todos los datos de result.user
        const { displayName, email, photoURL, uid } = result.user

        return {
            ok: true,
            //usser info
            displayName, email, photoURL, uid
        }

    }
    //Si hay algun error manejamos el error
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage,
        }
    }
}