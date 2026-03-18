import { View } from "@/app/layout/MainLayout";
import { IconButton, Typography } from "@mui/material";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useSettingsStore } from "../store/store";
import {
  AbsoluteBox,
  LabelText,
  PanelWrapper,
  StepButton,
  StepperRow,
  ValueBox,
} from "./styled";

interface DurationStepperPanelProps {
  handleView: (currView: View) => void;
  settingsKey:
    | "focusDuration"
    | "shortBreakDuration"
    | "longBreakDuration"
    | "cyclesBeforeLongBreak";
  label: string;
  min: number;
  max: number;
}

export default function DurationStepperPanel({
  handleView,
  settingsKey,
  label,
  min,
  max,
}: DurationStepperPanelProps) {
  const { settings, updateSettings } = useSettingsStore();
  const value = settings[settingsKey];

  const update = (delta: number) => {
    const next = Math.min(max, Math.max(min, value + delta));
    updateSettings({ ...settings, [settingsKey]: next });
  };

  return (
    <PanelWrapper>
      <AbsoluteBox>
        <IconButton onClick={() => handleView("settings")}>
          <ArrowLeft size={20} color="rgba(0,0,0,0.55)" />
        </IconButton>
      </AbsoluteBox>

      <LabelText>{label}</LabelText>

      <StepperRow>
        <StepButton>
          <IconButton onClick={() => update(-1)} disabled={value <= min}>
            <Minus size={20} color="rgba(0,0,0,0.6)" />
          </IconButton>
        </StepButton>

        <ValueBox>
          <Typography
            sx={{
              fontSize: "3rem",
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {value}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.7rem",
              color: "rgba(0,0,0,0.35)",
              letterSpacing: "0.1em",
              mt: 0.5,
            }}
          >
            min
          </Typography>
        </ValueBox>

        <StepButton>
          <IconButton onClick={() => update(1)} disabled={value >= max}>
            <Plus size={20} color="rgba(0,0,0,0.6)" />
          </IconButton>
        </StepButton>
      </StepperRow>
    </PanelWrapper>
  );
}
