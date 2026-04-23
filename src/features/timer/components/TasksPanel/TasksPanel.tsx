import { useAppViewStore } from "@/app/store/useAppViewStore";
import { useShallow } from "zustand/react/shallow";
import { useTaskStore } from "@/features/tasks/store/store";
import { Task } from "@/types";
import { useTimerDisplayStore } from "../../store/useTimerDisplayStore";
import { InlineAction } from "../shared/styled";
import TasksPanelHeader from "./TasksPanelHeader";
import {
  EmptyTasksState,
  EmptyTasksText,
  TaskPreviewCard,
  TaskPreviewCopy,
  TaskPreviewCount,
  TaskPreviewList,
  TaskPreviewMeta,
  TaskPreviewTitle,
  TasksPanelRoot,
} from "./styled";

const PREVIEW_TASK_LIMIT = 2;

function formatTaskMeta(task: Task): string {
  if (task.focusDuration != null || task.shortBreakDuration != null) {
    const focusDuration = task.focusDuration ?? 25;
    const shortBreakDuration = task.shortBreakDuration ?? 5;

    return `${focusDuration} min focus · ${shortBreakDuration} min break`;
  }

  return "Uses default cadence";
}

function getPreviewTasks(tasks: Task[], activeTaskId: string | null): Task[] {
  return [...tasks]
    .sort((left, right) => {
      if (left.id === activeTaskId) {
        return -1;
      }

      if (right.id === activeTaskId) {
        return 1;
      }

      if (left.completed !== right.completed) {
        return Number(left.completed) - Number(right.completed);
      }

      return right.createdAt - left.createdAt;
    })
    .slice(0, PREVIEW_TASK_LIMIT);
}

function getEmptyTasksMessage({
  hasLoaded,
  isLoading,
  tasksLoadFailed,
}: {
  hasLoaded: boolean;
  isLoading: boolean;
  tasksLoadFailed: boolean;
}): string {
  if (tasksLoadFailed && !hasLoaded) {
    return "Unable to load tasks in the timer preview right now.";
  }

  if (isLoading || !hasLoaded) {
    return "Loading tasks...";
  }

  return "No tasks yet. Create one to bind a cadence to your next focus block.";
}

export default function TasksPanel() {
  const { activeTaskId, hasLoaded, isLoading, tasks } = useTaskStore(
    useShallow((state) => ({
      activeTaskId: state.activeTaskId,
      hasLoaded: state.hasLoaded,
      isLoading: state.isLoading,
      tasks: state.tasks,
    })),
  );
  const { ensureTasksLoaded, tasksLoadFailed, toggleTaskSelection } =
    useTimerDisplayStore(
      useShallow((state) => ({
        ensureTasksLoaded: state.ensureTasksLoaded,
        tasksLoadFailed: state.tasksLoadFailed,
        toggleTaskSelection: state.toggleTaskSelection,
      })),
    );
  const setView = useAppViewStore((state) => state.setView);

  const previewTasks = getPreviewTasks(tasks, activeTaskId);
  const showRetryAction = tasksLoadFailed && !hasLoaded;

  const handleRetryLoad = () => {
    void ensureTasksLoaded();
  };

  return (
    <TasksPanelRoot>
      <TasksPanelHeader />

      {previewTasks.length === 0 ? (
        <EmptyTasksState>
          <EmptyTasksText>
            {getEmptyTasksMessage({ hasLoaded, isLoading, tasksLoadFailed })}
          </EmptyTasksText>

          {showRetryAction && (
            <InlineAction onClick={handleRetryLoad} type="button">
              Retry
            </InlineAction>
          )}

          <InlineAction onClick={() => setView("tasks")} type="button">
            Open tasks
          </InlineAction>
        </EmptyTasksState>
      ) : (
        <TaskPreviewList>
          {previewTasks.map((task) => {
            const isActiveTask = activeTaskId === task.id;

            return (
              <TaskPreviewCard
                aria-pressed={isActiveTask}
                isActive={isActiveTask}
                isCompleted={task.completed}
                key={task.id}
                onClick={() => toggleTaskSelection(task)}
                type="button"
              >
                <TaskPreviewCopy>
                  <TaskPreviewTitle>{task.title}</TaskPreviewTitle>
                  <TaskPreviewMeta>{formatTaskMeta(task)}</TaskPreviewMeta>
                </TaskPreviewCopy>

                <TaskPreviewCount isActive={isActiveTask}>
                  {task.pomodoroCount}
                </TaskPreviewCount>
              </TaskPreviewCard>
            );
          })}
        </TaskPreviewList>
      )}
    </TasksPanelRoot>
  );
}
