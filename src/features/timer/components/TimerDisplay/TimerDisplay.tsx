import { useIsCompactTimer } from "@/app/window/useCompactWindow";
import ControlsPanel from "../ControlPanel";
import TimerRing from "../TimerRing";
import { TimerDashboard, TimerPanel, TimerWrapper } from "./styled";
import { useInitializeTimerDisplay } from "./useInitializeTimerDisplay";

export function TimerDisplay() {
  useInitializeTimerDisplay();
  const compact = useIsCompactTimer();

  return (
    // Compact: the whole window around the circle is the drag handle. Only the
    // element carrying the attribute drags, so the action buttons stay clickable.
    <TimerWrapper compact={compact} data-tauri-drag-region={compact || undefined}>
      <ControlsPanel compact={compact} />

      <TimerDashboard compact={compact}>
        <TimerPanel>
          <TimerRing />
        </TimerPanel>
      </TimerDashboard>
    </TimerWrapper>
  );
}
