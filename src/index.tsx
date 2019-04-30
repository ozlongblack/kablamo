import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { StopwatchV1, StopwatchV2, StopwatchV3 } from "./components";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <>
    <StopwatchV1 initialSeconds={0} />
    <StopwatchV2 initialSeconds={0} />
    <StopwatchV3 initialSeconds={0} />
  </>,
  document.getElementById("content")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
