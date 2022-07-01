import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui/";

export const AppRouter = () => {
  // Tomamos el estado de autenticación del store
  const { status } = useSelector((state) => state.auth);
  // Si estamos checkando el auth, mostramos el componente de carga
  if (status === "checking") {
    return <CheckingAuth />;
  }
  return (
    <BrowserRouter>
      <Routes>
        {/* //Login y registro*/}
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* JournalApp */}
        <Route path="/*" element={<JournalRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};
