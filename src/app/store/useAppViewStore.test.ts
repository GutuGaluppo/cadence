import { beforeEach, describe, expect, it } from "vitest";
import { useAppViewStore } from "./useAppViewStore";

describe("useAppViewStore", () => {
  beforeEach(() => {
    useAppViewStore.setState({ view: "timer" });
  });

  it("changes the active view", () => {
    useAppViewStore.getState().setView("tasks");

    expect(useAppViewStore.getState().view).toBe("tasks");
  });

  it("resets the active view back to timer", () => {
    useAppViewStore.getState().setView("settings");
    useAppViewStore.getState().resetView();

    expect(useAppViewStore.getState().view).toBe("timer");
  });
});
