import React from "react";
import { Typography } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NothingSelectedView } from "../views";

export const JournalPage = () => {
  return (
    // Enviamos el children a JournalLayout para que lo renderice.
    <JournalLayout>
      <NothingSelectedView />
      {/* NoteView */}
    </JournalLayout>
  );
};
