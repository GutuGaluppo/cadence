import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PanelWrapper = styled(Box)({
  height: "100%",
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  position: "relative",
});

export const AbsoluteBox = styled(Box)({
  position: "absolute",
  top: 16,
  left: 16,
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: "rgba(0,0,0,0.06)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.2s ease",
  "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" },
});

export const PanelTitle = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: 500,
  color: "#1A1A1A",
  textAlign: "center",
  paddingTop: "18px",
  marginBottom: "24px",
});

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

export const StepperRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 14px",
  borderRadius: "10px",
  backgroundColor: "rgba(0,0,0,0.04)",
});

export const StepperLabel = styled(Typography)({
  fontSize: "0.875rem",
  color: "#1A1A1A",
  fontWeight: 400,
});

export const StepperControls = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

export const StepperValue = styled(Typography)({
  fontSize: "0.875rem",
  fontWeight: 700,
  color: "#1A1A1A",
  minWidth: "52px",
  textAlign: "center",
  fontVariantNumeric: "tabular-nums",
});

export const SaveButton = styled(Box)({
  marginTop: "16px",
  height: 44,
  borderRadius: "12px",
  backgroundColor: "#1A1A1A",
  color: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "0.875rem",
  fontWeight: 500,
  transition: "background-color 0.2s ease",
  "&:hover": { backgroundColor: "#2E2566" },
});
