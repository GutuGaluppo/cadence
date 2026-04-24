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
import { ChevronRight, MoonStar, Sun } from "lucide-react";
import { ThemeMode } from "@/types";
import { useSettingsStore } from "../store/store";
import {
  RowValueBox,
  SettingRowContainer,
  ThemeToggleButton,
  ThemeToggleGroup,
} from "./styled";

interface SettingRowProps {
  label: string;
  value: string;
  onEdit: () => void;
}

type ToggleSettingKey = "alwaysOnTop" | "soundEnabled";

function SettingRow({ label, value, onEdit }: SettingRowProps) {
  return (
    <SettingRowContainer onClick={onEdit}>
      <Typography color="text.primary" variant="body2">
        {label}
      </Typography>
      <RowValueBox>
        <Typography
          className="row-value"
          variant="body2"
          sx={{ color: "text.secondary", fontWeight: 700 }}
        >
          {value}
        </Typography>
        <ChevronRight size={14} />
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

  const handleThemeModeChange = (themeMode: ThemeMode) => {
    if (settings.themeMode === themeMode) {
      return;
    }

    updateSettings({ ...settings, themeMode });
  };

  return (
    <PanelPage>
      <PanelBackButton onClick={() => setView("timer")} />

      <PanelHeader>
        <PanelHeaderTitle>Settings</PanelHeaderTitle>
      </PanelHeader>

      <Stack spacing={2}>
        <Stack spacing={1}>
          <Typography color="text.secondary" variant="body2">
            Appearance
          </Typography>
          <ThemeToggleGroup>
            <ThemeToggleButton
              isActive={settings.themeMode === "light"}
              onClick={() => handleThemeModeChange("light")}
              type="button"
            >
              <Sun size={16} />
              Light
            </ThemeToggleButton>
            <ThemeToggleButton
              isActive={settings.themeMode === "dark"}
              onClick={() => handleThemeModeChange("dark")}
              type="button"
            >
              <MoonStar size={16} />
              Dark
            </ThemeToggleButton>
          </ThemeToggleGroup>
        </Stack>

        <Divider sx={{ opacity: 0.14 }} />

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

        <Divider sx={{ opacity: 0.14 }} />

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
            <Typography color="text.secondary" variant="body2">
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
            <Typography color="text.secondary" variant="body2">
              Always on Top
            </Typography>
          }
        />
      </Stack>
    </PanelPage>
  );
};
