import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

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
