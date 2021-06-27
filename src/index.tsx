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
  // <React.StrictMode> // components rendering twice in dev mod
  // In the future, react will be rendered concurrently, so this will be necessary,
  // however in the devmode, ins't necessary at all for now
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementsByTagName("main")[0]
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
