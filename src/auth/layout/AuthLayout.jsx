import { Grid, Typography } from "@mui/material";
import React from "react";

export const AuthLayout = ({ children, title = "" }) => {
  // Recibimos el children, que no es otra cosa que un componente, por eso lo pasamos a una variabl
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
      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{
          width: { md: 450 },
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};
