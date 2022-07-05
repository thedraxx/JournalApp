import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth';
import { journalSlice } from './journal';

// Creamos el Store

export const store = configureStore({
    reducer: {
        // creamos el espacio en el store llamado auth y lo relacionamoz con el authSlice
        auth: authSlice.reducer,
        journal: journalSlice.reducer,
    },
});