import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TaskListScroll = styled(Box)({
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": { display: "none" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 4,
  },
});

export const TaskCard = styled(Box)<{ active?: boolean }>(({ active }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 12px",
  borderRadius: "10px",
  backgroundColor: active ? "rgba(46,37,102,0.08)" : "rgba(0,0,0,0.04)",
  border: `1px solid ${active ? "rgba(46,37,102,0.2)" : "transparent"}`,
  cursor: "pointer",
  transition: "background-color 0.2s ease, border-color 0.2s ease",
  "&:hover": {
    backgroundColor: active ? "rgba(46,37,102,0.1)" : "rgba(0,0,0,0.07)",
  },
}));

export const TaskTitle = styled(Typography)<{ completed?: boolean }>(({ completed }) => ({
  flex: 1,
  fontSize: "0.875rem",
  color: completed ? "rgba(0,0,0,0.35)" : "#1A1A1A",
  textDecoration: completed ? "line-through" : "none",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const TaskMeta = styled(Typography)({
  fontSize: "0.7rem",
  color: "rgba(0,0,0,0.4)",
  whiteSpace: "nowrap",
});

export const AddButton = styled(Box)({
  marginTop: "16px",
  height: 44,
  borderRadius: "12px",
  backgroundColor: "#1A1A1A",
  color: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  cursor: "pointer",
  fontSize: "0.875rem",
  fontWeight: 500,
  transition: "background-color 0.2s ease",
  "&:hover": { backgroundColor: "#2E2566" },
});

export const EmptyState = styled(Typography)({
  textAlign: "center",
  color: "rgba(0,0,0,0.3)",
  fontSize: "0.875rem",
  marginTop: "32px",
});
