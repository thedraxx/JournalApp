import { SaveOutlined } from "@mui/icons-material";
import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { ImageGallery } from "../components";

export const NoteView = () => {
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
        25 de agosto.2052
      </Typography>
      <Grid item>
        <button color="primary" sx={{ padding: 2 }}>
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
        />
        <TextField
          type={"text"}
          variant="filled"
          fullWidth={true}
          multiline
          placeholder="Que sucedio Hoy?"
          minRows={5}
        />
      </Grid>
      {/* Image Galery  es un componente*/}
      <ImageGallery />
    </Grid>
  );
};
