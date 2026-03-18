import { useSettingsStore } from "@/features/settings/store/store";
import { useTaskStore } from "@/features/tasks/store/store";
import { TimerMode, TimerState } from "@/types";
import {
  Coffee,
  ListChecks,
  PauseIcon,
  PencilRuler,
  PlayIcon,
  RotateCcw,
  Settings,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect } from "react";
import { formatTime } from "../../formatTime";
import { useTimerStore } from "../../store/useTimerStore";
import {
  CenterContent,
  CircleButton,
  ControlsRow,
  CycleDot,
  DotsRow,
  FlipClockRow,
  FlipDigitSlot,
  ModeLabel,
  PlayPauseButton,
  RingContainer,
  TimerWrapper,
} from "./styled";

const FlipDigit: React.FC<{ digit: string }> = ({ digit }) => (
  <FlipDigitSlot>
    <AnimatePresence mode="popLayout">
      <motion.span
        key={digit}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        exit={{ rotateX: 90, opacity: 0 }}
        transition={{ duration: 0.18, ease: "easeInOut" }}
        style={{
          display: "inline-block",
          fontSize: "3rem",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          color: "#1A1A1A",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {digit}
      </motion.span>
    </AnimatePresence>
  </FlipDigitSlot>
);

interface TimerDisplayProps {
  onSettingsOpen?: () => void;
  onTasksOpen?: () => void;
}

const MODE_COLOR: Record<TimerMode, string> = {
  [TimerMode.FOCUS]: "#2E2566",
  [TimerMode.SHORT_BREAK]: "#5DBB8A",
  [TimerMode.LONG_BREAK]: "#E8B93A",
};

const RING_RADIUS = 80;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

// [light shade, dark shade] — same hue spectrum per mode
const MODE_GRADIENT: Record<TimerMode, [string, string]> = {
  [TimerMode.FOCUS]: ["#9B93D8", "#1A1248"],
  [TimerMode.SHORT_BREAK]: ["#9ADEC0", "#1E6643"],
  [TimerMode.LONG_BREAK]: ["#FFF0A8", "#C8920A"],
};

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  onSettingsOpen,
  onTasksOpen,
}) => {
  const {
    state,
    mode,
    timeLeft,
    totalDuration,
    start,
    pause,
    reset,
    completedCycles,
  } = useTimerStore();
  const { activeTaskId, incrementPomodoro } = useTaskStore();
  const { settings } = useSettingsStore();

  const progress =
    totalDuration > 0 ? ((totalDuration - timeLeft) / totalDuration) * 100 : 0;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress / 100);

  const cyclesInRound = completedCycles % settings.cyclesBeforeLongBreak;
  const totalDots = settings.cyclesBeforeLongBreak;

  const color = MODE_COLOR[mode];
  const [gradientLight, gradientDark] = MODE_GRADIENT[mode];
  const isRunning = state === TimerState.RUNNING;
  const ModeIcon = mode === TimerMode.FOCUS ? PencilRuler : Coffee;

  const getModeLabel = () => {
    if (mode === TimerMode.FOCUS) return "FOCUS";
    if (mode === TimerMode.SHORT_BREAK) return "SHORT BREAK";
    return "LONG BREAK";
  };

  const getModeColor = () => {
    if (isRunning) {
      return color;
    }
    return '#333'
  };

  useEffect(() => {
    if (state === TimerState.COMPLETED) {
      if (Notification.permission === "granted") {
        new Notification("Cadence", { body: `${getModeLabel()} finished.` });
      }
      if (mode === TimerMode.FOCUS && activeTaskId) {
        incrementPomodoro(activeTaskId);
      }
    }
  }, [state, mode, activeTaskId, incrementPomodoro]);

  useEffect(() => {
    if (
      Notification.permission !== "granted" &&
      Notification.permission !== "denied"
    ) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <TimerWrapper>
      <RingContainer>
        <svg
          width="240"
          height="240"
          viewBox="0 0 200 200"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <defs>
            <linearGradient
              id="arcGradient"
              x1="100"
              y1="20"
              x2="100"
              y2="180"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={gradientLight} />
              <stop offset="100%" stopColor={gradientDark} />
            </linearGradient>
          </defs>

          <circle
            cx="100"
            cy="100"
            r={RING_RADIUS}
            fill="none"
            stroke="rgba(0,0,0,0.10)"
            strokeWidth="6"
          />
          <circle
            cx="100"
            cy="100"
            r={RING_RADIUS}
            fill="none"
            stroke="url(#arcGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 100 100)"
            style={{
              transition: "stroke-dashoffset 1s linear",
              opacity: state === TimerState.PAUSED ? 0.5 : 1,
            }}
          />
        </svg>

        <CenterContent>
          <ModeIcon size={26} color={getModeColor()} style={{ opacity: 0.85 }} />
          <FlipClockRow>
            {formatTime(timeLeft).split("").map((char, i) =>
              char === ":" ? (
                <span key={i} style={{ fontSize: "3rem", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#1A1A1A" }}>:</span>
              ) : (
                <FlipDigit key={i} digit={char} />
              )
            )}
          </FlipClockRow>
          <DotsRow>
            {Array.from({ length: totalDots }).map((_, i) => (
              <CycleDot
                key={i}
                sx={{ bgcolor: i < cyclesInRound ? color : "rgba(0,0,0,0.1)" }}
              />
            ))}
          </DotsRow>

          <ModeLabel>{getModeLabel()}</ModeLabel>
        </CenterContent>
      </RingContainer>

      <ControlsRow>
        <CircleButton onClick={reset}>
          <RotateCcw size={20} color="rgba(0,0,0,0.45)" />
        </CircleButton>

        <PlayPauseButton onClick={isRunning ? pause : start}>
          {isRunning ? <PauseIcon size={30} /> : <PlayIcon size={30} />}
        </PlayPauseButton>

        <CircleButton onClick={onTasksOpen}>
          <ListChecks size={20} color="rgba(0,0,0,0.45)" />
        </CircleButton>

        <CircleButton onClick={onSettingsOpen}>
          <Settings size={20} color="rgba(0,0,0,0.45)" />
        </CircleButton>
      </ControlsRow>
    </TimerWrapper>
  );
};
