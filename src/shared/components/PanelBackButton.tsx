import { Box, IconButton, type IconButtonProps } from "@mui/material";
import { ArrowLeft } from "lucide-react";

interface PanelBackButtonProps extends Omit<IconButtonProps, "children" | "aria-label"> {
  ariaLabel?: string;
  iconColor?: string;
  left?: number;
  top?: number;
}

const containerStyles = {
  position: "absolute",
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: "rgba(0,0,0,0.06)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
} as const;

export function PanelBackButton({
  ariaLabel = "Go back",
  iconColor = "rgba(0,0,0,0.55)",
  left = 16,
  top = 16,
  ...buttonProps
}: PanelBackButtonProps) {
  return (
    <Box sx={{ ...containerStyles, left, top }}>
      <IconButton aria-label={ariaLabel} type="button" {...buttonProps}>
        <ArrowLeft size={20} color={iconColor} />
      </IconButton>
    </Box>
  );
}
