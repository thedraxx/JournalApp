import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
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
        // Registramos el usuario con firebase
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        // Obtenemos los datos del usuario de la respuesta
        const { uid, photoURL } = resp.user
        // Actualizamos el displayName del usuario con firebase
        await updateProfile(FirebaseAuth.currentUser, { displayName })

        // Si el usuario se registro correctamente, retornamos los resultados al thunk
        return {
            ok: true,
            uid: photoURL, email, displayName,
        }
    }


    // Si hay algun error manejamos el error
    catch (error) {
        console.log(error)
        // Retornamos el error  al thunk
        return { ok: false, errorMessage: error.message }
    }
}