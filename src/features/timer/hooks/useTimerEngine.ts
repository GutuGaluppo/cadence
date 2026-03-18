import { emit } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { useTimerStore } from "../store/useTimerStore";

export function useTimerEngine() {
  const state = useTimerStore(s => s.state);
  const tick = useTimerStore(s => s.tick);

  useEffect(() => {
    if (state !== "running") return;

    const interval = setInterval(() => {
      tick();
      const { timeLeft } = useTimerStore.getState();
      emit("timer-tick", { timeLeft, isRunning: true });
    }, 1000);

    return () => clearInterval(interval);
  }, [state, tick]);

  // Clear tray title when timer is not running
  useEffect(() => {
    if (state !== "running") {
      const { timeLeft } = useTimerStore.getState();
      emit("timer-tick", { timeLeft, isRunning: false });
    }
  }, [state]);
}