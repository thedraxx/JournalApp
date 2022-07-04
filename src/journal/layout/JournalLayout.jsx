import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { NavBar, SideBar } from "../components";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  //El children viene de JournalPage.jsx y es una función que retorna un componente.
  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      JournalLayout
      {/* Llamamos Barra de navegacion y SideBar */}
      <NavBar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {/*  Aca renderizamos lo que viene de JournalPage */}
        {children}
      </Box>
    </Box>
  );
};
