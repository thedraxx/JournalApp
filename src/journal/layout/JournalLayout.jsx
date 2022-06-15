import { Box } from "@mui/system";
import React from "react";
import { NavBar, SideBar } from "../components";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  //El children viene de JournalPage.jsx y es una función que retorna un componente.
  return (
    <Box sx={{ display: "flex" }}>
      JournalLayout
      {/* Llamamos Barra de navegacion y SideBar */}
      <NavBar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Toolbar */}
        {children}
      </Box>
    </Box>
  );
};
