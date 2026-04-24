import { Box, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const TaskListScroll = styled(Box)(({ theme }) => ({
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": { display: "none" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: alpha(theme.palette.text.primary, 0.15),
    borderRadius: 4,
  },
}));

export const TaskCard = styled(Box)<{ active?: boolean }>(({ active, theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 12px",
  borderRadius: "10px",
  backgroundColor: active
    ? alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.18 : 0.08)
    : alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.08 : 0.04),
  border: `1px solid ${
    active ? alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.3 : 0.2) : "transparent"
  }`,
  cursor: "pointer",
  transition: "background-color 0.2s ease, border-color 0.2s ease",
  "&:hover": {
    backgroundColor: active
      ? alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.24 : 0.1)
      : alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.12 : 0.07),
  },
}));

export const TaskTitle = styled(Typography)<{ completed?: boolean }>(({ completed, theme }) => ({
  flex: 1,
  fontSize: "0.875rem",
  color: completed
    ? alpha(theme.palette.text.primary, 0.35)
    : theme.palette.text.primary,
  textDecoration: completed ? "line-through" : "none",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const TaskMeta = styled(Typography)(({ theme }) => ({
  fontSize: "0.7rem",
  color: theme.palette.text.secondary,
  whiteSpace: "nowrap",
}));

export const AddButton = styled(Box)(({ theme }) => ({
  marginTop: "16px",
  height: 44,
  borderRadius: "12px",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  cursor: "pointer",
  fontSize: "0.875rem",
  fontWeight: 500,
  transition: "background-color 0.2s ease",
  "&:hover": { backgroundColor: theme.palette.primary.main },
}));

export const EmptyState = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: alpha(theme.palette.text.primary, 0.38),
  fontSize: "0.875rem",
  marginTop: "32px",
}));
