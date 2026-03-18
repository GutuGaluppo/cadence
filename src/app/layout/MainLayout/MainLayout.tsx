import DurationStepperPanel from "@/features/settings/DurationStepperPanel";
import { SettingsPanel } from "@/features/settings/SettingsPanel";
import { TaskCreatePanel } from "@/features/tasks/components/TaskCreatePanel";
import { TasksPage } from "@/features/tasks/components/TasksPage";
import { TimerDisplay } from "@/features/timer/components/TimerDisplay";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { MainContainer } from "./styled";

export type View =
  | "timer"
  | "settings"
  | "focus-duration"
  | "short-break"
  | "long-break"
  | "cycles-before-long-break"
  | "tasks"
  | "task-create";

const slide = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2 },
};

export default function MainLayout() {
  const [view, setView] = useState<View>("timer");
  const handleView = (value: View) => setView(value);

  return (
    <MainContainer>
      <AnimatePresence mode="wait">
        {view === "timer" && (
          <motion.div key="timer" {...slide}>
            <TimerDisplay
              onSettingsOpen={() => setView("settings")}
              onTasksOpen={() => setView("tasks")}
            />
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
              unit="min"
              min={1}
              max={60}
            />
          </motion.div>
        )}

        {view === "short-break" && (
          <motion.div key="short-break" {...slide}>
            <DurationStepperPanel
              handleView={handleView}
              settingsKey="shortBreakDuration"
              label="Short Break"
              unit="min"
              min={1}
              max={30}
            />
          </motion.div>
        )}

        {view === "long-break" && (
          <motion.div key="long-break" {...slide}>
            <DurationStepperPanel
              handleView={handleView}
              settingsKey="longBreakDuration"
              label="Long Break"
              unit="min"
              min={5}
              max={60}
            />
          </motion.div>
        )}

        {view === "cycles-before-long-break" && (
          <motion.div key="cycles-before-long-break" {...slide}>
            <DurationStepperPanel
              handleView={handleView}
              settingsKey="cyclesBeforeLongBreak"
              label="Cycles Before Long Break"
              unit="cycles"
              min={4}
              max={10}
            />
          </motion.div>
        )}

        {view === "tasks" && (
          <motion.div key="tasks" {...slide}>
            <TasksPage handleView={handleView} />
          </motion.div>
        )}

        {view === "task-create" && (
          <motion.div key="task-create" {...slide}>
            <TaskCreatePanel handleView={handleView} />
          </motion.div>
        )}
      </AnimatePresence>
    </MainContainer>
  );
}
