import { Coffee, PauseIcon, PencilRuler, PlayIcon } from "lucide-react";
import { alpha, useTheme } from "@mui/material/styles";
import { type PointerEvent, useId } from "react";
import { useShallow } from "zustand/react/shallow";
import { TimerMode, TimerState } from "@/types";
import { formatTime } from "../../formatTime";
import { getTimerModeLabel } from "../../getTimerModeLabel";
import { useTimerStore } from "../../store/useTimerStore";
import TimerClock from "./TimerClock";
import {
  CenterContent,
  CycleDot,
  DotsRow,
  ModeLabel,
  PlayPauseButton,
  RingContainer,
  RingSvg,
  TimerFace,
} from "./styled";

const LIGHT_MODE_COLORS: Record<
  TimerMode,
  { accent: string; gradient: [string, string] }
> = {
  [TimerMode.FOCUS]: {
    accent: "#2E2566",
    gradient: ["#9B93D8", "#1A1248"],
  },
  [TimerMode.SHORT_BREAK]: {
    accent: "#5DBB8A",
    gradient: ["#9ADEC0", "#1E6643"],
  },
  [TimerMode.LONG_BREAK]: {
    accent: "#E8B93A",
    gradient: ["#FFF0A8", "#C8920A"],
  },
};

const DARK_MODE_COLORS: Record<
  TimerMode,
  { accent: string; gradient: [string, string] }
> = {
  [TimerMode.FOCUS]: {
    accent: "#A7A1FF",
    gradient: ["#D0CBFF", "#4C44B8"],
  },
  [TimerMode.SHORT_BREAK]: {
    accent: "#79E3B0",
    gradient: ["#B6F2D4", "#2B8A5C"],
  },
  [TimerMode.LONG_BREAK]: {
    accent: "#FFD56A",
    gradient: ["#FFE9A8", "#D39416"],
  },
};

const RING_RADIUS = 80;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function TimerRing() {
  const theme = useTheme();
  const { activeSettings, completedCycles, mode, pause, start, state, timeLeft, totalDuration } =
    useTimerStore(
      useShallow((store) => ({
        activeSettings: store.activeSettings,
        completedCycles: store.completedCycles,
        mode: store.mode,
        pause: store.pause,
        start: store.start,
        state: store.state,
        timeLeft: store.timeLeft,
        totalDuration: store.totalDuration,
      })),
    );
  const gradientId = useId().replace(/:/g, "");
  const modeColors =
    theme.palette.mode === "dark" ? DARK_MODE_COLORS : LIGHT_MODE_COLORS;

  const isRunning = state === TimerState.RUNNING;
  const accentColor = modeColors[mode].accent;
  const [gradientLight, gradientDark] = modeColors[mode].gradient;
  const ModeIcon = mode === TimerMode.FOCUS ? PencilRuler : Coffee;
  const totalDots = Math.max(activeSettings.cyclesBeforeLongBreak, 1);
  const completedDots = completedCycles % totalDots;
  const progress = totalDuration > 0 ? (totalDuration - timeLeft) / totalDuration : 0;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);
  const timeLabel = formatTime(timeLeft);

  const handlePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    // Prevent pointer clicks from leaving the action focused, which would keep
    // the hover overlay visible after the cursor leaves the timer.
    event.currentTarget.blur();
  };

  return (
    <RingContainer>
      <TimerFace className="timer-face">
        <RingSvg height="100%" viewBox="0 0 200 200" width="100%">
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id={gradientId}
              x1="100"
              x2="100"
              y1="20"
              y2="180"
            >
              <stop offset="0%" stopColor={gradientLight} />
              <stop offset="100%" stopColor={gradientDark} />
            </linearGradient>
          </defs>

          <circle
            cx="100"
            cy="100"
            fill="none"
            r={RING_RADIUS}
            stroke={alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.16 : 0.1)}
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="100"
            fill="none"
            r={RING_RADIUS}
            stroke={`url(#${gradientId})`}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            strokeWidth="6"
            style={{
              opacity: state === TimerState.PAUSED ? 0.5 : 1,
              transition: "stroke-dashoffset 1s linear",
            }}
            transform="rotate(-90 100 100)"
          />
        </RingSvg>

        <CenterContent>
          <ModeIcon
            color={isRunning ? accentColor : theme.palette.text.secondary}
            size={26}
            style={{ opacity: 0.85 }}
          />
          <TimerClock time={timeLabel} />
          <DotsRow>
            {Array.from({ length: totalDots }).map((_, index) => (
              <CycleDot
                accentColor={accentColor}
                isActive={index < completedDots}
                key={`cycle-${index}`}
              />
            ))}
          </DotsRow>
          <ModeLabel>{getTimerModeLabel(mode)}</ModeLabel>
        </CenterContent>
      </TimerFace>

      <PlayPauseButton
        aria-label={isRunning ? "Pause timer" : "Start timer"}
        className="timer-action"
        onClick={isRunning ? pause : start}
        onPointerUp={handlePointerUp}
      >
        {isRunning ? <PauseIcon size={32} /> : <PlayIcon size={32} />}
      </PlayPauseButton>
    </RingContainer>
  );
}
