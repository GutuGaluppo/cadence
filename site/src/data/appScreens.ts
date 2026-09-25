import homeLight from "../assets/app-home-light.png";
import homeDark from "../assets/app-home-dark.png";
import taskModalLight from "../assets/app-task-modal-light.png";
import taskModalDark from "../assets/app-task-modal-dark.png";
import runningLight from "../assets/app-running-light.png";
import runningDark from "../assets/app-running-dark.png";
import tasksLight from "../assets/app-tasks-light.png";
import tasksDark from "../assets/app-tasks-dark.png";
import taskCreateLight from "../assets/app-task-create-light.png";
import taskCreateDark from "../assets/app-task-create-dark.png";
import settingsLight from "../assets/app-settings-light.png";
import settingsDark from "../assets/app-settings-dark.png";

export type AppTheme = "light" | "dark";

export type AppScreenKey =
	| "home"
	| "taskModal"
	| "running"
	| "tasks"
	| "taskCreate"
	| "settings";

// Real captures of the app window (see site/README.md for how to regenerate).
export const appScreens: Record<AppScreenKey, Record<AppTheme, string>> = {
	home: { light: homeLight, dark: homeDark },
	taskModal: { light: taskModalLight, dark: taskModalDark },
	running: { light: runningLight, dark: runningDark },
	tasks: { light: tasksLight, dark: tasksDark },
	taskCreate: { light: taskCreateLight, dark: taskCreateDark },
	settings: { light: settingsLight, dark: settingsDark },
};

export const appScreenOrder: AppScreenKey[] = [
	"home",
	"taskModal",
	"running",
	"tasks",
	"taskCreate",
	"settings",
];

// Width/height of every capture, so the browser reserves space before load.
export const APP_SCREEN_WIDTH = 700;
export const APP_SCREEN_HEIGHT = 1096;
