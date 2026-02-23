import React, { useEffect } from 'react';
import { Box, Typography, Button, Stack, IconButton } from '@mui/material';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useTimerStore } from '../store/useTimerStore';
import { useTaskStore } from '@/features/tasks/store/store';
import { formatTime } from '../formatTime';
import { Tomato } from './Tomato';

export const TimerDisplay: React.FC = () => {
  const { state, mode, elapsed, config, setMode, start, pause, reset, completedCycles } = useTimerStore();
  const { activeTaskId, incrementPomodoro } = useTaskStore();

  const duration =
    mode === "focus"
      ? config.focusDuration
      : mode === "shortBreak"
      ? config.shortBreakDuration
      : config.longBreakDuration;

  const remaining = Math.max(duration - elapsed, 0);
  const progress = duration > 0 ? ((duration - remaining) / duration) * 100 : 0;

  useEffect(() => {
    if (state === "completed") {
      if (Notification.permission === 'granted') {
        new Notification('Cadence', {
          body: `${mode === "focus" ? "Focus" : mode === "shortBreak" ? "Short Break" : "Long Break"} finished.`
        });
      }

      if (mode === "focus" && activeTaskId) {
        incrementPomodoro(activeTaskId);
      }
    }
  }, [state, mode, activeTaskId, incrementPomodoro]);

  useEffect(() => {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  const getModeLabel = (m: typeof mode) => {
    if (m === "focus") return "Focus";
    if (m === "shortBreak") return "Short Break";
    return "Long Break";
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, py: 4 }}>
      <Stack direction="row" spacing={2}>
        <Button
          variant={mode === "focus" ? 'contained' : 'text'}
          onClick={() => setMode("focus")}
          size="small"
        >
          Focus
        </Button>
        <Button
          variant={mode === "shortBreak" ? 'contained' : 'text'}
          onClick={() => setMode("shortBreak")}
          size="small"
        >
          Short Break
        </Button>
        <Button
          variant={mode === "longBreak" ? 'contained' : 'text'}
          onClick={() => setMode("longBreak")}
          size="small"
        >
          Long Break
        </Button>
      </Stack>

      <Tomato progress={progress} mode={mode} state={state} />

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: '5rem', fontWeight: 200, mb: 1 }}>
          {formatTime(remaining)}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
          {getModeLabel(mode)}
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.3, display: 'block', mt: 1 }}>
          {completedCycles} cycles completed
        </Typography>
      </Box>

      <Stack direction="row" spacing={3}>
        {state === "running" ? (
          <Button
            variant="outlined"
            startIcon={<Pause size={20} />}
            onClick={pause}
            sx={{ px: 4, py: 1.5, borderRadius: 10 }}
          >
            Pause
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<Play size={20} />}
            onClick={start}
            sx={{ px: 4, py: 1.5, borderRadius: 10 }}
          >
            {state === "idle" ? 'Start' : 'Resume'}
          </Button>
        )}

        <IconButton onClick={reset} sx={{ opacity: 0.6 }}>
          <RotateCcw size={20} />
        </IconButton>
      </Stack>
    </Box>
  );
};
