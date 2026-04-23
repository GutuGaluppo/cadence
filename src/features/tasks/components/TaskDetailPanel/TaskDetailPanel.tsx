import { useAppViewStore } from "@/app/store/useAppViewStore";
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

const TaskDetailPanel: React.FC = () => {
  const { tasks, activeTaskId, updateTask } = useTaskStore();
  const { applyTask, start } = useTimerStore();
  const setView = useAppViewStore((state) => state.setView);

  const task = tasks.find((t) => t.id === activeTaskId);
  const [focusDuration, setFocusDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [cyclesBeforeLongBreak, setCyclesBeforeLongBreak] = useState(4);

  useEffect(() => {
    if (!task) {
      setView("timer");
      return;
    }

    setFocusDuration(task.focusDuration ?? 25);
    setShortBreakDuration(task.shortBreakDuration ?? 5);
    setLongBreakDuration(task.longBreakDuration ?? 15);
    setCyclesBeforeLongBreak(task.cyclesBeforeLongBreak ?? 4);
  }, [setView, task]);

  if (!task) {
    return null;
  }

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
    setView("timer");
  };

  return (
    <PanelWrapper>
      <AbsoluteBox>
        <IconButton onClick={() => setView("timer")}>
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
