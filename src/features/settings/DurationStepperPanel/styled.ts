import { Box, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const PanelWrapper = styled(Box)({
  height: "100%",
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  padding: "0 32px",
});

export const LabelText = styled(Box)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 400,
  color: theme.palette.text.primary,
  textAlign: "center",
  marginBottom: "32px",
}));

export const StepperRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "24px",
});

export const ValueBox = styled(Box)({
  textAlign: "center",
  minWidth: 60,
  height: 52,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
});

export const ValueText = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: 1,
  fontVariantNumeric: "tabular-nums",
}));

export const ValueUnit = styled(Typography)(({ theme }) => ({
  fontSize: "0.7rem",
  color: theme.palette.text.secondary,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
}));

export const StepButton = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.1 : 0.06),
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.16 : 0.1),
  },
  "&:disabled": {
    opacity: 0.25,
    cursor: "default",
  },
}));
