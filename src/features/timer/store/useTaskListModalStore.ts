import { create } from "zustand";

interface TaskListModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useTaskListModalStore = create<TaskListModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
