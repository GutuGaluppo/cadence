import { APP_VERSION } from "@/app/version";
import { TimerDisplay } from "@/features/timer/components/TimerDisplay";
import { AnimatePresence, motion } from "motion/react";
import { lazy, Suspense, useState } from "react";
import { MainContainer, VersionBadge, ViewFallback } from "./styled";

const DurationStepperPanel = lazy(
  () => import("@/features/settings/DurationStepperPanel"),
);
const TaskDetailPanel = lazy(
  () => import("@/features/tasks/components/TaskDetailPanel"),
);
const SettingsPanel = lazy(async () => {
  const module = await import("@/features/settings/SettingsPanel");
  return { default: module.SettingsPanel };
});
const TaskCreatePanel = lazy(async () => {
  const module = await import("@/features/tasks/components/TaskCreatePanel");
  return { default: module.TaskCreatePanel };
});
const TasksPage = lazy(async () => {
  const module = await import("@/features/tasks/components/TasksPage");
  return { default: module.TasksPage };
});

export type View =
  | "timer"
  | "settings"
  | "focus-duration"
  | "short-break"
  | "long-break"
  | "cycles-before-long-break"
  | "tasks"
  | "task-create"
  | "task-detail";

const slide = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2 },
};

function LazyViewFallback() {
  return <ViewFallback>Loading...</ViewFallback>;
}

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
              onActiveTaskOpen={() => setView("task-detail")}
            />
          </motion.div>
        )}

        {view === "settings" && (
          <motion.div key="settings" {...slide}>
            <Suspense fallback={<LazyViewFallback />}>
              <SettingsPanel handleView={handleView} />
            </Suspense>
          </motion.div>
        )}

        {view === "focus-duration" && (
          <motion.div key="focus-duration" {...slide}>
            <Suspense fallback={<LazyViewFallback />}>
              <DurationStepperPanel
                handleView={handleView}
                settingsKey="focusDuration"
                label="Focus Session"
                unit="min"
                min={1}
                max={60}
              />
            </Suspense>
          </motion.div>
        )}

        {view === "short-break" && (
          <motion.div key="short-break" {...slide}>
            <Suspense fallback={<LazyViewFallback />}>
              <DurationStepperPanel
                handleView={handleView}
                settingsKey="shortBreakDuration"
                label="Short Break"
                unit="min"
                min={1}
                max={30}
              />
            </Suspense>
          </motion.div>
        )}

        {view === "long-break" && (
          <motion.div key="long-break" {...slide}>
            <Suspense fallback={<LazyViewFallback />}>
              <DurationStepperPanel
                handleView={handleView}
                settingsKey="longBreakDuration"
                label="Long Break"
                unit="min"
                min={5}
                max={60}
              />
            </Suspense>
          </motion.div>
        )}

        {view === "cycles-before-long-break" && (
          <motion.div key="cycles-before-long-break" {...slide}>
            <Suspense fallback={<LazyViewFallback />}>
              <DurationStepperPanel
                handleView={handleView}
                settingsKey="cyclesBeforeLongBreak"
                label="Cycles Before Long Break"
                unit="cycles"
                min={4}
                max={10}
              />
            </Suspense>
          </motion.div>
        )}

        {view === "tasks" && (
          <motion.div key="tasks" {...slide}>
            <Suspense fallback={<LazyViewFallback />}>
              <TasksPage handleView={handleView} />
            </Suspense>
          </motion.div>
        )}

        {view === "task-create" && (
          <motion.div key="task-create" {...slide}>
            <Suspense fallback={<LazyViewFallback />}>
              <TaskCreatePanel handleView={handleView} />
            </Suspense>
          </motion.div>
        )}

        {view === "task-detail" && (
          <motion.div key="task-detail" {...slide}>
            <Suspense fallback={<LazyViewFallback />}>
              <TaskDetailPanel handleView={handleView} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
      <VersionBadge>v{APP_VERSION}</VersionBadge>
    </MainContainer>
  );
}
