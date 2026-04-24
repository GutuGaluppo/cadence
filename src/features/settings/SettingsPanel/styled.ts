import { Box } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const SettingRowContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  padding: "0",
  "& .row-value": {
    transition: "color 0.15s",
  },
  "&:hover .row-value": {
    color: theme.palette.text.primary,
  },
}));

export const RowValueBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  color: theme.palette.text.secondary,
}));

export const ThemeToggleGroup = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "6px",
  padding: "6px",
  borderRadius: "16px",
  backgroundColor: alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.12 : 0.05),
  border: `1px solid ${alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.26 : 0.12)}`,
}));

export const ThemeToggleButton = styled("button", {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive?: boolean }>(({ isActive = false, theme }) => ({
  appearance: "none",
  border: "none",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  minHeight: 40,
  padding: "0 12px",
  cursor: "pointer",
  backgroundColor: isActive
    ? theme.palette.primary.main
    : "transparent",
  color: isActive
    ? theme.palette.primary.contrastText
    : theme.palette.text.secondary,
  fontSize: "0.8rem",
  fontWeight: 700,
  transition: "background-color 0.2s ease, color 0.2s ease, transform 0.2s ease",
  "&:hover": {
    backgroundColor: isActive
      ? theme.palette.primary.main
      : alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.12 : 0.06),
    color: isActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
  },
  "&:active": {
    transform: "scale(0.98)",
  },
}));
