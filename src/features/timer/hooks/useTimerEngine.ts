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

  // Clear tray title when timer is not running
  useEffect(() => {
    if (state !== "running") {
      const { timeLeft } = useTimerStore.getState();
      emitTimerTick(timeLeft, false);
    }
  }, [state]);
}
