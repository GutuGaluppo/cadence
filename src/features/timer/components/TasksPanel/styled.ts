import { Box, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const TasksPanelRoot = styled(Box)({
  display: "grid",
  gap: "10px",
});

export const TasksPanelHeaderRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
});

export const TasksPanelTitle = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: "0.68rem",
  fontWeight: 700,
  letterSpacing: "0.16em",
  color: theme.palette.text.secondary,
  textTransform: "uppercase",
}));

export const TasksPanelActions = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const TaskPreviewList = styled(Box)({
  display: "grid",
  gap: "10px",
});

export const TaskPreviewCard = styled("button", {
  shouldForwardProp: (prop) => prop !== "isActive" && prop !== "isCompleted",
})<{
  isActive?: boolean;
  isCompleted?: boolean;
}>(({ isActive = false, isCompleted = false, theme }) => ({
  appearance: "none",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  textAlign: "left",
  padding: "12px",
  borderRadius: "16px",
  border: `1px solid ${
    isActive
      ? alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.28 : 0.18)
      : alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.16 : 0.08)
  }`,
  background: isActive
    ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.22 : 0.08)}, ${alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.96 : 0.94)})`
    : alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.92 : 0.88),
  opacity: isCompleted ? 0.62 : 1,
  cursor: "pointer",
  transition:
    "transform 0.18s ease, border-color 0.18s ease, background-color 0.18s ease, opacity 0.18s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    borderColor: isActive
      ? alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.36 : 0.22)
      : alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.22 : 0.12),
  },
}));

export const TaskPreviewCopy = styled(Box)({
  minWidth: 0,
  display: "grid",
  gap: "4px",
});

export const TaskPreviewTitle = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: "0.86rem",
  fontWeight: 600,
  color: theme.palette.text.primary,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const TaskPreviewMeta = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: "0.66rem",
  color: theme.palette.text.secondary,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const TaskPreviewCount = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive?: boolean }>(({ isActive = false, theme }) => ({
  minWidth: 34,
  height: 34,
  padding: "0 10px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: isActive
    ? alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.24 : 0.12)
    : alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.14 : 0.06),
  color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
  fontSize: "0.78rem",
  fontWeight: 700,
}));

export const EmptyTasksState = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "10px",
  padding: "16px",
  borderRadius: "16px",
  border: `1px dashed ${alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.26 : 0.16)}`,
  background: alpha(theme.palette.background.paper, theme.palette.mode === "dark" ? 0.48 : 0.5),
  textAlign: "center",
}));

export const EmptyTasksText = styled(Typography)(({ theme }) => ({
  margin: 0,
  fontSize: "0.82rem",
  lineHeight: 1.5,
  color: theme.palette.text.secondary,
}));
