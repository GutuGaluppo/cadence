import { useAppViewStore } from "@/app/store/useAppViewStore";
import { useTaskStore } from "@/features/tasks/store/store";
import { ListChecks } from "lucide-react";
import { CircleButton, InlineAction } from "../shared/styled";
import {
  TasksPanelActions,
  TasksPanelHeaderRow,
  TasksPanelTitle,
} from "./styled";

export default function TasksPanelHeader() {
  const activeTaskId = useTaskStore((state) => state.activeTaskId);
  const setView = useAppViewStore((state) => state.setView);
  const hasActiveTask = Boolean(activeTaskId);

  return (
    <TasksPanelHeaderRow>
      <TasksPanelTitle>Tasks</TasksPanelTitle>
      <TasksPanelActions>
        {hasActiveTask && (
          <InlineAction onClick={() => setView("task-detail")} type="button">
            Edit active
          </InlineAction>
        )}
        <CircleButton aria-label="Open tasks" onClick={() => setView("tasks")}>
          <ListChecks size={20} />
        </CircleButton>
      </TasksPanelActions>
    </TasksPanelHeaderRow>
  );
}
