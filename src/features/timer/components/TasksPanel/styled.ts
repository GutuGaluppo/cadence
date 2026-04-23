import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

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

export const TasksPanelTitle = styled(Typography)({
  margin: 0,
  fontSize: "0.68rem",
  fontWeight: 700,
  letterSpacing: "0.16em",
  color: "rgba(26,26,26,0.7)",
  textTransform: "uppercase",
});

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
}>(({ isActive = false, isCompleted = false }) => ({
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
    isActive ? "rgba(46,37,102,0.18)" : "rgba(46,37,102,0.08)"
  }`,
  background: isActive
    ? "linear-gradient(135deg, rgba(46,37,102,0.06), rgba(255,255,255,0.94))"
    : "rgba(255,255,255,0.88)",
  opacity: isCompleted ? 0.62 : 1,
  cursor: "pointer",
  transition:
    "transform 0.18s ease, border-color 0.18s ease, background-color 0.18s ease, opacity 0.18s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    borderColor: isActive ? "rgba(46,37,102,0.22)" : "rgba(46,37,102,0.12)",
  },
}));

export const TaskPreviewCopy = styled(Box)({
  minWidth: 0,
  display: "grid",
  gap: "4px",
});

export const TaskPreviewTitle = styled(Typography)({
  margin: 0,
  fontSize: "0.86rem",
  fontWeight: 600,
  color: "#1A1A1A",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const TaskPreviewMeta = styled(Typography)({
  margin: 0,
  fontSize: "0.66rem",
  color: "rgba(26,26,26,0.52)",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const TaskPreviewCount = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive?: boolean }>(({ isActive = false }) => ({
  minWidth: 34,
  height: 34,
  padding: "0 10px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: isActive ? "rgba(46,37,102,0.12)" : "rgba(46,37,102,0.06)",
  color: isActive ? "#2E2566" : "rgba(26,26,26,0.56)",
  fontSize: "0.78rem",
  fontWeight: 700,
}));

export const EmptyTasksState = styled(Box)({
  display: "grid",
  gap: "10px",
  padding: "16px",
  borderRadius: "16px",
  border: "1px dashed rgba(46,37,102,0.16)",
  background: "rgba(255,255,255,0.5)",
  textAlign: "center",
});

export const EmptyTasksText = styled(Typography)({
  margin: 0,
  fontSize: "0.82rem",
  lineHeight: 1.5,
  color: "rgba(26,26,26,0.48)",
});
