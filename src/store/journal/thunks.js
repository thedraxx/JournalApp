import { async } from '@firebase/util';
import { Note } from '@mui/icons-material';
import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/Config';
import { loadNotes } from '../../helpers/LoadNotes';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNote } from './journalSlice';
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
    }
}

// Esto trae todos los documentos de la colección de la base de datos de firebase
export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        // Usamos getState para obtener el estado actual, en este caso queremos el uid
        const { uid } = getState().auth;

        // Si no hay un uid lanzamos un error
        if (!uid) throw new Error('No hay un usuario logueado');

        // Esto trae todos los documentos de la colección de la base de datos de firebase
        const notas = await loadNotes(uid);

        // Establecemos las notas en el state gracias a la accion setNote y usando dispatch
        dispatch(setNote(notas));
    }
}