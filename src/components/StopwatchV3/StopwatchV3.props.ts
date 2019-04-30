export interface StopwatchProps {
  initialSeconds: number;
  incrementer: any | undefined;
  laps: number[];
  secondsElapsed: number;
  lastClearedIncrementer: any | null;
  handleStartClick(): void;
  handleStopClick(): void;
  handleResetClick(): void;
  handleLabClick(): void;
  handleDeleteClick(index: number): void;
}
