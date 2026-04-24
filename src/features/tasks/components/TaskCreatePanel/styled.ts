import { Box, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const FieldsContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": { display: "none" },
});

export const StepperRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 14px",
  borderRadius: "10px",
  backgroundColor: alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.08 : 0.04),
}));

export const StepperLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.primary,
  fontWeight: 400,
}));

export const StepperControls = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

export const StepperValue = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
  minWidth: "52px",
  textAlign: "center",
  fontVariantNumeric: "tabular-nums",
}));

export const SaveButton = styled(Box)(({ theme }) => ({
  marginTop: "16px",
  height: 44,
  borderRadius: "12px",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "0.875rem",
  fontWeight: 500,
  transition: "background-color 0.2s ease",
  "&:hover": { backgroundColor: theme.palette.primary.main },
}));
