import React from "react";
import { IconButton, Typography } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { AddOutlined } from "@mui/icons-material";

export const JournalPage = () => {
  return (
    // Enviamos el children a JournalLayout para que lo renderice.
    <JournalLayout>
      {/* <NothingSelectedView /> */}
      {/* <NoteView /> */}

      {/* Boton para agregar notas */}
      <IconButton
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
