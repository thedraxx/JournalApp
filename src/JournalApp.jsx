import React from "react";
import { AppRouter } from "./router/AppRouter";
import { store } from "./store/";
import { AppTheme } from "./theme";
import { Provider } from "react-redux";

export const JournalApp = () => {
  return (
    <AppTheme>
      {/*  Usamos el provider para que todos los componentes que sean hijos de
      Provider puedan acceder al store. */}
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </AppTheme>
  );
};
