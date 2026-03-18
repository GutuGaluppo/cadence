import { Checkbox, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, TextField, Typography } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useTaskStore } from "../../store/store";
import { AddTaskRow, ListWrapper } from "./styled";

export const TaskList: React.FC = () => {
  const { tasks, addTask, deleteTask, updateTask, activeTaskId, setActiveTask } =
    useTaskStore();
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask({ title: newTaskTitle.trim() });
      setNewTaskTitle("");
    }
  };

  return (
    <ListWrapper>
      <Typography variant="h6" sx={{ mb: 2, opacity: 0.8, fontWeight: 300 }}>
        Tasks
      </Typography>

      <form onSubmit={handleAddTask}>
        <AddTaskRow>
          <TextField
            fullWidth
            size="small"
            placeholder="What are you working on?"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            sx={{ "& .MuiOutlinedInput-root": { backgroundColor: "rgba(255,255,255,0.05)" } }}
          />
          <IconButton type="submit" color="primary" disabled={!newTaskTitle.trim()}>
            <Plus size={20} />
          </IconButton>
        </AddTaskRow>
      </form>

      <List sx={{ width: "100%" }}>
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ListItem
                sx={{
                  mb: 1,
                  borderRadius: 1,
                  backgroundColor:
                    activeTaskId === task.id ? "rgba(210,180,140,0.1)" : "transparent",
                  border: "1px solid",
                  borderColor:
                    activeTaskId === task.id
                      ? "rgba(210,180,140,0.3)"
                      : "rgba(255,255,255,0.05)",
                  transition: "all 0.2s ease",
                }}
              >
                <Checkbox
                  checked={task.completed}
                  onChange={(e) => updateTask(task.id, { completed: e.target.checked })}
                  sx={{ color: "rgba(255,255,255,0.3)" }}
                />
                <ListItemText
                  primary={task.title}
                  secondary={`${task.pomodoroCount} cycles`}
                  sx={{
                    textDecoration: task.completed ? "line-through" : "none",
                    opacity: task.completed ? 0.5 : 1,
                  }}
                  onClick={() => setActiveTask(task.id)}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() => deleteTask(task.id)}
                    sx={{ opacity: 0.3, "&:hover": { opacity: 1 } }}
                  >
                    <Trash2 size={16} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </List>
    </ListWrapper>
  );
};
