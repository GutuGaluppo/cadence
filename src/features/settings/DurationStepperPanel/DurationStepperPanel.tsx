import { View } from "@/app/layout/MainLayout";
import { IconButton, Tooltip } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useSettingsStore } from "../store/store";
import {
  AbsoluteBox,
  LabelText,
  PanelWrapper,
  StepButton,
  StepperRow,
  ValueBox,
  ValueText,
  ValueUnit,
} from "./styled";

interface DurationStepperPanelProps {
  handleView: (currView: View) => void;
  settingsKey:
    | "focusDuration"
    | "shortBreakDuration"
    | "longBreakDuration"
    | "cyclesBeforeLongBreak";
  label: string;
  unit: string;
  min: number;
  max: number;
}

export default function DurationStepperPanel({
  handleView,
  settingsKey,
  label,
  unit,
  min,
  max,
}: DurationStepperPanelProps) {
  const { settings, updateSettings } = useSettingsStore();
  const value = settings[settingsKey];
  const [direction, setDirection] = useState<1 | -1>(1);

  const update = (delta: number) => {
    const next = Math.min(max, Math.max(min, value + delta));
    if (next === value) return;
    setDirection(delta > 0 ? 1 : -1);
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

      <Tooltip title="Scroll to change value" placement="bottom" arrow enterDelay={1000} enterNextDelay={1000}>
      <StepperRow onWheel={(e) => { e.preventDefault(); update(e.deltaY < 0 ? 1 : -1); }}>
        <StepButton>
          <IconButton onClick={() => update(-1)} disabled={value <= min}>
            <Minus size={20} color="rgba(0,0,0,0.6)" />
          </IconButton>
        </StepButton>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <ValueBox>
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={value}
                custom={direction}
                initial={{ y: direction * 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: direction * -40, opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeInOut" }}
                style={{ position: "absolute" }}
              >
                <ValueText>{value}</ValueText>
              </motion.div>
            </AnimatePresence>
          </ValueBox>
          <ValueUnit sx={{ mt: 0.5 }}>{unit}</ValueUnit>
        </div>

        <StepButton>
          <IconButton onClick={() => update(1)} disabled={value >= max}>
            <Plus size={20} color="rgba(0,0,0,0.6)" />
          </IconButton>
        </StepButton>
      </StepperRow>
      </Tooltip>
    </PanelWrapper>
  );
}
