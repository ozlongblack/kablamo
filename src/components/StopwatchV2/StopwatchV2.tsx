import * as React from "react";
import { Component, ClassAttributes } from "react";

const formattedSeconds = (sec: number) =>
  Math.floor(sec / 60) + ":" + ("0" + (sec % 60)).slice(-2);

interface StopwatchProps extends ClassAttributes<Stopwatch> {
  initialSeconds: number;
}

class Stopwatch extends Component<StopwatchProps, any> {
  incrementer: any;

  constructor(props: StopwatchProps) {
    super(props);
    this.state = {
      secondsElapsed: props.initialSeconds,
      lastClearedIncrementer: undefined,
      laps: []
    };
  }

  handleStartClick() {
    this.incrementer = setInterval(
      () =>
        this.setState({
          secondsElapsed: this.state.secondsElapsed + 1
        }),
      1000
    );
  }

  handleStopClick() {
    clearInterval(this.incrementer);
    this.setState({
      lastClearedIncrementer: this.incrementer
    });
  }

  handleResetClick() {
    clearInterval(this.incrementer);
    this.setState({
      laps: [],
      secondsElapsed: 0
    });
  }

  handleLabClick() {
    this.setState({
      laps: this.state.laps.concat([this.state.secondsElapsed])
    });
  }

  handleDeleteClick(index: number) {
    const updated = [...this.state.laps];
    updated.splice(index, 1);

    this.setState({
      laps: updated
    });
  }

  render() {
    const { secondsElapsed, lastClearedIncrementer } = this.state;

    return (
      <div className="stopwatch">
        <h1 className="stopwatch-timer">{formattedSeconds(secondsElapsed)}</h1>

        {secondsElapsed === 0 || this.incrementer === lastClearedIncrementer ? (
          <button
            type="button"
            className="start-btn"
            onClick={this.handleStartClick.bind(this)}
          >
            start
          </button>
        ) : (
          <button
            type="button"
            className="stop-btn"
            onClick={this.handleStopClick.bind(this)}
          >
            stop
          </button>
        )}

        {secondsElapsed !== 0 && this.incrementer !== lastClearedIncrementer ? (
          <button type="button" onClick={this.handleLabClick.bind(this)}>
            lap
          </button>
        ) : null}

        {secondsElapsed !== 0 && this.incrementer === lastClearedIncrementer ? (
          <button type="button" onClick={this.handleResetClick.bind(this)}>
            reset
          </button>
        ) : null}

        <div className="stopwatch-laps">
          {this.state.laps &&
            this.state.laps.map((lap: number, i: number) => (
              <Lap
                key={i}
                index={i + 1}
                lap={lap}
                onDelete={this.handleDeleteClick.bind(this, i)}
              />
            ))}
        </div>
      </div>
    );
  }
}

const Lap = (props: { index: number; lap: number; onDelete: () => void }) => (
  <div key={props.index} className="stopwatch-lap">
    <strong>{props.index}</strong>/ {formattedSeconds(props.lap)}{" "}
    <button onClick={props.onDelete}> X </button>
  </div>
);

export default Stopwatch;
