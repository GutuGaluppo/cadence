import { useAppViewStore } from "@/app/store/useAppViewStore";
import { Tooltip } from "@mui/material";
import { ListChecks, RotateCcw, Settings } from "lucide-react";
import { useTimerStore } from "../../store/useTimerStore";
import { CircleButton } from "../shared/styled";
import {
  ArcSlot,
  BottomControlsRow,
  CompactCircleButton,
  CompactControlsRow,
  ControlsRow,
} from "./styled";

interface ControlPanelProps {
  compact?: boolean;
}

// Compact layout geometry, in window pixels. The circle is 250px, so its
// centre sits at (130, 125) in the 260px-wide window. Actions sit on a circle
// of ARC_RADIUS around that centre, clear of the ring's edge, and fan out
// from straight down (0°) so they read as a smile under the timer.
const ARC_CENTER = { x: 130, y: 125 };
const ARC_RADIUS = 165;
const ARC_ANGLES = [-24, 0, 24];

function arcPosition(angleDeg: number) {
  const radians = (angleDeg * Math.PI) / 180;
  return {
    left: ARC_CENTER.x + ARC_RADIUS * Math.sin(radians),
    top: ARC_CENTER.y + ARC_RADIUS * Math.cos(radians),
  };
}

export default function ControlPanel({ compact = false }: ControlPanelProps) {
  const reset = useTimerStore((state) => state.reset);
  const setView = useAppViewStore((state) => state.setView);

  if (compact) {
    const actions = [
      { title: "Reset timer", label: "Reset timer", icon: RotateCcw, onClick: reset },
      { title: "Settings", label: "Open settings", icon: Settings, onClick: () => setView("settings") },
      { title: "Task list", label: "Open task list", icon: ListChecks, onClick: () => setView("tasks") },
    ];

    return (
      <CompactControlsRow className="compact-controls">
        {actions.map(({ title, label, icon: Icon, onClick }, index) => (
          <ArcSlot key={title} style={arcPosition(ARC_ANGLES[index])}>
            <Tooltip title={title}>
              <CompactCircleButton aria-label={label} onClick={onClick}>
                <Icon size={22} />
              </CompactCircleButton>
            </Tooltip>
          </ArcSlot>
        ))}
      </CompactControlsRow>
    );
  }

  return (
    <>
      <ControlsRow>
        <Tooltip title="Reset timer">
          <CircleButton aria-label="Reset timer" onClick={reset}>
            <RotateCcw size={22} />
          </CircleButton>
        </Tooltip>

        <Tooltip title="Settings">
          <CircleButton
            aria-label="Open settings"
            onClick={() => setView("settings")}
          >
            <Settings size={22} />
          </CircleButton>
        </Tooltip>
      </ControlsRow>

      <BottomControlsRow>
        <Tooltip title="Task list">
          <CircleButton aria-label="Open task list" onClick={() => setView("tasks")}>
            <ListChecks size={22} />
          </CircleButton>
        </Tooltip>
      </BottomControlsRow>
    </>
  );
}
