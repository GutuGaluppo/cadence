import { IconButton } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const CircleButton = styled(IconButton)(({ theme }) => ({
  width: 36,
  height: 36,
  padding: 0,
  borderRadius: "12px",
  backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.14 : 0.06),
  border: `1px solid ${alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.2 : 0.08)}`,
  color: theme.palette.text.secondary,
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.22 : 0.1),
    borderColor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.28 : 0.14),
    transform: "translateY(-1px)",
  },
  "&.Mui-disabled": {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.1 : 0.04),
    borderColor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.14 : 0.06),
    color: alpha(theme.palette.text.primary, 0.28),
  },
}));

export const InlineAction = styled("button")(({ theme }) => ({
  appearance: "none",
  border: `1px solid ${alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.2 : 0.08)}`,
  borderRadius: "999px",
  backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.14 : 0.06),
  color: theme.palette.text.secondary,
  padding: "6px 9px",
  fontSize: "0.66rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor: "pointer",
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.22 : 0.1),
    borderColor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.28 : 0.14),
    color: theme.palette.text.primary,
  },
  "&:disabled": {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.1 : 0.04),
    borderColor: alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.14 : 0.06),
    color: alpha(theme.palette.text.primary, 0.32),
    cursor: "default",
  },
}));
