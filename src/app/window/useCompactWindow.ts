import { useAppViewStore } from "@/app/store/useAppViewStore";
import { useTaskListModalStore } from "@/features/timer/store/useTaskListModalStore";
import { isTauriRuntime } from "@/shared/isTauriRuntime";
import { useEffect } from "react";

// Height leaves a 40px gap between the 250px circle and the action row.
export const COMPACT_WINDOW_SIZE = { width: 260, height: 348 };
export const FULL_WINDOW_SIZE = { width: 350, height: 520 };
const FULL_WINDOW_MIN_SIZE = { width: 300, height: 420 };

/**
 * The timer view is always the compact circle, whether it is running or not,
 * so the app opens reduced. Opening any panel (settings, tasks, task list)
 * brings back the full window.
 */
export function useIsCompactTimer(): boolean {
  const view = useAppViewStore((store) => store.view);
  const isTaskListOpen = useTaskListModalStore((store) => store.isOpen);

  return view === "timer" && !isTaskListOpen;
}

export function useCompactWindow(compact: boolean) {
  // The native window is transparent, so the page behind the card must be too.
  useEffect(() => {
    document.documentElement.style.background = "transparent";
    document.body.style.background = "transparent";
  }, []);

  useEffect(() => {
    if (!isTauriRuntime()) {
      return;
    }

    let disposed = false;

    const syncWindowSize = async () => {
      const [{ getCurrentWindow }, { LogicalSize, PhysicalPosition }] =
        await Promise.all([
          import("@tauri-apps/api/window"),
          import("@tauri-apps/api/dpi"),
        ]);

      if (disposed) {
        return;
      }

      const appWindow = getCurrentWindow();
      const target = compact ? COMPACT_WINDOW_SIZE : FULL_WINDOW_SIZE;
      const scale = await appWindow.scaleFactor();
      const position = await appWindow.outerPosition();
      const size = await appWindow.innerSize();

      // Compact windows are smaller than the configured minimum, so the
      // constraint has to be lifted first (or restored when expanding).
      await appWindow.setMinSize(
        compact
          ? null
          : new LogicalSize(FULL_WINDOW_MIN_SIZE.width, FULL_WINDOW_MIN_SIZE.height),
      );
      await appWindow.setSize(new LogicalSize(target.width, target.height));

      // Keep the window centred on where it was, instead of anchoring top-left.
      await appWindow.setPosition(
        new PhysicalPosition(
          Math.round(position.x + (size.width - target.width * scale) / 2),
          Math.round(position.y + (size.height - target.height * scale) / 2),
        ),
      );
    };

    void syncWindowSize().catch(() => {});

    return () => {
      disposed = true;
    };
  }, [compact]);
}
