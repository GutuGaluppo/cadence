import { useAppViewStore } from "@/app/store/useAppViewStore";
import { useTaskStore } from "@/features/tasks/store/store";
import { useTimerStore } from "@/features/timer/store/useTimerStore";
import { PanelBackButton } from "@/shared/components/PanelBackButton";
import { PanelHeader, PanelPage } from "@/shared/components/PanelLayout";
import { TextField } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { FieldsContainer, SaveButton } from "../TaskCreatePanel/styled";
import { CompactStepper } from "../TaskCreatePanel/TaskCreatePanel";

const TaskDetailPanel: React.FC = () => {
  const { tasks, activeTaskId, updateTask } = useTaskStore();
  const { applyTask, start } = useTimerStore();
  const setView = useAppViewStore((state) => state.setView);

  const task = tasks.find((t) => t.id === activeTaskId);
  const [title, setTitle] = useState("");
  const [focusDuration, setFocusDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [cyclesBeforeLongBreak, setCyclesBeforeLongBreak] = useState(4);

  useEffect(() => {
    if (!task) {
      setView("timer");
      return;
    }

    setTitle(task.title);
    setFocusDuration(task.focusDuration ?? 25);
    setShortBreakDuration(task.shortBreakDuration ?? 5);
    setLongBreakDuration(task.longBreakDuration ?? 15);
    setCyclesBeforeLongBreak(task.cyclesBeforeLongBreak ?? 4);
  }, [setView, task]);

  if (!task) {
    return null;
  }

  const handleSave = async () => {
    if (!title.trim()) {
      return;
    }

    const updated = {
      title: title.trim(),
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
    <PanelPage>
      <PanelBackButton onClick={() => setView("timer")} />

      <PanelHeader>
        <TextField
          fullWidth
          size="small"
          placeholder="Task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && void handleSave()}
          sx={(theme) => ({
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: alpha(
                theme.palette.text.primary,
                theme.palette.mode === "dark" ? 0.08 : 0.04,
              ),
              "& fieldset": { border: "none" },
            },
            "& .MuiOutlinedInput-input": {
              padding: "12px 14px",
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: 500,
              color: theme.palette.text.primary,
            },
            "& .MuiOutlinedInput-input::placeholder": {
              color: theme.palette.text.secondary,
              opacity: 1,
            },
          })}
        />
      </PanelHeader>

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

      <SaveButton
        onClick={() => void handleSave()}
        sx={{
          opacity: title.trim() ? 1 : 0.4,
          pointerEvents: title.trim() ? "auto" : "none",
        }}
      >
        Apply & Start
      </SaveButton>
    </PanelPage>
  );
};

export default TaskDetailPanel;
