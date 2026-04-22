import { View } from "@/app/layout/MainLayout";
import { useTaskStore } from "@/features/tasks/store/store";
import { useTimerStore } from "@/features/timer/store/useTimerStore";
import { IconButton } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  AbsoluteBox,
  FieldsContainer,
  PanelTitle,
  PanelWrapper,
  SaveButton,
} from "../TaskCreatePanel/styled";
import { CompactStepper } from "../TaskCreatePanel/TaskCreatePanel";

// Reutilize o mesmo CompactStepper do TaskCreatePanel
// (pode extrair para um componente shared se quiser — por ora copie)

interface Props {
  handleView: (view: View) => void;
}

const TaskDetailPanel: React.FC<Props> = ({ handleView }) => {
  const { tasks, activeTaskId, updateTask } = useTaskStore();
  const { applyTask, start } = useTimerStore();

  const task = tasks.find((t) => t.id === activeTaskId);

  useEffect(() => {
    if (!task) {
      handleView("timer");
    }
  }, [handleView, task]);

  if (!task) return null;

  const [focusDuration, setFocusDuration] = useState(task.focusDuration ?? 25);
  const [shortBreakDuration, setShortBreakDuration] = useState(
    task.shortBreakDuration ?? 5,
  );
  const [longBreakDuration, setLongBreakDuration] = useState(
    task.longBreakDuration ?? 15,
  );
  const [cyclesBeforeLongBreak, setCyclesBeforeLongBreak] = useState(
    task.cyclesBeforeLongBreak ?? 4,
  );

  const handleSave = async () => {
    const updated = {
      focusDuration,
      shortBreakDuration,
      longBreakDuration,
      cyclesBeforeLongBreak,
    };
    await updateTask(task.id, updated);
    applyTask({ ...task, ...updated });
    start();
    handleView("timer");
  };

  return (
    <PanelWrapper>
      <AbsoluteBox>
        <IconButton onClick={() => handleView("timer")}>
          <ArrowLeft size={20} color="rgba(0,0,0,0.55)" />
        </IconButton>
      </AbsoluteBox>

      <PanelTitle>{task.title}</PanelTitle>

      <FieldsContainer>
        <CompactStepper
          label="Focus"
          value={focusDuration}
          unit="min"
          min={1}
          max={60}
          onChange={setFocusDuration}
        />
        <CompactStepper
          label="Short Break"
          value={shortBreakDuration}
          unit="min"
          min={1}
          max={30}
          onChange={setShortBreakDuration}
        />
        <CompactStepper
          label="Long Break"
          value={longBreakDuration}
          unit="min"
          min={5}
          max={60}
          onChange={setLongBreakDuration}
        />
        <CompactStepper
          label="Cycles"
          value={cyclesBeforeLongBreak}
          unit="cycles"
          min={1}
          max={10}
          onChange={setCyclesBeforeLongBreak}
        />
      </FieldsContainer>

      <SaveButton onClick={handleSave}>Apply & Start</SaveButton>
    </PanelWrapper>
  );
};

export default TaskDetailPanel;
