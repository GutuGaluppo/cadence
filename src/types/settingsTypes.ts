export interface Settings {
  focusDuration: number; // minutes
  shortBreakDuration: number; // minutes
  longBreakDuration: number; // minutes
  cyclesBeforeLongBreak: number;
  soundEnabled: boolean;
  alwaysOnTop: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  cyclesBeforeLongBreak: 4,
  soundEnabled: true,
  alwaysOnTop: false,
};
