import React from "react";
import { IconButton, Typography } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { AddOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { startNewNote } from "../../store/journal/thunks";
import { useSelector } from "react-redux";

export const JournalPage = () => {
  // Usamos useDispatch para poder usar el dispatch de Redux
  const dispatch = useDispatch();

  // usamos useSelector para obtener el estado de la aplicación
  const { isSaving, active } = useSelector((state) => state.journal);

  // Mandamos a llamar al dispatch para que cree una nueva nota
  // al ser algo asíncrono, llamamos al thunk
  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    // Enviamos el children a JournalLayout para que lo renderice.
    <JournalLayout>
      {
        // Si no hay ninguna nota activa, mostramos una vista vacía sino mostramos la nota
        active == null ? <NothingSelectedView /> : <NoteView />
      }

      {/* Boton para agregar notas */}
      <IconButton
        // Si estamos guardando, no mostramos el boton, isSaving es true o false
        disabled={isSaving}
        onClick={onClickNewNote}
        size="large"
        sx={{
          //Usando SX tenemos acceso al tema global y por eos podemos usar el color que viene del theme
          color: "white",
          backgroundColor: "error.main", // Este color viene del theme
          ":hover": { backgroundColor: "error.main", opacity: 0.9 }, // Este color viene del theme
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 50 }} />
      </IconButton>
    </JournalLayout>
  );
};
