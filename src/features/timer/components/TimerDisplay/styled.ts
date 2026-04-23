import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TimerWrapper = styled(Box)({
  position: "relative",
  height: "100%",
  minHeight: 0,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const TimerDashboard = styled(Box)({
  width: "100%",
  maxWidth: 280,
  display: "grid",
  gap: "14px",
  margin: "0 auto",
  padding: "12px",
  borderRadius: "28px",
  overflow: "hidden",
});

export const TimerPanel = styled(Box)({
  display: "grid",
  placeItems: "center",
});
