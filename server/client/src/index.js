import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import {Toaster} from "react-hot-toast"

// needed to import form index.js, not in app.js because every time the browser re-render, it will
// use the default style from tailwind in index css
import "./App.less";

let persistor = persistStore(store);

ReactDOM.render(
  
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Toaster />
        <App />
      </PersistGate>
    </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
