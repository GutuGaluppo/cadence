import { useEffect } from "react";
import { useTimerStore } from "../store/useTimerStore";

export function useTimerEngine() {
  const state = useTimerStore(s => s.state);
  const tick = useTimerStore(s => s.tick);

  useEffect(() => {
    if (state !== "running") return;

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [state, tick]);
}