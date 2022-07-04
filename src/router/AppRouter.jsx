import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui/";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/Config";
import { logout, login } from "../store/auth";
import { async } from "@firebase/util";

export const AppRouter = () => {
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

  // Si estamos checkando el auth, mostramos el componente de carga
  if (status === "checking") {
    return <CheckingAuth />;
  }
  return (
    <BrowserRouter>
      <Routes>
        {
          // Si estamos autenticados, mostramos el journal
          status === "authenticated" ? (
            // JournalApp
            <Route path="/*" element={<JournalRoutes />} />
          ) : (
            // Si no estamos autenticados, mostramos el login o registro
            // Login y registro
            <Route path="/auth/*" element={<AuthRoutes />} />
          )
        }
        {/* Si metes cualquier URL el navigate te redirige a esto */}
        <Route path="/*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  );
};
