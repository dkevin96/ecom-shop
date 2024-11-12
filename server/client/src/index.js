import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { HelmetProvider } from "react-helmet-async";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Toaster } from "react-hot-toast";

// needed to import form index.js, not in app.js because every time the browser re-render, it will
// use the default style from tailwind in index css
import "./App.less";

let persistor = persistStore(store);

ReactDOM.render(
  <HelmetProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster />
        <App />
      </PersistGate>
    </Provider>
  </HelmetProvider>,
  document.getElementById("root")
);
