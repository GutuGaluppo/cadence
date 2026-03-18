import { Box, Button, IconButton, Typography } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useSettingsStore } from "./store/store";
import { View } from "@/app/layout/MainLayout";

export default function FocusDurationPanel({
  handleView,
}: {
  handleView: (currView: View) => void;
}) {
  const { settings, updateSettings } = useSettingsStore();

  const handleChange = (key: keyof typeof settings, value: any) => {
    updateSettings({ ...settings, [key]: value });
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        onClick={() => handleView("settings")}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 10,
          width: 32,
          height: 32,
          bgcolor: "rgba(255,255,255,0.06)",
          "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
        }}
      >
        <ArrowLeft size={16} color="rgba(255,255,255,0.7)" />
      </IconButton>

      <Typography variant="h6" sx={{ mb: 4, opacity: 0.8, fontWeight: 300 }}>
        Focus Duration
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <IconButton>-</IconButton>
        <Typography>{settings.focusDuration}</Typography>
        <Button>+</Button>
      </Box>
    </Box>
  );
}
