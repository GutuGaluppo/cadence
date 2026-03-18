import { View } from "@/app/layout/MainLayout";
import {
  Divider,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useSettingsStore } from "../store/store";
import {
  AbsoluteBox,
  PanelContainer,
  RowValueBox,
  SettingRowContainer,
} from "./styled";

interface SettingRowProps {
  label: string;
  value: string;
  onEdit: () => void;
}

function SettingRow({ label, value, onEdit }: SettingRowProps) {
  return (
    <SettingRowContainer onClick={onEdit}>
      <Typography variant="body2">{label}</Typography>
      <RowValueBox>
        <Typography
          className="row-value"
          variant="body2"
          sx={{ opacity: 0.7, fontWeight: 700 }}
        >
          {value}
        </Typography>
        <ChevronRight size={14} color="rgba(0,0,0,0.8)" />
      </RowValueBox>
    </SettingRowContainer>
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
    <PanelContainer>
      <AbsoluteBox>
        <IconButton onClick={() => handleView("timer")}>
          <ArrowLeft size={20} color="rgba(0,0,0,0.5)" />
        </IconButton>
      </AbsoluteBox>

      <Typography
        variant="h5"
        sx={{
          fontSize: "1.5rem",
          mb: 4,
          color: "#1A1A1A",
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        Settings
      </Typography>

      <Stack spacing={2}>
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

        <SettingRow
          label="Long Break After"
          value={`${settings.cyclesBeforeLongBreak} cycles`}
          onEdit={() => handleView("cycles-before-long-break")}
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
    </PanelContainer>
  );
};
