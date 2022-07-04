import { CircularProgress, Grid } from "@mui/material";
import React from "react";

export const CheckingAuth = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        //Extra styling
        minHeight: "100vh",
        backgroundColor: "primary.main", // Viene de AppTheme
        padding: 4,
      }}
    >
      <Grid container item direction="row" justifyContent="center">
        <CircularProgress color="warning" />
      </Grid>
    </Grid>
  );
};
