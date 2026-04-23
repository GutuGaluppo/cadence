import { useEffect } from "react";
import { useTimerDisplayStore } from "../../store/useTimerDisplayStore";

export function useInitializeTimerDisplay() {
  const ensureTasksLoaded = useTimerDisplayStore((state) => state.ensureTasksLoaded);

  useEffect(() => {
    if (typeof Notification === "undefined") {
      return;
    }

    if (Notification.permission === "default") {
      void Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    void ensureTasksLoaded();
  }, [ensureTasksLoaded]);
}
