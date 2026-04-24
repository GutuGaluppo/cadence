import { useSettingsStore } from "@/features/settings/store/store";
import { useTimerEngine } from "@/features/timer/hooks/useTimerEngine";
import { isTauriRuntime } from "@/shared/isTauriRuntime";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { createMuiAppTheme, createStyledTheme } from "../theme/theme";

export function AppProviders({ children }: { children: ReactNode }) {
  useTimerEngine();
  const loadSettings = useSettingsStore((state) => state.loadSettings);
  const alwaysOnTop = useSettingsStore((state) => state.settings.alwaysOnTop);
  const themeMode = useSettingsStore((state) => state.settings.themeMode);
  const muiTheme = createMuiAppTheme(themeMode);
  const styledTheme = createStyledTheme(themeMode);

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
      <ThemeProvider theme={styledTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </MuiThemeProvider>
  );
}
