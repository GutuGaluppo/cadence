import { useAppViewStore } from "@/app/store/useAppViewStore";
import { PanelBackButton } from "@/shared/components/PanelBackButton";
import {
  PanelHeader,
  PanelHeaderTitle,
  PanelPage,
} from "@/shared/components/PanelLayout";
import {
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { ChevronRight } from "lucide-react";
import { useSettingsStore } from "../store/store";
import { RowValueBox, SettingRowContainer } from "./styled";

interface SettingRowProps {
  label: string;
  value: string;
  onEdit: () => void;
}

type ToggleSettingKey = "alwaysOnTop" | "soundEnabled";

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

export const SettingsPanel = () => {
  const { settings, updateSettings } = useSettingsStore();
  const setView = useAppViewStore((state) => state.setView);

  const handleToggle = (key: ToggleSettingKey, value: boolean) => {
    updateSettings({ ...settings, [key]: value });
  };

  return (
    <PanelPage>
      <PanelBackButton
        iconColor="rgba(0,0,0,0.5)"
        onClick={() => setView("timer")}
      />

      <PanelHeader>
        <PanelHeaderTitle>Settings</PanelHeaderTitle>
      </PanelHeader>

      <Stack spacing={2}>
        <SettingRow
          label="Focus Session"
          value={`${settings.focusDuration} min`}
          onEdit={() => setView("focus-duration")}
        />
        <SettingRow
          label="Short Break"
          value={`${settings.shortBreakDuration} min`}
          onEdit={() => setView("short-break")}
        />
        <SettingRow
          label="Long Break"
          value={`${settings.longBreakDuration} min`}
          onEdit={() => setView("long-break")}
        />
        <SettingRow
          label="Long Break After"
          value={`${settings.cyclesBeforeLongBreak} cycles`}
          onEdit={() => setView("cycles-before-long-break")}
        />

        <Divider sx={{ opacity: 0.1 }} />

        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={settings.soundEnabled}
              onChange={(event) =>
                handleToggle("soundEnabled", event.target.checked)
              }
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
              onChange={(event) =>
                handleToggle("alwaysOnTop", event.target.checked)
              }
            />
          }
          label={
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Always on Top
            </Typography>
          }
        />
      </Stack>
    </PanelPage>
  );
};
