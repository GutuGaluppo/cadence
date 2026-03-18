import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PanelContainer = styled(Box)({
  padding: "24px",
  position: "relative",
});

export const Wrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
});

export const BackButton = styled(IconButton)({
  position: "absolute",
  top: 40,
  left: 10,
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});

export const SettingRowContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  padding: "0",
  "& .row-value": {
    transition: "color 0.15s",
  },
  "&:hover .row-value": {
    color: "rgba(0,0,0,0.7)",
  },
});

export const RowValueBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});
