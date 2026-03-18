import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { theme } from "../theme/theme";
import { useTimerEngine } from "@/features/timer/hooks/useTimerEngine";

const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2E2566',
    },
    background: {
      default: 'transparent',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: 'rgba(0,0,0,0.5)',
    },
  },
  typography: {
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: 'transparent' },
      },
    },
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
