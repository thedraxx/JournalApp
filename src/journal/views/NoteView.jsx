import {
  SaveOutlined,
  SwapCalls,
  Upload,
  UploadOutlined,
} from "@mui/icons-material";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startSaveNote, startUploadingFiles } from "../../store/journal/thunks";
import { ImageGallery } from "../components";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const NoteView = () => {
  // Usamos useDispatch para acceder al store
  const dispatch = useDispatch();

  // Usamos useSelector para obtener el state de la
  // Nombramos a active note como note para saber que nota estamos viendo
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);

  // Enviamos el objeto note para que el formulario sepa que es la nota que estamos editando
  const { body, title, date, onInputChange, formState } = useForm(note);

  // Usamos useMemo para la fecha, ya que no es algo que cambie mucho
  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  // Usamos useRef hacer referencia al input para subir la imagen
  const fileInputRef = useRef();

  // Usamos useEffect para que escuche cuando cambie la nota, se actualice el formulario
  useEffect(() => {
    // hacemos un dispatch a setActiveNote con los datos actuales de la nota
    dispatch(setActiveNote(formState));
  }, [formState]);

  // Usamos useEffect para que escuche cuando el messageSaved cambie
  useEffect(() => {
    // Si el messageSaved.length es mayor a 0, mostramos quiere decir que se guardo la nota
    if (messageSaved.length > 0) {
      Swal.fire("nota actualizada", "", "success");
    }
  }, [messageSaved]);

  // Esta funcion se ejecuta cuando el usuario presiona el boton de guardar
  const onSaveNote = () => {
    // hacemos un dispatch asincrono para que guarde la nota
    dispatch(startSaveNote());
  };

  // Esto funciona para la subir imangenes
  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    // Hacemos dispatch al thunk para que suba las imagenes
    dispatch(startUploadingFiles(target.files));
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
        <input
          type="file"
          multiple
          onChange={onFileInputChange}
          styled={{ display: "none" }}
          ref={fileInputRef}
        />

        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>
        <button
          color="primary"
          sx={{ padding: 2 }}
          onClick={onSaveNote}
          disabled={isSaving}
        >
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
      <ImageGallery images={note.imageUrls} />
    </Grid>
  );
};
