import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/Config";

export const loadNotes = async (uid = '') => {
    if (!uid) throw new Error('No hay un usuario logueado');

    // Esto sirve para traer todos los documentos de la colección de la base de datos de firebase
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const notes = [];
    docs.forEach(doc => {
        notes.push({ id: doc.id, ...doc.data() });
    })

    return notes;
}