import React from "react";
import { Typography } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";

export const JournalPage = () => {
  return (
    // Enviamos el children a JournalLayout para que lo renderice.
    <JournalLayout>
      {/* Typography viene de MaterialUi y es un componente de texto, variant es una propiedad que puede ser h1, h2, h3...etc. */}
      <Typography variant="h1">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
        inventore alias ipsa necessitatibus repellendus id aut eius cumque
        suscipit laborum saepe ex, vel explicabo eveniet quod soluta facere
        dignissimos beatae!
      </Typography>
      {/* nothinSelected */}
      {/* NoteView */}
    </JournalLayout>
  );
};
