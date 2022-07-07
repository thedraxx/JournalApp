import { TurnedInNot } from "@mui/icons-material";
import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth = 240 }) => {
  // Obtenemos el estado gracias a useSelector
  const { displayName } = useSelector((state) => state.auth);
  const { note } = useSelector((state) => state.journal);
  return (
    <Box
      component={"nav"}
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent" //temporary
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component={"div"}>
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {/* Esto renderiza el sidebar y le enviamos el contenido
          de la nota */}
          {note.map((not) => not.map((n) => <SideBarItem key={n.id} {...n} />))}
        </List>
      </Drawer>
    </Box>
  );
};
