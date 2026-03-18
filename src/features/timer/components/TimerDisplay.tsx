import { useSettingsStore } from "@/features/settings/store/store";
import { useTaskStore } from "@/features/tasks/store/store";
import { TimerMode, TimerState } from "@/types";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Coffee, Eye, RotateCcw, Settings } from "lucide-react";
import React, { useEffect } from "react";
import { formatTime } from "../formatTime";
import { useTimerStore } from "../store/useTimerStore";

interface TimerDisplayProps {
  onSettingsOpen?: () => void;
}

const MODE_COLOR: Record<TimerMode, string> = {
  [TimerMode.FOCUS]: "#2E2566",
  [TimerMode.SHORT_BREAK]: "#5DBB8A",
  [TimerMode.LONG_BREAK]: "#E8B93A",
};

const RING_RADIUS = 80;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ onSettingsOpen }) => {
  const { state, mode, timeLeft, totalDuration, start, pause, reset, completedCycles } =
    useTimerStore();
  const { activeTaskId, incrementPomodoro } = useTaskStore();
  const { settings } = useSettingsStore();

  const progress = totalDuration > 0 ? ((totalDuration - timeLeft) / totalDuration) * 100 : 0;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress / 100);

  const cyclesInRound = completedCycles % settings.cyclesBeforeLongBreak;
  const totalDots = settings.cyclesBeforeLongBreak;

  const color = MODE_COLOR[mode];
  const isRunning = state === TimerState.RUNNING;
  const ModeIcon = mode === TimerMode.FOCUS ? Eye : Coffee;

  const getModeLabel = () => {
    if (mode === TimerMode.FOCUS) return "FOCUS";
    if (mode === TimerMode.SHORT_BREAK) return "SHORT BREAK";
    return "LONG BREAK";
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        py: 2,
      }}
    >
      {/* Circular ring */}
      <Box
        sx={{
          position: "relative",
          width: 240,
          height: 240,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="240"
          height="240"
          viewBox="0 0 200 200"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {/* Base ring */}
          <circle
            cx="100"
            cy="100"
            r={RING_RADIUS}
            fill="none"
            stroke="rgba(0,0,0,0.07)"
            strokeWidth="10"
          />
          {/* Progress ring */}
          <circle
            cx="100"
            cy="100"
            r={RING_RADIUS}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 100 100)"
            style={{
              transition: "stroke-dashoffset 1s linear, stroke 0.4s ease",
              opacity: state === TimerState.PAUSED ? 0.5 : 1,
            }}
          />
        </svg>

        {/* Center content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
            zIndex: 1,
          }}
        >
          <ModeIcon size={16} color={color} style={{ opacity: 0.85 }} />

          <Typography
            sx={{
              fontSize: "3rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#1A1A1A",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatTime(timeLeft)}
          </Typography>

          {/* Cycle dots */}
          <Stack direction="row" spacing={0.6} sx={{ mt: 0.75 }}>
            {Array.from({ length: totalDots }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: i < cyclesInRound ? color : "rgba(0,0,0,0.1)",
                  transition: "background-color 0.3s ease",
                }}
              />
            ))}
          </Stack>

          <Typography
            sx={{
              fontSize: "0.58rem",
              letterSpacing: "0.18em",
              color: "rgba(0,0,0,0.35)",
              mt: 0.25,
            }}
          >
            {getModeLabel()}
          </Typography>
        </Box>
      </Box>

      {/* Bottom controls */}
      <Stack direction="row" alignItems="center" spacing={1.5}>
        {/* Reset */}
        <IconButton
          component="button"
          onClick={reset}
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            bgcolor: "rgba(0,0,0,0.06)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": { bgcolor: "rgba(0,0,0,0.1)" },
            transition: "background-color 0.2s ease",
          }}
        >
          <RotateCcw size={15} color="rgba(0,0,0,0.45)" />
        </IconButton>

        {/* Start / Pause pill */}
        <Box
          component="button"
          onClick={isRunning ? pause : start}
          sx={{
            px: 4,
            py: 1.25,
            bgcolor: "#1A1A1A",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 10,
            fontSize: "0.8rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            cursor: "pointer",
            minWidth: 130,
            "&:hover": { bgcolor: "#2E2566" },
            transition: "background-color 0.2s ease",
          }}
        >
          {isRunning ? "PAUSE" : state === TimerState.PAUSED ? "RESUME" : "START"}
        </Box>

        {/* Settings */}
        <Box
          component="button"
          onClick={onSettingsOpen}
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            bgcolor: "rgba(0,0,0,0.06)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": { bgcolor: "rgba(0,0,0,0.1)" },
            transition: "background-color 0.2s ease",
          }}
        >
          <Settings size={15} color="rgba(0,0,0,0.45)" />
        </Box>
      </Stack>
    </Box>
  );
};
