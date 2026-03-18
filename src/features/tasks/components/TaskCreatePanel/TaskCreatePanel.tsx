import { View } from "@/app/layout/MainLayout";
import { useSettingsStore } from "@/features/settings/store/store";
import { IconButton, TextField } from "@mui/material";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { useTaskStore } from "../../store/store";
import {
  AbsoluteBox,
  FieldsContainer,
  PanelTitle,
  PanelWrapper,
  SaveButton,
  StepperControls,
  StepperLabel,
  StepperRow,
  StepperValue,
} from "./styled";

interface TaskCreatePanelProps {
  handleView: (view: View) => void;
}

interface CompactStepperProps {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  onChange: (v: number) => void;
}

const CompactStepper: React.FC<CompactStepperProps> = ({ label, value, unit, min, max, onChange }) => (
  <StepperRow>
    <StepperLabel>{label}</StepperLabel>
    <StepperControls>
      <IconButton
        size="small"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        sx={{ padding: "4px", backgroundColor: "rgba(0,0,0,0.06)", borderRadius: "8px" }}
      >
        <Minus size={14} />
      </IconButton>
      <StepperValue>{value} {unit}</StepperValue>
      <IconButton
        size="small"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        sx={{ padding: "4px", backgroundColor: "rgba(0,0,0,0.06)", borderRadius: "8px" }}
      >
        <Plus size={14} />
      </IconButton>
    </StepperControls>
  </StepperRow>
);

export const TaskCreatePanel: React.FC<TaskCreatePanelProps> = ({ handleView }) => {
  const { addTask } = useTaskStore();
  const { settings } = useSettingsStore();

  const [title, setTitle] = useState("");
  const [focusDuration, setFocusDuration] = useState(settings.focusDuration);
  const [shortBreakDuration, setShortBreakDuration] = useState(settings.shortBreakDuration);
  const [longBreakDuration, setLongBreakDuration] = useState(settings.longBreakDuration);
  const [cyclesBeforeLongBreak, setCyclesBeforeLongBreak] = useState(settings.cyclesBeforeLongBreak);

  const handleSave = async () => {
    if (!title.trim()) return;
    await addTask({ title: title.trim(), focusDuration, shortBreakDuration, longBreakDuration, cyclesBeforeLongBreak });
    handleView("tasks");
  };

  return (
    <PanelWrapper>
      <AbsoluteBox>
        <IconButton onClick={() => handleView("tasks")}>
          <ArrowLeft size={20} color="rgba(0,0,0,0.55)" />
        </IconButton>
      </AbsoluteBox>

      <PanelTitle>New Task</PanelTitle>

      <FieldsContainer>
        <TextField
          fullWidth
          size="small"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              backgroundColor: "rgba(0,0,0,0.04)",
              "& fieldset": { border: "none" },
            },
          }}
        />

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

      <SaveButton onClick={handleSave} sx={{ opacity: title.trim() ? 1 : 0.4, pointerEvents: title.trim() ? "auto" : "none" }}>
        Create Task
      </SaveButton>
    </PanelWrapper>
  );
};
