import React, { useRef, useState } from "react";
import { StopwatchProps } from "./StopwatchV3.props";

const enhancer = (BaseComponent: React.FC<StopwatchProps>) => (props: {
  initialSeconds: number;
}) => {
  const incrementer = useRef<any | undefined>();
  const seconds = useRef(props.initialSeconds);
  const [secondsElapsed, setSecondsElapsed] = useState(props.initialSeconds);
  const [laps, setLaps] = useState<number[]>([]);
  const [lastClearedIncrementer, setLastClearedIncrementer] = useState();

  const handleStartClick = () => {
    if (incrementer.current === lastClearedIncrementer) {
      incrementer.current = setInterval(() => {
        seconds.current = seconds.current + 1;
        setSecondsElapsed(seconds.current);
      }, 1000);
    }
  };

  const handleStopClick = () => {
    clearInterval(incrementer.current);
    setLastClearedIncrementer(incrementer.current);
  };

  const handleResetClick = () => {
    clearInterval(incrementer.current);
    seconds.current = 0;
    setSecondsElapsed(seconds.current);
    setLaps([]);
  };

  const handleLabClick = () => {
    setLaps([...laps, secondsElapsed]);
  };

  const handleDeleteClick = (index: number) => {
    const updatedLaps = [...laps];
    updatedLaps.splice(index, 1);

    setLaps(updatedLaps);
  };

  return (
    <BaseComponent
      {...props}
      incrementer={incrementer.current}
      laps={laps}
      secondsElapsed={secondsElapsed}
      lastClearedIncrementer={lastClearedIncrementer}
      handleStartClick={handleStartClick}
      handleStopClick={handleStopClick}
      handleResetClick={handleResetClick}
      handleLabClick={handleLabClick}
      handleDeleteClick={handleDeleteClick}
    />
  );
};

export default enhancer;
