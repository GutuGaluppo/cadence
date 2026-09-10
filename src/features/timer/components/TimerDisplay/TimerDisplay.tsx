import { TaskListModal } from "../TaskListModal";
import ControlsPanel from "../ControlPanel";
import TimerRing from "../TimerRing";
import { TimerDashboard, TimerPanel, TimerWrapper } from "./styled";
import { useInitializeTimerDisplay } from "./useInitializeTimerDisplay";

export function TimerDisplay() {
  useInitializeTimerDisplay();

  return (
    <TimerWrapper>
      <ControlsPanel />

      <TimerDashboard>
        <TimerPanel>
          <TimerRing />
        </TimerPanel>
      </TimerDashboard>

      <TaskListModal />
    </TimerWrapper>
  );
}
