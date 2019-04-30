import React from "react";
import { StopwatchProps } from "./StopwatchV3.props";

const formattedSeconds = (sec: number) =>
  Math.floor(sec / 60) + ":" + ("0" + (sec % 60)).slice(-2);

const Lap = (props: { index: number; lap: number; onDelete: () => void }) => (
  <div key={props.index} className="stopwatch-lap">
    <strong>{props.index}</strong>/ {formattedSeconds(props.lap)}{" "}
    <button onClick={props.onDelete}> X </button>
  </div>
);

const Stopwatch = (props: StopwatchProps) => (
  <div className="stopwatch">
    <h1 className="stopwatch-timer">
      {formattedSeconds(props.secondsElapsed)}
    </h1>
    {props.secondsElapsed === 0 ||
    props.incrementer === props.lastClearedIncrementer ? (
      <button
        type="button"
        className="start-btn"
        onClick={props.handleStartClick}
      >
        start
      </button>
    ) : (
      <button
        type="button"
        className="stop-btn"
        onClick={props.handleStopClick}
      >
        stop
      </button>
    )}
    {props.secondsElapsed !== 0 &&
    props.incrementer !== props.lastClearedIncrementer ? (
      <button type="button" onClick={props.handleLabClick}>
        lap
      </button>
    ) : null}

    {props.secondsElapsed !== 0 &&
    props.incrementer === props.lastClearedIncrementer ? (
      <button type="button" onClick={props.handleResetClick}>
        reset
      </button>
    ) : null}

    <div className="stopwatch-laps">
      {props.laps &&
        props.laps.map((lap: number, i: number) => (
          <Lap
            key={i}
            index={i + 1}
            lap={lap}
            onDelete={() => {
              props.handleDeleteClick(i);
            }}
          />
        ))}
    </div>
  </div>
);

export default Stopwatch;
