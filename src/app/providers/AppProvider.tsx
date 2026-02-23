import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { theme } from "../theme/theme";
import { useTimerEngine } from "@/features/timer/hooks/useTimerEngine";

const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgba(210, 180, 140, 1)',
    },
    background: {
      default: 'rgba(13, 13, 13, 1)',
      paper: 'rgba(33, 33, 33, 0.75)',
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
});

export function AppProviders({ children }: { children: ReactNode }) {
  useTimerEngine();

  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </MuiThemeProvider>
  );
}
