import { useAppViewStore } from "@/app/store/useAppViewStore";
import { useSettingsStore } from "@/features/settings/store/store";
import { PanelBackButton } from "@/shared/components/PanelBackButton";
import {
  PanelHeader,
  PanelHeaderTitle,
  PanelPage,
} from "@/shared/components/PanelLayout";
import { IconButton, TextField } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { useTaskStore } from "../../store/store";
import {
  FieldsContainer,
  SaveButton,
  StepperControls,
  StepperLabel,
  StepperRow,
  StepperValue,
} from "./styled";

interface CompactStepperProps {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  onChange: (v: number) => void;
}

export const CompactStepper: React.FC<CompactStepperProps> = ({
  label,
  value,
  unit,
  min,
  max,
  onChange,
}) => (
  <StepperRow>
    <StepperLabel>{label}</StepperLabel>
    <StepperControls>
      <IconButton
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        size="small"
        sx={{
          backgroundColor: (theme) =>
            alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.1 : 0.06),
          borderRadius: "8px",
          padding: "4px",
        }}
      >
        <Minus size={14} />
      </IconButton>
      <StepperValue>
        {value} {unit}
      </StepperValue>
      <IconButton
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        size="small"
        sx={{
          backgroundColor: (theme) =>
            alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.1 : 0.06),
          borderRadius: "8px",
          padding: "4px",
        }}
      >
        <Plus size={14} />
      </IconButton>
    </StepperControls>
  </StepperRow>
);

export const TaskCreatePanel: React.FC = () => {
  const { addTask } = useTaskStore();
  const { settings } = useSettingsStore();
  const setView = useAppViewStore((state) => state.setView);

  const [title, setTitle] = useState("");
  const [focusDuration, setFocusDuration] = useState(settings.focusDuration);
  const [shortBreakDuration, setShortBreakDuration] = useState(
    settings.shortBreakDuration,
  );
  const [longBreakDuration, setLongBreakDuration] = useState(settings.longBreakDuration);
  const [cyclesBeforeLongBreak, setCyclesBeforeLongBreak] = useState(
    settings.cyclesBeforeLongBreak,
  );
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!title.trim()) {
      return;
    }

    setError(null);

    try {
      await addTask({
        title: title.trim(),
        focusDuration,
        shortBreakDuration,
        longBreakDuration,
        cyclesBeforeLongBreak,
      });
      setView("tasks");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Failed to create task:", err);
      setError(msg);
    }
  };

  return (
    <PanelPage>
      <PanelBackButton onClick={() => setView("tasks")} />

      <PanelHeader>
        <PanelHeaderTitle>New Task</PanelHeaderTitle>
      </PanelHeader>

      <FieldsContainer>
        <TextField
          fullWidth
          size="small"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
          sx={(theme) => ({
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              backgroundColor: alpha(
                theme.palette.text.primary,
                theme.palette.mode === "dark" ? 0.08 : 0.04,
              ),
              "& fieldset": { border: "none" },
            },
            "& .MuiOutlinedInput-input": {
              color: theme.palette.text.primary,
            },
            "& .MuiOutlinedInput-input::placeholder": {
              color: theme.palette.text.secondary,
              opacity: 1,
            },
          })}
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

      {error && (
        <p
          style={{
            color: "#E75A5A",
            fontSize: "0.75rem",
            margin: "8px 0 0",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}

      <SaveButton
        onClick={handleSave}
        sx={{
          opacity: title.trim() ? 1 : 0.4,
          pointerEvents: title.trim() ? "auto" : "none",
        }}
      >
        Create Task
      </SaveButton>
    </PanelPage>
  );
};
