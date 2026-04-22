import { describe, expect, it } from "vitest";
import { formatTime } from "./formatTime";

describe("formatTime", () => {
  it("formats full minutes with zero-padded seconds", () => {
    expect(formatTime(1500)).toBe("25:00");
  });

  it("formats single-digit minutes and seconds", () => {
    expect(formatTime(65)).toBe("01:05");
  });

  it("formats zero seconds", () => {
    expect(formatTime(0)).toBe("00:00");
  });
});
