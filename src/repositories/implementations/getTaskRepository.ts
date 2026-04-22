import { isTauriRuntime } from "@/shared/isTauriRuntime";
import { TaskRepository } from "../interfaces/TaskRepository";
import { LocalStorageTaskRepository } from "./LocalStorageTaskRepository";

const browserRepository = new LocalStorageTaskRepository();
let repositoryPromise: Promise<TaskRepository> | null = null;

export function getTaskRepository(): Promise<TaskRepository> {
  if (!repositoryPromise) {
    repositoryPromise = isTauriRuntime()
      ? import("./SQLiteTaskRepository")
          .then(({ SQLiteTaskRepository }) => new SQLiteTaskRepository())
          .catch(() => browserRepository)
      : Promise.resolve(browserRepository);
  }

  return repositoryPromise;
}
