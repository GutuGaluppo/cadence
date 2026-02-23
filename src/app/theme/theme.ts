// src/app/theme/theme.ts
import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    background: "rgba(13, 13, 13, 1)",      // deep neutral
    surface: "rgba(33, 33, 33, 0.75)",       // semi-translucent glass surface
    border: "rgba(255, 255, 255, 0.12)",     // very subtle light border

    primaryText: "rgba(245, 245, 245, 1)",    // bright, crisp
    secondaryText: "rgba(175, 175, 175, 1)",  // muted but readable

    accent: "rgba(96, 122, 240, 1)",          // subtle cool blue accent
    accentFaint: "rgba(96, 122, 240, 0.4)",   // faint cool accent
  },

  font: {
    family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",

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