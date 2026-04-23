import { APP_VERSION } from "@/app/version";
import { useAppViewStore } from "@/app/store/useAppViewStore";
import { TimerDisplay } from "@/features/timer/components/TimerDisplay";
import { AnimatePresence, motion } from "motion/react";
import { lazy, Suspense } from "react";
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
  const view = useAppViewStore((state) => state.view);

  return (
    <MainContainer>
      <AnimatePresence mode="wait">
        {view === "timer" && (
          <motion.div key="timer" {...slide}>
            <TimerDisplay />
          </motion.div>
        )}

        {view === "settings" && (
          <motion.div key="settings" {...slide}>
            <Suspense fallback={<LazyViewFallback />}>
              <SettingsPanel />
            </Suspense>
          </motion.div>
        )}

        {view === "focus-duration" && (
          <motion.div key="focus-duration" {...slide}>
            <Suspense fallback={<LazyViewFallback />}>
              <DurationStepperPanel
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
              <TasksPage />
            </Suspense>
          </motion.div>
        )}

        {view === "task-create" && (
          <motion.div key="task-create" {...slide}>
            <Suspense fallback={<LazyViewFallback />}>
              <TaskCreatePanel />
            </Suspense>
          </motion.div>
        )}

        {view === "task-detail" && (
          <motion.div key="task-detail" {...slide}>
            <Suspense fallback={<LazyViewFallback />}>
              <TaskDetailPanel />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
      <VersionBadge>v{APP_VERSION}</VersionBadge>
    </MainContainer>
  );
}
