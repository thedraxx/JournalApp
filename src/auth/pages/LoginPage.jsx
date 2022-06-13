import { Grid, TextField, Typography } from "@mui/material";
import React from "react";

export const LoginPage = () => {
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
        sx={{ backgroundColor: "white", padding: 3, borderRadius: 2 }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          Login
        </Typography>
        <form>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@correo.com"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="contrasena"
                type="password"
                placeholder="contrasena"
                fullWidth
              />
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
