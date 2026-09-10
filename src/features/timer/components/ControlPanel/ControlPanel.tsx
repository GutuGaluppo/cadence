import { useAppViewStore } from "@/app/store/useAppViewStore";
import { Tooltip } from "@mui/material";
import { ClipboardList, ListChecks, RotateCcw, Settings } from "lucide-react";
import { useTimerStore } from "../../store/useTimerStore";
import { useTaskListModalStore } from "../../store/useTaskListModalStore";
import { CircleButton } from "../shared/styled";
import { ControlsGroup, ControlsRow } from "./styled";

export default function ControlPanel() {
  const reset = useTimerStore((state) => state.reset);
  const setView = useAppViewStore((state) => state.setView);
  const openTaskListModal = useTaskListModalStore((state) => state.open);

  return (
    <ControlsRow>
      <ControlsGroup>
        <Tooltip title="Reset timer">
          <CircleButton aria-label="Reset timer" onClick={reset}>
            <RotateCcw size={20} />
          </CircleButton>
        </Tooltip>

        <Tooltip title="Task list">
          <CircleButton aria-label="Open task list" onClick={openTaskListModal}>
            <ListChecks size={20} />
          </CircleButton>
        </Tooltip>
      </ControlsGroup>

      <ControlsGroup>
        <Tooltip title="Manage tasks">
          <CircleButton
            aria-label="Open task management"
            onClick={() => setView("tasks")}
          >
            <ClipboardList size={20} />
          </CircleButton>
        </Tooltip>

        <Tooltip title="Settings">
          <CircleButton
            aria-label="Open settings"
            onClick={() => setView("settings")}
          >
            <Settings size={20} />
          </CircleButton>
        </Tooltip>
      </ControlsGroup>
    </ControlsRow>
  );
}
