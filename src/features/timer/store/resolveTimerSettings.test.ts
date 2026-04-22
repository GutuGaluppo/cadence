import { DEFAULT_SETTINGS, type Task } from "@/types";
import { describe, expect, it } from "vitest";
import { resolveTimerSettings } from "./resolveTimerSettings";

const baseTask: Task = {
  id: "task-1",
  title: "Write release notes",
  completed: false,
  pomodoroCount: 0,
  createdAt: 0,
};

describe("resolveTimerSettings", () => {
  it("returns global settings when no active task exists", () => {
    expect(resolveTimerSettings(DEFAULT_SETTINGS, null)).toEqual(
      DEFAULT_SETTINGS,
    );
  });

  it("overrides only task-defined timing fields", () => {
    const task: Task = {
      ...baseTask,
      focusDuration: 40,
      cyclesBeforeLongBreak: 6,
    };

    expect(resolveTimerSettings(DEFAULT_SETTINGS, task)).toEqual({
      ...DEFAULT_SETTINGS,
      focusDuration: 40,
      cyclesBeforeLongBreak: 6,
    });
  });

  it("preserves global fields unrelated to task timing", () => {
    const task: Task = {
      ...baseTask,
      shortBreakDuration: 7,
    };

    const resolved = resolveTimerSettings(DEFAULT_SETTINGS, task);

    expect(resolved.soundEnabled).toBe(DEFAULT_SETTINGS.soundEnabled);
    expect(resolved.alwaysOnTop).toBe(DEFAULT_SETTINGS.alwaysOnTop);
  });
});
