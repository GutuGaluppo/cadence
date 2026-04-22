import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

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

export const AbsoluteBox = styled(Box)({
  position: "absolute",
  top: 16,
  left: 16,
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: "rgba(0,0,0,0.06)",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});

export const LabelText = styled(Box)({
  fontSize: "1.5rem",
  fontWeight: 400,
  color: "#1A1A1A",
  textAlign:'center',
  marginBottom: "32px",
});

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

export const ValueText = styled(Typography)({
  fontSize: "3rem",
  fontWeight: 700,
  color: "#1A1A1A",
  lineHeight: 1,
  fontVariantNumeric: "tabular-nums",
});

export const ValueUnit = styled(Typography)({
  fontSize: "0.7rem",
  color: "rgba(0,0,0,0.9)",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
});

export const StepButton = styled(Box)({
  width: 40,
  height: 40,
  backgroundColor: "rgba(0,0,0,0.06)",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  "&:disabled": {
    opacity: 0.25,
    cursor: "default",
  },
});
