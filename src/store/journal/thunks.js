import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/Config';
export const startNewNote = () => {

    return async (dispatch, getState) => {
        // Usamos getState para obtener el estado actual
        const { uid } = getState().auth;

        // uid 
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        // Aca insertamos el nuevo documento
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);


        // dispatch()
        // dispatch(newNote)
        // dispatch(activarNote)

    }
}