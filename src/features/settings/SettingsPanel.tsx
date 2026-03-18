import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import { useSettingsStore } from "./store/store";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { View } from "@/app/layout/MainLayout";

interface SettingRowProps {
  label: string;
  value: string;
  onEdit: () => void;
}

function SettingRow({ label, value, onEdit }: SettingRowProps) {
  return (
    <Box
      onClick={onEdit}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        py: 0.5,
        "&:hover .row-value": { color: "rgba(0,0,0,0.7)" },
      }}
    >
      <Typography variant="body2" sx={{ opacity: 0.6 }}>
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Typography
          className="row-value"
          variant="body2"
          sx={{ opacity: 0.45, transition: "color 0.15s" }}
        >
          {value}
        </Typography>
        <ChevronRight size={14} color="rgba(0,0,0,0.2)" />
      </Box>
    </Box>
  );
}

export const SettingsPanel = ({
  handleView,
}: {
  handleView: (currView: View) => void;
}) => {
  const { settings, updateSettings } = useSettingsStore();

  const handleChange = (key: keyof typeof settings, value: any) => {
    updateSettings({ ...settings, [key]: value });
  };

  return (
    <Box sx={{ px: 3, pt: 3, pb: 3, position: "relative" }}>
      {/* Back to timer */}
      <IconButton
        onClick={() => handleView("timer")}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          width: 40,
          height: 40,
          bgcolor: "rgba(0,0,0,0.06)",
          "&:hover": { bgcolor: "rgba(0,0,0,0.1)" },
        }}
      >
        <ArrowLeft size={16} color="rgba(0,0,0,0.5)" />
      </IconButton>

      <Typography variant="h6" sx={{ mb: 4, color: "#1A1A1A", fontWeight: 700 }}>
        Settings
      </Typography>

      <Stack spacing={3}>
        <SettingRow
          label="Focus Session"
          value={`${settings.focusDuration} min`}
          onEdit={() => handleView("focus-duration")}
        />
        <SettingRow
          label="Short Break"
          value={`${settings.shortBreakDuration} min`}
          onEdit={() => handleView("short-break")}
        />
        <SettingRow
          label="Long Break"
          value={`${settings.longBreakDuration} min`}
          onEdit={() => handleView("long-break")}
        />

        <Divider sx={{ opacity: 0.1 }} />

        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={settings.soundEnabled}
              onChange={(e) => handleChange("soundEnabled", e.target.checked)}
            />
          }
          label={
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Sound Notifications
            </Typography>
          }
        />

        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={settings.alwaysOnTop}
              onChange={(e) => handleChange("alwaysOnTop", e.target.checked)}
            />
          }
          label={
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Always on Top
            </Typography>
          }
        />
      </Stack>
    </Box>
  );
};
