import { Box } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const MainContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "compact",
})<{ compact?: boolean }>(({ theme, compact }) => ({
  width: "100vw",
  height: "100vh",
  // The native window is transparent: the card (rounded, bordered) is drawn here.
  backgroundColor: compact ? "transparent" : theme.palette.background.default,
  border: compact ? "none" : `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
  borderRadius: compact ? 0 : 16,
  padding: compact ? 0 : "clamp(16px, 4vw, 24px)",
  overflow: "hidden",
  position: "relative",
  isolation: "isolate",
  transition: "background-color 0.2s ease",
  "& > div": {
    height: "100%",
  },
}));

// Without a native title bar, this strip keeps the card draggable. It sits
// below the page controls so buttons inside it still receive clicks.
export const DragStrip = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: 28,
  zIndex: -1,
});

export const ViewFallback = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  fontSize: "0.78rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
}));
