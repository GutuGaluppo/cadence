import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MainContainer = styled(Box)({
  width: "100vw",
  height: "100vh",
  backgroundColor: "#EFEDE9",
  padding: "clamp(16px, 4vw, 24px)",
  overflow: "hidden",
  position: "relative",
  "& > div": {
    height: "100%",
  },
});

export const ViewFallback = styled(Box)({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "rgba(26,26,26,0.55)",
  fontSize: "0.78rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
});

export const VersionBadge = styled(Box)({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 48,
  maxHeight: 48,
  right: 12,
  bottom: 10,
  zIndex: 20,
  padding: "6px 10px",
  borderRadius: 999,
  backgroundColor: "rgba(255,255,255,0.72)",
  border: "1px solid rgba(46,37,102,0.12)",
  color: "rgba(26,26,26,0.62)",
  fontSize: "0.58rem",
  fontWeight: "700",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  pointerEvents: "none",
  backdropFilter: "blur(12px)",
});
