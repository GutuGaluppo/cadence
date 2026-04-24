import { Box, IconButton, type IconButtonProps } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { ArrowLeft } from "lucide-react";

interface PanelBackButtonProps extends Omit<IconButtonProps, "children" | "aria-label"> {
  ariaLabel?: string;
  iconColor?: string;
  left?: number;
  top?: number;
}

export function PanelBackButton({
  ariaLabel = "Go back",
  iconColor,
  left = 16,
  top = 16,
  ...buttonProps
}: PanelBackButtonProps) {
  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        left,
        top,
        width: 40,
        height: 40,
        borderRadius: "50%",
        backgroundColor: alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.1 : 0.06),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.2s ease",
        "&:hover": {
          backgroundColor: alpha(theme.palette.text.primary, theme.palette.mode === "dark" ? 0.16 : 0.1),
        },
      })}
    >
      <IconButton
        aria-label={ariaLabel}
        sx={(theme) => ({
          color: iconColor ?? theme.palette.text.secondary,
        })}
        type="button"
        {...buttonProps}
      >
        <ArrowLeft size={20} />
      </IconButton>
    </Box>
  );
}
