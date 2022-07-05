import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: true,
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
        addNewEmptyNote: (state, action) => { },
        setAcctiveNote: (state, action) => { },
        setNote: (state, action) => { },
        setSaving: (state) => { },
        updateNote: (state, action) => { },
        deleteNoteById: (state, action) => { },
    }
});

// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    setAcctiveNote,
    setNote,
    setSaving,
    updateNote,
    deleteNoteById,
} = journalSlice.actions;