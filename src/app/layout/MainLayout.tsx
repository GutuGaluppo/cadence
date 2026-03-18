import DurationStepperPanel from "@/features/settings/DurationStepperPanel";
import { SettingsPanel } from "@/features/settings/SettingsPanel";
import { TimerDisplay } from "@/features/timer/components/TimerDisplay";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export type View =
  | "timer"
  | "settings"
  | "focus-duration"
  | "short-break"
  | "long-break";

const slide = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2 },
};

export default function MainLayout() {
  const [view, setView] = useState<View>("timer");
  const handleView = (value: View) => {
    setView(value);
  };
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "#EFEDE9",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <AnimatePresence mode="wait">
        {view === "timer" && (
          <motion.div key="timer" {...slide}>
            <Box sx={{ px: 4, py: 4 }}>
              <TimerDisplay onSettingsOpen={() => setView("settings")} />
            </Box>
          </motion.div>
        )}

        {view === "settings" && (
          <motion.div key="settings" {...slide}>
            <SettingsPanel handleView={handleView} />
          </motion.div>
        )}

        {view === "focus-duration" && (
          <motion.div key="focus-duration" {...slide}>
            <DurationStepperPanel
              handleView={handleView}
              settingsKey="focusDuration"
              label="Focus Session"
              min={1}
              max={60}
            />
          </motion.div>
        )}

        {view === "short-break" && (
          <motion.div key="short-break" {...slide}>
            <DurationStepperPanel
              handleView={setView}
              settingsKey="shortBreakDuration"
              label="Short Break"
              min={1}
              max={30}
            />
          </motion.div>
        )}

        {view === "long-break" && (
          <motion.div key="long-break" {...slide}>
            <DurationStepperPanel
              handleView={setView}
              settingsKey="longBreakDuration"
              label="Long Break"
              min={5}
              max={60}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
