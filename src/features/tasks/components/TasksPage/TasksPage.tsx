import { useAppViewStore } from "@/app/store/useAppViewStore";
import { PanelBackButton } from "@/shared/components/PanelBackButton";
import {
  PanelHeader,
  PanelHeaderTitle,
  PanelPage,
} from "@/shared/components/PanelLayout";
import { useTimerStore } from "@/features/timer/store/useTimerStore";
import { Task, TimerState } from "@/types";
import { Checkbox, IconButton } from "@mui/material";
import { Plus, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { useTaskStore } from "../../store/store";
import {
  AddButton,
  EmptyState,
  TaskCard,
  TaskListScroll,
  TaskMeta,
  TaskTitle,
} from "./styled";

export const TasksPage: React.FC = () => {
  const {
    tasks,
    loadTasks,
    updateTask,
    deleteTask,
    activeTaskId,
    setActiveTask,
  } = useTaskStore();

  const { applyTask, state: timerState } = useTimerStore();
  const setView = useAppViewStore((state) => state.setView);

  useEffect(() => {
    void loadTasks();
  }, [loadTasks]);

  const handleClick = (task: Task) => {
    const isDeselecting = activeTaskId === task.id;
    setActiveTask(isDeselecting ? null : task.id);
    applyTask(isDeselecting ? null : task);
    if (!isDeselecting) {
      setView("timer");
    }
  };

  const handleDelete = async (task: Task) => {
    if (activeTaskId === task.id && timerState === TimerState.IDLE) {
      applyTask(null);
    }

    await deleteTask(task.id);
  };

  return (
    <PanelPage>
      <PanelBackButton onClick={() => setView("timer")} />

      <PanelHeader>
        <PanelHeaderTitle>Tasks</PanelHeaderTitle>
      </PanelHeader>

      <TaskListScroll>
        {tasks.length === 0 && (
          <EmptyState>No tasks yet. Add one below.</EmptyState>
        )}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            active={activeTaskId === task.id}
            onClick={() => handleClick(task)}
          >
            <Checkbox
              checked={task.completed}
              size="small"
              onChange={(e) => {
                e.stopPropagation();
                updateTask(task.id, { completed: e.target.checked });
              }}
              onClick={(e) => e.stopPropagation()}
              sx={{
                padding: 0,
                color: "rgba(0,0,0,0.25)",
                "&.Mui-checked": { color: "#2E2566" },
              }}
            />
            <TaskTitle completed={task.completed}>{task.title}</TaskTitle>
            <TaskMeta>{task.pomodoroCount} 🍅</TaskMeta>
            <IconButton
              size="small"
              onClick={async (e) => {
                e.stopPropagation();
                await handleDelete(task);
              }}
              sx={{ padding: "4px", opacity: 0.3, "&:hover": { opacity: 1 } }}
            >
              <Trash2 size={14} />
            </IconButton>
          </TaskCard>
        ))}
      </TaskListScroll>

      <AddButton onClick={() => setView("task-create")}>
        <Plus size={16} />
        New Task
      </AddButton>
    </PanelPage>
  );
};
