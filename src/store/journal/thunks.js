import { Note } from '@mui/icons-material';
import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/Config';
import { addNewEmptyNote, savingNewNote, setActiveNote } from './journalSlice';
export const startNewNote = () => {

    return async (dispatch, getState) => {

        // Ejecutamos savingNewNote para que el state se ponga en true
        dispatch(savingNewNote());

        // Usamos getState para obtener el estado actual
        const { uid } = getState().auth;

        // uid 
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        // Aca insertamos el nuevo documento a FireBaseDB con el id del usuario
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        // Creamos la propiedad id a la nota 
        newNote.id = newDoc.id;

        // Hacemos dispatch de la accion addNewEmptyNote con la nota
        dispatch(addNewEmptyNote(newNote));
        // Hacemos dispatch de la accion setActiveNote, activamos 
        dispatch(setActiveNote(newNote));

        // dispatch(activarNote)

    }
}