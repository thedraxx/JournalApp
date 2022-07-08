import { Google } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { useMemo } from "react";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  startGoogleLogin,
  startLoginWithEmailAndPassword,
} from "../../store/auth/";

const formData = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  //Leemos el store
  const { status, errorMessage } = useSelector((state) => state.auth);

  //Esto sirve para hacer dispatch de la acciones de redux
  const dispatch = useDispatch();

  //Usamos el useForm que es un customHook para crear un formulario
  const { email, password, onInputChange } = useForm(formData);

  //Memorizamos el valor de status para no tener que volver a chequearlo
  // Si el status cambia vamos a obtener el valor, sino no
  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (e) => {
    e.preventDefault();
    // Hacemos dispatch para que el reducer sepa que se ha hecho un login
    // Al ser algo asincrono, el dispatch se hace al thunks
    dispatch(startLoginWithEmailAndPassword(email, password));
  };

  const onGoogleSignIn = () => {
    // Hacemos dispatch para que el reducer sepa que se ha hecho un login con google
    // Al ser algo asincrono, el dispatch se hace al thunks
    dispatch(startGoogleLogin(email, password));
  };

  return (
    <AuthLayout title="login">
      {/* // Enviamos el componentes a AuthLayout que lo recibe como
      children, sirve para reutilizar el código */}
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@correo.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="contrasena"
              type="password"
              placeholder="contrasena"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
                {/* Esta alerta muestra el mensaje de error de firebase */}
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isAuthenticating}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
                disabled={isAuthenticating}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Link
              component={RouterLink} // RouterLink es link de react-router-dom solo que se cambio el nombre para no entrar en conflicto con materialUI
              color={"inherit"}
              to="/auth/register"
            >
              Crea una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
