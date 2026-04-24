import { Box, IconButton, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const RingContainer = styled(Box)({
  position: "relative",
  width: 250,
  height: 250,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  "&:hover .timer-face, &:focus-within .timer-face": {
    opacity: 0.22,
    transform: "scale(0.975)",
  },
  "&:hover .timer-action, &:focus-within .timer-action": {
    opacity: 1,
    transform: "scale(1)",
    pointerEvents: "auto",
  },
});

export const TimerFace = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "opacity 0.22s ease, transform 0.22s ease",
});

export const RingSvg = styled("svg")({
  position: "absolute",
  inset: 0,
});

export const CenterContent = styled(Box)({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
  pointerEvents: "none",
});

export const FlipClockRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1px",
});

export const ClockSeparator = styled("span")(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  lineHeight: 1.1,
  color: theme.palette.text.primary,
  fontVariantNumeric: "tabular-nums",
}));

export const DotsRow = styled(Box)({
  display: "flex",
  gap: "6px",
  marginTop: "6px",
});

export const CycleDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "accentColor" && prop !== "isActive",
})<{
  accentColor: string;
  isActive: boolean;
}>(({ accentColor, isActive, theme }) => ({
  width: 6,
  height: 6,
  borderRadius: "50%",
  backgroundColor: isActive ? accentColor : alpha(theme.palette.text.primary, 0.12),
  transition: "background-color 0.3s ease",
}));

export const ModeLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.56rem",
  letterSpacing: "0.2em",
  color: theme.palette.text.secondary,
  marginTop: "2px",
  textTransform: "uppercase",
}));

export const PlayPauseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  margin: "auto",
  width: 158,
  height: 158,
  backgroundColor: alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.36 : 0.32),
  color: theme.palette.mode === "dark" ? theme.palette.common.white : theme.palette.common.white,
  borderRadius: "50%",
  opacity: 0,
  transform: "scale(0.92)",
  pointerEvents: "none",
  boxShadow: "0 14px 28px rgba(26,18,72,0.18)",
  transition:
    "opacity 0.22s ease, transform 0.22s ease, background-color 0.2s ease",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.56),
  },
}));
