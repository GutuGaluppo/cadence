import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { motion } from "motion/react";

export const FlipDigitSlot = styled(Box)({
  perspective: "300px",
  minWidth: "1.7rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const FlipDigitText = styled(motion.span)({
  display: "inline-block",
  fontSize: "3rem",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  lineHeight: 1.1,
  color: "#1A1A1A",
  fontVariantNumeric: "tabular-nums",
});
