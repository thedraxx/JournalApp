import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { useCheckAuth } from "../hooks";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui/";

export const AppRouter = () => {
  // Este customHook nos permite verificar si el usuario esta autenticado
  const status = useCheckAuth();

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
