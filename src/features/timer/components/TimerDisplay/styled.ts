import { Box, Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TimerWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "24px",
});

export const RingContainer = styled(Box)({
  position: "relative",
  width: 240,
  height: 240,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const CenterContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
  zIndex: 1,
});

export const TimeDisplay = styled(Typography)({
  fontSize: "3rem",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  lineHeight: 1.1,
  color: "#1A1A1A",
  fontVariantNumeric: "tabular-nums",
});

export const DotsRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "5px",
  marginTop: "6px",
});

export const CycleDot = styled(Box)({
  width: 6,
  height: 6,
  borderRadius: "50%",
  transition: "background-color 0.3s ease",
});

export const ModeLabel = styled(Typography)({
  fontSize: "0.58rem",
  letterSpacing: "0.18em",
  color: "rgba(0,0,0,0.35)",
  marginTop: "2px",
});

export const ControlsRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "15px",
});

export const CircleButton = styled(IconButton)({
  width: 40,
  height: 40,
  padding:0,
  borderRadius: "20px",
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

export const PlayPauseButton = styled(Box)({
  width: 55,
  height: 55,
  backgroundColor: "#1A1A1A",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "15%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "#2E2566",
  },
});
