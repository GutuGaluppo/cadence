import { TimerMode } from "@/types";

const MODE_LABELS: Record<TimerMode, string> = {
  [TimerMode.FOCUS]: "Focus",
  [TimerMode.SHORT_BREAK]: "Short Break",
  [TimerMode.LONG_BREAK]: "Long Break",
};

export function getTimerModeLabel(mode: TimerMode): string {
  return MODE_LABELS[mode];
}
