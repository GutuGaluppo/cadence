import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

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
