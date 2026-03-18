import { Box, IconButton, Typography } from "@mui/material";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useSettingsStore } from "./store/store";
import { View } from "@/app/layout/MainLayout";

interface DurationStepperPanelProps {
  handleView: (currView: View) => void;
  settingsKey: "focusDuration" | "shortBreakDuration" | "longBreakDuration";
  label: string;
  min: number;
  max: number;
}

export default function DurationStepperPanel({
  handleView,
  settingsKey,
  label,
  min,
  max,
}: DurationStepperPanelProps) {
  const { settings, updateSettings } = useSettingsStore();
  const value = settings[settingsKey];

  const update = (delta: number) => {
    const next = Math.min(max, Math.max(min, value + delta));
    updateSettings({ ...settings, [settingsKey]: next });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        px: 4,
      }}
    >
      {/* Back button */}
      <IconButton
        onClick={() => handleView("settings")}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          width: 32,
          height: 32,
          bgcolor: "rgba(0,0,0,0.06)",
          "&:hover": { bgcolor: "rgba(0,0,0,0.1)" },
        }}
      >
        <ArrowLeft size={16} color="rgba(0,0,0,0.55)" />
      </IconButton>

      <Typography
        sx={{
          fontSize: "0.95rem",
          fontWeight: 400,
          color: "#1A1A1A",
          mb: 4,
        }}
      >
        {label}
      </Typography>

      {/* Stepper row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        <IconButton
          onClick={() => update(-1)}
          disabled={value <= min}
          sx={{
            width: 40,
            height: 40,
            bgcolor: "rgba(0,0,0,0.06)",
            borderRadius: "10px",
            "&:hover": { bgcolor: "rgba(0,0,0,0.1)" },
            "&.Mui-disabled": { opacity: 0.25 },
          }}
        >
          <Minus size={16} color="rgba(0,0,0,0.6)" />
        </IconButton>

        <Box sx={{ textAlign: "center", minWidth: 60 }}>
          <Typography
            sx={{
              fontSize: "3rem",
              fontWeight: 700,
              color: "#1A1A1A",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {value}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.7rem",
              color: "rgba(0,0,0,0.35)",
              letterSpacing: "0.1em",
              mt: 0.5,
            }}
          >
            min
          </Typography>
        </Box>

        <IconButton
          onClick={() => update(1)}
          disabled={value >= max}
          sx={{
            width: 40,
            height: 40,
            bgcolor: "rgba(0,0,0,0.06)",
            borderRadius: "10px",
            "&:hover": { bgcolor: "rgba(0,0,0,0.1)" },
            "&.Mui-disabled": { opacity: 0.25 },
          }}
        >
          <Plus size={16} color="rgba(0,0,0,0.6)" />
        </IconButton>
      </Box>
    </Box>
  );
}
