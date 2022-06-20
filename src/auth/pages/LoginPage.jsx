import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { chekingAuthentication, startGoogleLogin } from "../../store/auth/";

export const LoginPage = () => {
  //Esto sirve para hacer dispatch de la acciones de redux
  const dispatch = useDispatch();

  //Usamos el useForm que es un customHook para crear un formulario
  const { email, password, onInputChange } = useForm({
    email: "correo@correo.com",
    password: "123456",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    // Hacemos dispatch para que el reducer sepa que se ha hecho un login
    // Al ser algo asincrono, el dispatch se hace al thunks
    dispatch(chekingAuthentication(email, password));
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
      <form onSubmit={onSubmit}>
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
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth type="submit">
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth onClick={onGoogleSignIn}>
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
