import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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


// usamos firebase para registrar un nuevo usuario, esta funcion recibe un objeto con los datos del usuario
// Se llama desde el thunk de startCreatingUserWithEmailAndPassword
export const registerUserWithEmailAndPassword = async ({ email, password, displayName }) => {

    try {
        console.log(email, password, displayName)

        // Registramos el usuario con firebase
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user
        console.log(resp)
        // Si el usuario se registro correctamente
        return {
            ok: true,
            uid: photoURL, email, displayName
        }
    }


    // Si hay algun error manejamos el error
    catch {
        console.log(error)
        return { ok: false, errorMessage: error.message }
    }
}