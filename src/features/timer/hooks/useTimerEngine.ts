import { emit } from "@tauri-apps/api/event";
import { isTauriRuntime } from "@/shared/isTauriRuntime";
import { useEffect } from "react";
import { useTimerStore } from "../store/useTimerStore";

function emitTimerTick(timeLeft: number, isRunning: boolean) {
  if (!isTauriRuntime()) {
    return;
  }

  void emit("timer-tick", { timeLeft, isRunning }).catch(() => {});
}

export function useTimerEngine() {
  const state = useTimerStore((s) => s.state);
  const tick = useTimerStore((s) => s.tick);

  useEffect(() => {
    if (state !== "running") return;

    const interval = setInterval(() => {
      tick();
      const { timeLeft } = useTimerStore.getState();
      emitTimerTick(timeLeft, true);
    }, 1000);

    return () => clearInterval(interval);
  }, [state, tick]);

  // Keep the tray menu countdown in sync while the timer is not running,
  // e.g. when the mode, task or durations change.
  useEffect(() => {
    if (state === "running") return;

    emitTimerTick(useTimerStore.getState().timeLeft, false);
    return useTimerStore.subscribe((current, previous) => {
      if (current.state !== "running" && current.timeLeft !== previous.timeLeft) {
        emitTimerTick(current.timeLeft, false);
      }
    });
  }, [state]);
}
