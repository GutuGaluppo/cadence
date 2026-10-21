import { ThemeMode } from "@/types";
import { alpha, createTheme } from "@mui/material/styles";
import { DefaultTheme } from "styled-components";

const DESIGN_TOKENS = {
  light: {
    background: "#EFEDE9",
    surface: "#FFFFFF",
    border: "rgba(46, 37, 102, 0.12)",
    primaryText: "#1A1A1A",
    secondaryText: "rgba(26, 26, 26, 0.62)",
    accent: "#2E2566",
    accentContrast: "#FFFFFF",
    accentFaint: "rgba(46, 37, 102, 0.14)",
  },
  dark: {
    background: "#1E2E3F",
    surface: "#29405A",
    border: "rgba(206, 226, 240, 0.14)",
    primaryText: "#EEF4F8",
    secondaryText: "rgba(238, 244, 248, 0.68)",
    accent: "#A8E6E0",
    accentContrast: "#1E2E3F",
    accentFaint: "rgba(168, 230, 224, 0.18)",
  },
} satisfies Record<
  ThemeMode,
  {
    background: string;
    surface: string;
    border: string;
    primaryText: string;
    secondaryText: string;
    accent: string;
    accentContrast: string;
    accentFaint: string;
  }
>;

export function createMuiAppTheme(mode: ThemeMode) {
  const tokens = DESIGN_TOKENS[mode];

  return createTheme({
    palette: {
      mode,
      primary: {
        main: tokens.accent,
        contrastText: tokens.accentContrast,
      },
      background: {
        default: tokens.background,
        paper: tokens.surface,
      },
      text: {
        primary: tokens.primaryText,
        secondary: tokens.secondaryText,
      },
      divider: tokens.border,
      action: {
        hover: alpha(tokens.primaryText, mode === "dark" ? 0.08 : 0.05),
        selected: alpha(tokens.accent, mode === "dark" ? 0.2 : 0.12),
        disabled: alpha(tokens.primaryText, 0.32),
        disabledBackground: alpha(tokens.primaryText, mode === "dark" ? 0.12 : 0.08),
      },
    },
    typography: {
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: tokens.background,
            color: tokens.primaryText,
            transition: "background-color 0.2s ease, color 0.2s ease",
          },
          "*": {
            scrollbarWidth: "thin",
            scrollbarColor: `${alpha(tokens.primaryText, 0.16)} transparent`,
          },
          "*::-webkit-scrollbar": {
            width: 5,
            height: 5,
          },
          "*::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: alpha(tokens.primaryText, 0.16),
            borderRadius: 999,
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: alpha(tokens.primaryText, 0.28),
          },
        },
      },
    },
  });
}

export function createStyledTheme(mode: ThemeMode): DefaultTheme {
  const tokens = DESIGN_TOKENS[mode];

  return {
    colors: {
      background: tokens.background,
      surface: tokens.surface,
      border: tokens.border,
      primaryText: tokens.primaryText,
      secondaryText: tokens.secondaryText,
      accent: tokens.accent,
      accentFaint: tokens.accentFaint,
    },
    font: {
      family: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      size: {
        xl: "64px",
        lg: "20px",
        md: "16px",
        sm: "12px",
      },
      weight: {
        regular: 400,
        medium: 500,
        light: 300,
      },
    },
    spacing: {
      xl: "48px",
      lg: "32px",
      md: "16px",
      sm: "8px",
    },
    radius: {
      md: "12px",
      sm: "6px",
    },
  };
}
