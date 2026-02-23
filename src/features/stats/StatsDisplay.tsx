import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useTaskStore } from '@/features/tasks/store/store';
import { useTimerStore } from '@/features/timer/store/useTimerStore';

export const StatsDisplay: React.FC = () => {
  const tasks = useTaskStore(state => state.tasks);
  const completedCycles = useTimerStore(state => state.completedCycles);

  const totalFocusedMinutes = tasks.reduce((acc, task) => acc + (task.pomodoroCount * 25), 0);
  const completedTasks = tasks.filter(t => t.completed).length;

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 8, mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 3, opacity: 0.8, fontWeight: 300, textAlign: 'center' }}>
        Statistics
      </Typography>
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr 1fr' }, 
        gap: 2 
      }}>
        <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
          <Typography variant="h4" color="primary">{completedCycles}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.5 }}>Total Cycles</Typography>
        </Paper>
        
        <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
          <Typography variant="h4" color="primary">{completedTasks}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.5 }}>Tasks Done</Typography>
        </Paper>
        
        <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
          <Typography variant="h4" color="primary">{totalFocusedMinutes}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.5 }}>Focus Mins</Typography>
        </Paper>
        
        <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
          <Typography variant="h4" color="primary">{tasks.length}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.5 }}>Total Tasks</Typography>
        </Paper>
      </Box>
    </Box>
  );
};
