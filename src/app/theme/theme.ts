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
    background: "#111318",
    surface: "#1A1D24",
    border: "rgba(255, 255, 255, 0.12)",
    primaryText: "#F5F7FB",
    secondaryText: "rgba(245, 247, 251, 0.72)",
    accent: "#9A94FF",
    accentContrast: "#111318",
    accentFaint: "rgba(154, 148, 255, 0.18)",
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
