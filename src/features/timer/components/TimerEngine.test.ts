import { DEFAULT_SETTINGS, TimerMode } from "@/types";
import { describe, expect, it } from "vitest";
import { TimerEngine } from "./TimerEngine";

describe("TimerEngine.calculateInitialTime", () => {
  it("returns focus duration in seconds", () => {
    expect(
      TimerEngine.calculateInitialTime(TimerMode.FOCUS, DEFAULT_SETTINGS),
    ).toBe(25 * 60);
  });

  it("returns short break duration in seconds", () => {
    expect(
      TimerEngine.calculateInitialTime(TimerMode.SHORT_BREAK, DEFAULT_SETTINGS),
    ).toBe(5 * 60);
  });

  it("returns long break duration in seconds", () => {
    expect(
      TimerEngine.calculateInitialTime(TimerMode.LONG_BREAK, DEFAULT_SETTINGS),
    ).toBe(15 * 60);
  });
});

describe("TimerEngine.getNextMode", () => {
  it("returns focus after any break mode", () => {
    expect(
      TimerEngine.getNextMode(
        TimerMode.SHORT_BREAK,
        0,
        DEFAULT_SETTINGS.cyclesBeforeLongBreak,
      ),
    ).toBe(TimerMode.FOCUS);
  });

  it("returns short break before the long-break threshold", () => {
    expect(
      TimerEngine.getNextMode(
        TimerMode.FOCUS,
        0,
        DEFAULT_SETTINGS.cyclesBeforeLongBreak,
      ),
    ).toBe(TimerMode.SHORT_BREAK);
  });

  it("returns long break when the focus threshold is reached", () => {
    expect(
      TimerEngine.getNextMode(
        TimerMode.FOCUS,
        DEFAULT_SETTINGS.cyclesBeforeLongBreak - 1,
        DEFAULT_SETTINGS.cyclesBeforeLongBreak,
      ),
    ).toBe(TimerMode.LONG_BREAK);
  });
});
