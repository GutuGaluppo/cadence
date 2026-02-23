// src/shared/styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;
      border: string;
      primaryText: string;
      secondaryText: string;
      accent: string;
      accentFaint: string;
    };

    font: {
      family: string;
      size: {
        xl: string;
        lg: string;
        md: string;
        sm: string;
      };
      weight: {
        regular: number;
        medium: number;
        light: number;
      };
    };

    spacing: {
      xl: string;
      lg: string;
      md: string;
      sm: string;
    };

    radius: {
      md: string;
      sm: string;
    };
  }
}