import React from "react";
import ReactDOM from "react-dom";
// Load default Aplication css
import "index.css";
// Load the routes + static contexts
import { App } from "app";
// Load the dynamic store
import { store } from "store";
import { Provider } from "react-redux";
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
