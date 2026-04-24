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
  paddingTop: "64px",
  marginBottom: "20px",
});

export const PanelHeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 500,
  color: theme.palette.text.primary,
  textAlign: "center",
}));
