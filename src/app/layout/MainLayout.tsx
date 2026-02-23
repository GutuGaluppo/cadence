import { Container, Box, Typography, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { TimerDisplay } from '@/features/timer/components/TimerDisplay';
import { TaskList } from '@/features/tasks/components/TaskList';
import { StatsDisplay } from '@/features/stats/StatsDisplay';
import { SettingsPanel } from '@/features/settings/SettingsPanel';
import { motion } from 'motion/react';

export default function MainLayout() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 6,
              fontWeight: 300,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              opacity: 0.9,
              textAlign: 'center'
            }}
          >
            Cadence
          </Typography>
        </motion.div>

        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          centered
          sx={{
            mb: 4,
            '& .MuiTabs-indicator': { backgroundColor: 'primary.main' },
            '& .MuiTab-root': { color: 'rgba(255, 255, 255, 0.4)', '&.Mui-selected': { color: 'primary.main' } }
          }}
        >
          <Tab label="Timer" />
          <Tab label="Tasks" />
          <Tab label="Stats" />
          <Tab label="Settings" />
        </Tabs>

        <Box sx={{ width: '100%', minHeight: '60vh' }}>
          {activeTab === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <TimerDisplay />
            </motion.div>
          )}
          {activeTab === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <TaskList />
            </motion.div>
          )}
          {activeTab === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <StatsDisplay />
            </motion.div>
          )}
          {activeTab === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <SettingsPanel />
            </motion.div>
          )}
        </Box>

        <Box sx={{ mt: 'auto', pt: 8, pb: 4, opacity: 0.2 }}>
          <Typography variant="caption" sx={{ letterSpacing: '0.1em' }}>
            Rhythm over urgency.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
