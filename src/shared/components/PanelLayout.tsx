import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PanelPage = styled(Box)({
  height: "100%",
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  position: "relative",
});

export const PanelHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  paddingTop: "16px",
  marginBottom: "20px",
});

export const PanelHeaderTitle = styled(Typography)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  fontSize: "1.5rem",
  fontWeight: 500,
  color: theme.palette.text.primary,
  textAlign: "left",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));
