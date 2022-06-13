import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { purpleTheme } from "./";

//Children es una propiedad que se le pasa a un componente padre
export const AppTheme = ({ children }) => {
  return (
    // Theme es una propiedad que se le pasa a un componente hijo
    // purpleTheme es una propiedad que se le pasa a un componente hijo
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
