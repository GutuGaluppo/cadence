import FlipDigit from "../FlipDigit";
import { ClockSeparator, FlipClockRow } from "./styled";

export interface TimerClockProps {
  time: string;
}

export default function TimerClock({ time }: TimerClockProps) {
  return (
    <FlipClockRow aria-atomic="true" aria-label={`Time remaining ${time}`} role="timer">
      {time.split("").map((character, index) =>
        character === ":" ? (
          <ClockSeparator aria-hidden="true" key={`separator-${index}`}>
            :
          </ClockSeparator>
        ) : (
          <FlipDigit digit={character} key={`digit-${index}`} />
        ),
      )}
    </FlipClockRow>
  );
}
