import { Box } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const MainContainer = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  backgroundColor: theme.palette.background.default,
  padding: "clamp(16px, 4vw, 24px)",
  overflow: "hidden",
  position: "relative",
  transition: "background-color 0.2s ease",
  "& > div": {
    height: "100%",
  },
}));

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

export const VersionBadge = styled(Box)(({ theme }) => ({
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
  backgroundColor: alpha(theme.palette.background.paper, 0.78),
  border: `1px solid ${alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.24 : 0.12)}`,
  color: theme.palette.text.secondary,
  fontSize: "0.58rem",
  fontWeight: "700",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  pointerEvents: "none",
  backdropFilter: "blur(12px)",
}));
