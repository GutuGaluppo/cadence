import { Box } from "@mui/material";
import styled from "styled-components";

export const PanelWrapper = styled(Box)({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  padding: "0 32px",
});

export const BackButton = styled(Box)({
  position: "absolute",
  top: 16,
  left: 16,
  width: 32,
  height: 32,
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
  fontSize: "0.95rem",
  fontWeight: 400,
  color: "#1A1A1A",
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
