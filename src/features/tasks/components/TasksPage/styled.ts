import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PageWrapper = styled(Box)({
  height: "100%",
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  position: "relative",
  padding: "0 0 0",
});

export const AbsoluteBox = styled(Box)({
  position: "absolute",
  top: 16,
  left: 16,
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: "rgba(0,0,0,0.06)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.2s ease",
  "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" },
});

export const PageTitle = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: 500,
  color: "#1A1A1A",
  textAlign: "center",
  paddingTop: "64px",
  marginBottom: "20px",
});

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
