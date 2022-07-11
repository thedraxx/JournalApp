import { async } from '@firebase/util';
import { FileUpload, Note } from '@mui/icons-material';
import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/Config';
import { fileUpload } from '../../helpers';
import { loadNotes } from '../../helpers/LoadNotes';
import {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    noteUpdate,
} from './journalSlice';

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
        if (!uid) throw new Error('El UID del usuario no existe');

        // Esto trae todos los documentos de la colección de la base de datos de firebase
        const notas = await loadNotes(uid);
        // Establecemos las notas en el state gracias a la accion setNote y usando dispatch
        dispatch(setNotes(notas));
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        // Le  decime al state que estamos guardando
        dispatch(setSaving());

        // Usamos getState para obtener el estado actual, en este caso queremos el uid
        const { uid } = getState().auth;

        // Usamos getState para obtener el estado actual, en este caso queremos la nota que esta activa
        const { active: note } = getState().journal;
        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        // Aca hacemos referencia a la colección de la base de datos de firebase que queremos actualizar
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

        // Aca actualizamos el documento en FireBaseDB
        await setDoc(docRef, noteToFireStore, { merge: true });


        // Le decimos al state que ya no estamos guardando y mostramos la nota actualizada
        dispatch(noteUpdate(note));

    }
}

// Esto sube los archivos a  cloudinary
export const startUploadingFiles = (files = []) => {
    return async (dispatch, getState) => {
        dispatch(setSaving());
        await fileUpload(files[0]);
    }
}