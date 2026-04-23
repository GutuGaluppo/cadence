import ControlsPanel from "../ControlPanel";
import TasksPanel from "../TasksPanel";
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

        <TasksPanel />
      </TimerDashboard>
    </TimerWrapper>
  );
}
