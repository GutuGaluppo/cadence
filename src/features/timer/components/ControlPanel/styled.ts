import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ControlsRow = styled(Box)({
  position: "absolute",
  top: "10px",
  width: "calc(100% - 24px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
