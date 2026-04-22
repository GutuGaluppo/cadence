import { describe, expect, it } from "vitest";
import { LocalStorageTaskRepository } from "./LocalStorageTaskRepository";

class FakeStorage {
  private readonly data = new Map<string, string>();

  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.data.set(key, value);
  }
}

describe("LocalStorageTaskRepository", () => {
  it("creates tasks in reverse chronological order", async () => {
    const repository = new LocalStorageTaskRepository(new FakeStorage());

    const firstTask = await repository.create({ title: "First" });
    const secondTask = await repository.create({ title: "Second" });

    const tasks = await repository.getAll();

    expect(tasks.map((task) => task.id)).toEqual([secondTask.id, firstTask.id]);
  });

  it("updates and deletes an existing task", async () => {
    const repository = new LocalStorageTaskRepository(new FakeStorage());
    const task = await repository.create({ title: "Write release notes" });

    const updatedTask = await repository.update(task.id, {
      completed: true,
      pomodoroCount: 3,
    });

    expect(updatedTask.completed).toBe(true);
    expect(updatedTask.pomodoroCount).toBe(3);
    expect(await repository.getById(task.id)).toMatchObject({
      completed: true,
      pomodoroCount: 3,
    });

    await repository.delete(task.id);

    expect(await repository.getById(task.id)).toBeNull();
    expect(await repository.getAll()).toEqual([]);
  });
});
