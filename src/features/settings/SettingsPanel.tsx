import React from 'react';
import { Box, Typography, Slider, Switch, FormControlLabel, Stack, Divider } from '@mui/material';
import { useSettingsStore } from './store/store';

export const SettingsPanel: React.FC = () => {
  const { settings, updateSettings } = useSettingsStore();

  const handleChange = (key: keyof typeof settings, value: any) => {
    updateSettings({ ...settings, [key]: value });
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', mt: 8, mb: 8 }}>
      <Typography variant="h6" sx={{ mb: 4, opacity: 0.8, fontWeight: 300 }}>
        Settings
      </Typography>

      <Stack spacing={4}>
        <Box>
          <Typography variant="body2" sx={{ mb: 2, opacity: 0.6 }}>Focus Duration (minutes)</Typography>
          <Slider
            value={settings.focusDuration}
            min={1}
            max={60}
            valueLabelDisplay="auto"
            onChange={(_, val) => handleChange('focusDuration', val)}
          />
        </Box>

        <Box>
          <Typography variant="body2" sx={{ mb: 2, opacity: 0.6 }}>Short Break (minutes)</Typography>
          <Slider
            value={settings.shortBreakDuration}
            min={1}
            max={30}
            valueLabelDisplay="auto"
            onChange={(_, val) => handleChange('shortBreakDuration', val)}
          />
        </Box>

        <Box>
          <Typography variant="body2" sx={{ mb: 2, opacity: 0.6 }}>Long Break (minutes)</Typography>
          <Slider
            value={settings.longBreakDuration}
            min={1}
            max={60}
            valueLabelDisplay="auto"
            onChange={(_, val) => handleChange('longBreakDuration', val)}
          />
        </Box>

        <Divider sx={{ opacity: 0.1 }} />

        <FormControlLabel
          control={
            <Switch
              checked={settings.soundEnabled}
              onChange={(e) => handleChange('soundEnabled', e.target.checked)}
            />
          }
          label={<Typography variant="body2" sx={{ opacity: 0.8 }}>Sound Notifications</Typography>}
        />

        <FormControlLabel
          control={
            <Switch
              checked={settings.alwaysOnTop}
              onChange={(e) => handleChange('alwaysOnTop', e.target.checked)}
            />
          }
          label={<Typography variant="body2" sx={{ opacity: 0.8 }}>Always on Top (Desktop)</Typography>}
        />
      </Stack>
    </Box>
  );
};
