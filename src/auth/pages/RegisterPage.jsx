import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";

export const RegisterPage = () => {
  //Valor inicial del formulario
  const formData = {
    email: "correo@correo.com",
    password: "123456",
    displayName: "Nombre de usuario",
  };

  //Sirve para validar los campos del formulario, cada una debe cumplirse para ser valido
  const formValidations = {
    //Valida el email
    email: [(value) => value.includes("@"), "El correo debe de tener un @"],
    //Valida el password
    password: [
      (value) => value.length >= 6,
      "El password debe de tener mas de 6 caracteres",
    ],
    //Valida el displayName
    displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
  };

  //Usamos el useForm que es un customHook para crear un formulario
  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  // Funcion que se ejecuta al hacer click en el boton
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <AuthLayout title="Register">
      {/* // Enviamos el componentes a AuthLayout que lo recibe como
      children, sirve para reutilizar el código */}
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre Completo"
              type="text"
              placeholder="John Titor"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!displayNameValid}
              helperText={displayNameValid}
            />
          </Grid>

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
            <Grid item xs={12}>
              <Button variant="contained" fullWidth type="submit">
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}> Ya tienes una cuenta?</Typography>
            <Link
              component={RouterLink} // RouterLink es link de react-router-dom solo que se cambio el nombre para no entrar en conflicto con materialUI
              color={"inherit"}
              to="/auth/login"
            >
              ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
