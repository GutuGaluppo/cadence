import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

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
