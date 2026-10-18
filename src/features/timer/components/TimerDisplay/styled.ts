import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TimerWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "compact",
})<{ compact?: boolean }>(({ compact }) => ({
  position: "relative",
  height: "100%",
  minHeight: 0,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: compact ? "flex-start" : "center",
  ...(compact && {
    // Revealing gets a slightly longer, softer ease than hiding (set on the row).
    // Only the buttons take pointer events, so the rest of the layer (the
    // circle and the window around it) stays draggable.
    "&:hover .compact-controls": {
      opacity: 1,
      transform: "translateY(0)",
      transition:
        "opacity 0.28s ease, transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
    },
    "&:hover .compact-controls button": {
      pointerEvents: "auto",
    },
  }),
}));

export const TimerDashboard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "compact",
})<{ compact?: boolean }>(({ theme, compact }) =>
  compact
    ? {
        width: 250,
        height: 250,
        display: "grid",
        margin: "0 auto",
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: theme.palette.background.default,
      }
    : {
        width: "100%",
        maxWidth: 280,
        display: "grid",
        gap: "14px",
        margin: "0 auto",
        padding: "12px",
        borderRadius: "28px",
        overflow: "hidden",
      },
);

export const TimerPanel = styled(Box)({
  display: "grid",
  placeItems: "center",
});
