import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SideBarItem = ({ title, body, id, imageUrl = [], date }) => {
  // Hacemos uso del hook useDispatch para poder usar el dispatch
  const dispatch = useDispatch();

  // Activamos la nota cuando se hace click en ella
  const setActive = () => {
    dispatch(setActiveNote({ title, body, id, imageUrl, date }));
  };

  // Usamos un use Memo, si el titulo es mayor a 17 palabra lo cortamos y sino lo mostramos como viene
  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  return (
    <ListItem button disablePadding onClick={setActive}>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
