import { useAppViewStore } from "@/app/store/useAppViewStore";
import { RotateCcw, Settings } from "lucide-react";
import { useTimerStore } from "../../store/useTimerStore";
import { CircleButton } from "../shared/styled";
import { ControlsRow } from "./styled";

export default function ControlPanel() {
  const reset = useTimerStore((state) => state.reset);
  const setView = useAppViewStore((state) => state.setView);

  return (
    <ControlsRow>
      <CircleButton aria-label="Reset timer" onClick={reset}>
        <RotateCcw size={20} color="rgba(0,0,0,0.45)" />
      </CircleButton>

      <CircleButton
        aria-label="Open settings"
        onClick={() => setView("settings")}
      >
        <Settings size={20} color="rgba(0,0,0,0.45)" />
      </CircleButton>
    </ControlsRow>
  );
}
