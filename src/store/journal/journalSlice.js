import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',

    initialState: {
        isSaving: false,
        messageSaved: '',
        note: [],
        active: null,
        // active: {
        //     id: 'abc123',
        //     title:'',
        //     body: '',
        //     date:1231431,
        //     imageUrl: [], // array de string
        // }
    },

    reducers: {
        savingNewNote: (state) => {
            // Cambiamos el estado de isSaving a true
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            // Agarramos el note del state y le insertamos lo que venga en el action
            state.note.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        setNote: (state, action) => { },
        setSaving: (state) => { },
        updateNote: (state, action) => { },
        deleteNoteById: (state, action) => { },
    }
});

// Action creators are generated for each case reducer function
export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNote,
    setSaving,
    updateNote,
    deleteNoteById,
} = journalSlice.actions;