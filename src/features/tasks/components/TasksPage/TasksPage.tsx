import { View } from "@/app/layout/MainLayout";
import { Checkbox, IconButton } from "@mui/material";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { useTaskStore } from "../../store/store";
import {
  AbsoluteBox,
  AddButton,
  EmptyState,
  PageTitle,
  PageWrapper,
  TaskCard,
  TaskListScroll,
  TaskMeta,
  TaskTitle,
} from "./styled";
import { useTimerStore } from "@/features/timer/store/useTimerStore";
import { Task, TimerState } from "@/types";

interface TasksPageProps {
  handleView: (view: View) => void;
}

export const TasksPage: React.FC<TasksPageProps> = ({ handleView }) => {
  const {
    tasks,
    loadTasks,
    updateTask,
    deleteTask,
    activeTaskId,
    setActiveTask,
  } = useTaskStore();

  const { applyTask, state: timerState } = useTimerStore();

  useEffect(() => {
    void loadTasks();
  }, [loadTasks]);

  const handleClick = (task: Task) => {
    const isDeselecting = activeTaskId === task.id;
    setActiveTask(isDeselecting ? null : task.id);
    applyTask(isDeselecting ? null : task);
    if (!isDeselecting) handleView("timer");
  };

  const handleDelete = async (task: Task) => {
    if (activeTaskId === task.id && timerState === TimerState.IDLE) {
      applyTask(null);
    }

    await deleteTask(task.id);
  };

  return (
    <PageWrapper>
      <AbsoluteBox>
        <IconButton onClick={() => handleView("timer")}>
          <ArrowLeft size={20} color="rgba(0,0,0,0.55)" />
        </IconButton>
      </AbsoluteBox>

      <PageTitle>Tasks</PageTitle>

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

      <AddButton onClick={() => handleView("task-create")}>
        <Plus size={16} />
        New Task
      </AddButton>
    </PageWrapper>
  );
};
