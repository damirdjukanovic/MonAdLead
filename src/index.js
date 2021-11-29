import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { connect, Provider } from "react-redux";
import configureStore from "./store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore().store}>
      <PersistGate loading={null} persistor={configureStore().persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
