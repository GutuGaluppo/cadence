import { useSettingsStore } from "@/features/settings/store/store";
import { useTimerEngine } from "@/features/timer/hooks/useTimerEngine";
import { isTauriRuntime } from "@/shared/isTauriRuntime";
import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material";
import { ReactNode, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme/theme";

const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2E2566",
    },
    background: {
      default: "transparent",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "rgba(0,0,0,0.5)",
    },
  },
  typography: {
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: "transparent" },
      },
    },
  },
});

export function AppProviders({ children }: { children: ReactNode }) {
  useTimerEngine();
  const loadSettings = useSettingsStore((state) => state.loadSettings);
  const alwaysOnTop = useSettingsStore((state) => state.settings.alwaysOnTop);

  useEffect(() => {
    void loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    let disposed = false;

    if (!isTauriRuntime()) {
      return;
    }

    const syncAlwaysOnTop = async () => {
      const { getCurrentWindow } = await import("@tauri-apps/api/window");

      if (disposed) {
        return;
      }

      await getCurrentWindow().setAlwaysOnTop(alwaysOnTop);
    };

    void syncAlwaysOnTop().catch(() => {});

    return () => {
      disposed = true;
    };
  }, [alwaysOnTop]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </MuiThemeProvider>
  );
}
