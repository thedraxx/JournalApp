import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
        // }
    },

    reducers: {
        savingNewNote: (state) => {
            // Cambiamos el estado de isSaving a true
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            // Agarramos el note del state y le insertamos lo que venga en el action
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            // Metemos las notas recibidas del action  al state
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },

        noteUpdate: (state, action) => { //payload: { id: 'abc123', title: '', body: '', date: 1231431, imageUrl: [] }
            // Le decimos que ya no esta guardando
            state.isSaving = false;
            // Recorremos el array de las notas que tenemos en el state
            state.notes = state.notes.map(note => {
                // Si la nota que esta en el state es la misma que la que esta activa, la actualizamos
                if (note.id === action.payload.id) {
                    return action.payload;
                }
                return note;
            });
            state.messageSaved = `${action.payload.title} guardado correctamente`;
        },
    }
});

// Action creators are generated for each case reducer function
export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    noteUpdate,
} = journalSlice.actions;