import Database from "@tauri-apps/plugin-sql";
import { Task, CreateTaskDTO, UpdateTaskDTO } from "@/types";
import { TaskRepository } from "../interfaces/TaskRepository";

export class SQLiteTaskRepository implements TaskRepository {
  private dbPromise = Database.load("sqlite:cadence.db");

  private mapRowToTask(row: any): Task {
    return {
      id: row.id,
      title: row.title,
      completed: Boolean(row.completed),
      pomodoroCount: row.pomodoro_count,
      createdAt: row.created_at,
    };
  }

  async getAll(): Promise<Task[]> {
    const db = await this.dbPromise;
    const rows = await db.select("SELECT * FROM tasks ORDER BY created_at DESC");
    return rows.map(this.mapRowToTask);
  }

  async getById(id: string): Promise<Task | null> {
    const db = await this.dbPromise;
    const rows = await db.select(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );

    return rows.length ? this.mapRowToTask(rows[0]) : null;
  }

  async create(dto: CreateTaskDTO): Promise<Task> {
    const db = await this.dbPromise;

    const task: Task = {
      id: crypto.randomUUID(),
      title: dto.title,
      completed: false,
      pomodoroCount: 0,
      createdAt: Date.now(),
    };

    await db.execute(
      `INSERT INTO tasks (id, title, completed, pomodoro_count, created_at)
       VALUES (?, ?, ?, ?, ?)`,
      [
        task.id,
        task.title,
        0,
        task.pomodoroCount,
        task.createdAt,
      ]
    );

    return task;
  }

  async update(id: string, dto: UpdateTaskDTO): Promise<Task> {
    const db = await this.dbPromise;

    const existing = await this.getById(id);
    if (!existing) throw new Error("Task not found");

    const updated: Task = { ...existing, ...dto };

    await db.execute(
      `UPDATE tasks
       SET title = ?, completed = ?, pomodoro_count = ?
       WHERE id = ?`,
      [
        updated.title,
        updated.completed ? 1 : 0,
        updated.pomodoroCount,
        id,
      ]
    );

    return updated;
  }

  async delete(id: string): Promise<void> {
    const db = await this.dbPromise;
    await db.execute("DELETE FROM tasks WHERE id = ?", [id]);
  }
}