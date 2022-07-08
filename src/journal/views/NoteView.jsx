import { SaveOutlined } from "@mui/icons-material";
import { Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startSaveNote } from "../../store/journal/thunks";
import { ImageGallery } from "../components";

export const NoteView = () => {
  // Usamos useDispatch para acceder al store
  const dispatch = useDispatch();

  // Usamos useSelector para obtener el state de la
  // Nombramos a active note como note para saber que nota estamos viendo
  const { active: note } = useSelector((state) => state.journal);

  // Enviamos el objeto note para que el formulario sepa que es la nota que estamos editando
  const { body, title, date, onInputChange, formState } = useForm(note);

  // Usamos useMemo para la fecha, ya que no es algo que cambie mucho
  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  // Usamos useEffect para que escuche cuando cambie la nota, se actualice el formulario
  useEffect(() => {
    // hacemos un dispatch a setActiveNote con los datos actuales de la nota
    dispatch(setActiveNote(formState));
  }, [formState]);

  // Esta funcion se ejecuta cuando el usuario presiona el boton de guardar
  const onSaveNote = () => {
    // hacemos un dispatch asincrono para que guarde la nota
    dispatch(startSaveNote());
  };

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction={"row "}
      justifyContent="space-between"
      sx={{ mb: 1 }}
      alignItems="center"
    >
      <Typography fontSize={39} fontWeight="light">
        {dateString}
      </Typography>
      <Grid item>
        <button color="primary" sx={{ padding: 2 }} onClick={onSaveNote}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </button>
      </Grid>
      <Grid container>
        <TextField
          type={"text"}
          variant="filled"
          fullWidth={true}
          placeholder="Escribe una nota"
          label="titulo"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type={"text"}
          variant="filled"
          fullWidth={true}
          multiline
          placeholder="Que sucedio Hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      {/* Image Galery  es un componente*/}
      <ImageGallery />
    </Grid>
  );
};
