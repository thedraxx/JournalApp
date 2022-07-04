import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseAuth } from '../firebase/Config';
import { login, logout } from '../store/auth';
import { useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';

export const useCheckAuth = () => {
    // Importamos el dispatch para poder usarlo
    const dispatch = useDispatch();

    // Tomamos el estado de autenticación del store
    const { status } = useSelector((state) => state.auth);

    // Usamos un UseEffect para que se dispare cada vez que el status cambia
    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            // Si el user no existe llamamos al logout del authslice
            if (!user) return dispatch(logout());
            //Si tengo un usuario llamamos al login del authslice
            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }));
        });
    }, []);

    return status
}
