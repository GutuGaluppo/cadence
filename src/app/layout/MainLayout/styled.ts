import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MainContainer = styled(Box)({
  width: "100vw",
  height: "100vh",
  backgroundColor: "#EFEDE9",
  padding: "24px",
  overflow: "hidden",
  position: "relative",
});

export const DragRegion = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: 28,
  zIndex: 9999,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  WebkitAppRegion: "drag" as any,
  userSelect: "none",
});
