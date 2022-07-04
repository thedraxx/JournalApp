import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { useMemo, useState } from "react";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailAndPassword } from "../../store/auth/thunks";

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const [formSubmited, setFormSubmited] = useState(false);

  // Obtenemos el estado y error de la autenticación del store
  const { status, errorMessage } = useSelector((state) => state.auth);

  //Memorizamos el valor que viene de status si es cheking o error
  const isCheckingAuthentication = useMemo(
    () => status === "cheking",
    [status]
  );

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
    //El formData es el valor inicial del formulario,
    //El formValidations son las validaciones que se deben cumplir para que el formulario sea valido
  } = useForm(formData, formValidations);

  // Funcion que se ejecuta al hacer click en el boton
  const onSubmit = (e) => {
    e.preventDefault();
    // Cambia el estado de formSubmited a true
    setFormSubmited(true);
    // Si el formulario es valido, se ejecuta la funcion startCreatingUserWithEmailAndPassword
    // Hacemos Dispatch para crear el usuario y lo enviamos al thunks
    dispatch(startCreatingUserWithEmailAndPassword(formState));

    // Si isFormValid es false, significa que hay un campoo no validp se ejecuta el return
    if (!isFormValid) return;
  };

  return (
    <AuthLayout
      title="Register"
      className="animate__animated animate__fadeIn animate__faster"
    >
      {/* // Enviamos el componentes a AuthLayout que lo recibe como
      children, sirve para reutilizar el código */}
      <h1> Is Form Valid: {isFormValid ? "valido" : "Incorrecto"}</h1>
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
              error={!!displayNameValid && formSubmited}
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
              error={!!emailValid && formSubmited}
              helperText={emailValid}
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
              error={!!passwordValid && formSubmited}
              helperText={passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
                {/* Esta alerta muestra el mensaje de error de firebase */}
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>

              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isCheckingAuthentication}
              >
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
