import { Box } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { CircleButton } from "../shared/styled";

export const ControlsRow = styled(Box)({
  position: "absolute",
  top: "10px",
  zIndex: 5,
  width: "calc(100% - 24px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const BottomControlsRow = styled(Box)({
  position: "absolute",
  bottom: "10px",
  zIndex: 5,
  width: "calc(100% - 24px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
});

// Shared easing: fast start, soft landing. Reads as "settled", not "bouncy".
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

// Compact timer: the four actions sit on an arc around the base of the circle
// and only show while the cursor is over the window (see TimerWrapper).
// Each slot is placed by its left/top offset inside this full-window layer.
export const CompactControlsRow = styled(Box)({
  position: "absolute",
  inset: 0,
  zIndex: 5,
  opacity: 0,
  transform: "translateY(6px)",
  pointerEvents: "none",
  transition: `opacity 0.18s ease, transform 0.18s ${EASE_OUT}`,
});

// Centres a 44px action on its arc position (left/top set inline).
export const ArcSlot = styled(Box)({
  position: "absolute",
  width: 44,
  height: 44,
  transform: "translate(-50%, -50%)",
});

export const CompactCircleButton = styled(CircleButton)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  const accent = theme.palette.primary.main;

  return {
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "none",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    transition: [
      "background-color 0.2s ease",
      "color 0.2s ease",
      `transform 0.25s ${EASE_OUT}`,
    ].join(", "),
    "& svg": {
      transition: `transform 0.25s ${EASE_OUT}`,
    },
    "&:hover": {
      backgroundColor: alpha(accent, isDark ? 0.24 : 0.12),
      color: accent,
      transform: "translateY(-2px)",
    },
    "&:hover svg": {
      transform: "scale(1.08)",
    },
    "&:active": {
      transform: "translateY(0) scale(0.94)",
      transitionDuration: "0.12s",
    },
    "&:focus-visible": {
      outline: `2px solid ${alpha(accent, 0.6)}`,
      outlineOffset: 2,
    },
    "@media (prefers-reduced-motion: reduce)": {
      transition: "background-color 0.2s ease, color 0.2s ease",
      "&:hover, &:active": {
        transform: "none",
      },
      "&:hover svg": {
        transform: "none",
      },
    },
  };
});
