import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CircleButton = styled(IconButton)({
  width: 36,
  height: 36,
  padding: 0,
  borderRadius: "12px",
  backgroundColor: "rgba(46,37,102,0.06)",
  border: "1px solid rgba(46,37,102,0.08)",
  color: "rgba(0,0,0,0.55)",
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(46,37,102,0.1)",
    borderColor: "rgba(46,37,102,0.14)",
    transform: "translateY(-1px)",
  },
  "&.Mui-disabled": {
    backgroundColor: "rgba(46,37,102,0.04)",
    borderColor: "rgba(46,37,102,0.06)",
    color: "rgba(0,0,0,0.28)",
  },
});

export const InlineAction = styled("button")({
  appearance: "none",
  border: "1px solid rgba(46,37,102,0.08)",
  borderRadius: "999px",
  backgroundColor: "rgba(46,37,102,0.06)",
  color: "rgba(26,26,26,0.68)",
  padding: "6px 9px",
  fontSize: "0.66rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor: "pointer",
  transition:
    "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(46,37,102,0.1)",
    borderColor: "rgba(46,37,102,0.14)",
    color: "rgba(26,26,26,0.84)",
  },
  "&:disabled": {
    backgroundColor: "rgba(46,37,102,0.04)",
    borderColor: "rgba(46,37,102,0.06)",
    color: "rgba(26,26,26,0.32)",
    cursor: "default",
  },
});
