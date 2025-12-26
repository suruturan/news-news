import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import AppNavigation from "./src/app/navigation";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
