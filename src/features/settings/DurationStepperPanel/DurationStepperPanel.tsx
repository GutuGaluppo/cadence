import { useAppViewStore } from "@/app/store/useAppViewStore";
import { PanelBackButton } from "@/shared/components/PanelBackButton";
import { IconButton, Tooltip } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { type WheelEventHandler, useState } from "react";
import { useSettingsStore } from "../store/store";
import {
  LabelText,
  PanelWrapper,
  StepButton,
  StepperRow,
  ValueBox,
  ValueText,
  ValueUnit,
} from "./styled";

interface DurationStepperPanelProps {
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
  settingsKey,
  label,
  unit,
  min,
  max,
}: DurationStepperPanelProps) {
  const { settings, updateSettings } = useSettingsStore();
  const setView = useAppViewStore((state) => state.setView);
  const value = settings[settingsKey];
  const [direction, setDirection] = useState<1 | -1>(1);

  const update = (delta: number) => {
    const next = Math.min(max, Math.max(min, value + delta));
    if (next === value) return;
    setDirection(delta > 0 ? 1 : -1);
    updateSettings({ ...settings, [settingsKey]: next });
  };

  const handleWheel: WheelEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    update(event.deltaY < 0 ? 1 : -1);
  };

  return (
    <PanelWrapper>
      <PanelBackButton onClick={() => setView("settings")} />

      <LabelText>{label}</LabelText>

      <Tooltip
        arrow
        enterDelay={1000}
        enterNextDelay={1000}
        placement="bottom"
        title="Scroll to change value"
      >
        <StepperRow onWheel={handleWheel}>
          <StepButton>
            <IconButton disabled={value <= min} onClick={() => update(-1)}>
              <Minus size={20} color="rgba(0,0,0,0.6)" />
            </IconButton>
          </StepButton>

          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ValueBox>
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.div
                  animate={{ y: 0, opacity: 1 }}
                  custom={direction}
                  exit={{ y: direction * -40, opacity: 0 }}
                  initial={{ y: direction * 40, opacity: 0 }}
                  key={value}
                  style={{ position: "absolute" }}
                  transition={{ duration: 0.18, ease: "easeInOut" }}
                >
                  <ValueText>{value}</ValueText>
                </motion.div>
              </AnimatePresence>
            </ValueBox>
            <ValueUnit sx={{ mt: 0.5 }}>{unit}</ValueUnit>
          </div>

          <StepButton>
            <IconButton disabled={value >= max} onClick={() => update(1)}>
              <Plus size={20} color="rgba(0,0,0,0.6)" />
            </IconButton>
          </StepButton>
        </StepperRow>
      </Tooltip>
    </PanelWrapper>
  );
}
