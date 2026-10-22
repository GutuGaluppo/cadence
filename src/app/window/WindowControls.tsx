import { isTauriRuntime } from "@/shared/isTauriRuntime";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

type WindowAction = "close" | "minimize" | "maximize";

// Proposed position: 12px inset from the card's top-left corner, 12px dots
// with 8px between them, matching the macOS title bar rhythm.
const LIGHT_SIZE = 12;

// MainContainer's "& > div { height: 100% }" would stretch this row and centre
// the dots vertically. The doubled "&&" raises specificity above that rule.
const LightsRow = styled(Box)({
  "&&": {
    height: "auto",
  },
  position: "absolute",
  top: 12,
  left: 12,
  zIndex: 6,
  display: "flex",
  alignItems: "center",
  gap: 8,
  "&:hover .light-glyph": {
    opacity: 1,
  },
});

const Light = styled("button", {
  shouldForwardProp: (prop) => prop !== "tone",
})<{ tone: string }>(({ tone }) => ({
  appearance: "none",
  border: "none",
  padding: 0,
  margin: 0,
  width: LIGHT_SIZE,
  height: LIGHT_SIZE,
  borderRadius: "50%",
  backgroundColor: tone,
  display: "grid",
  placeItems: "center",
  cursor: "default",
  color: "rgba(0, 0, 0, 0.55)",
  transition: "filter 0.15s ease, transform 0.15s cubic-bezier(0.22, 1, 0.36, 1)",
  "&:active": {
    filter: "brightness(0.85)",
    transform: "scale(0.92)",
  },
  "&:focus-visible": {
    outline: "2px solid rgba(46, 37, 102, 0.5)",
    outlineOffset: 2,
  },
}));

const Glyph = styled("svg")({
  opacity: 0,
  transition: "opacity 0.15s ease",
  pointerEvents: "none",
});

async function runWindowAction(action: WindowAction) {
  if (!isTauriRuntime()) {
    return;
  }

  const { getCurrentWindow } = await import("@tauri-apps/api/window");
  const appWindow = getCurrentWindow();

  // Close goes through the window's close request, which only hides it: the
  // app keeps running in the menu bar until Quit.
  if (action === "close") {
    await appWindow.close();
  } else if (action === "minimize") {
    await appWindow.minimize();
  } else {
    await appWindow.toggleMaximize();
  }
}

export function WindowControls() {
  return (
    <LightsRow>
      <Light
        aria-label="Close window"
        onClick={() => void runWindowAction("close")}
        tone="#FF5F57"
      >
        <Glyph className="light-glyph" height="8" viewBox="0 0 8 8" width="8">
          <path d="M1.5 1.5 6.5 6.5M6.5 1.5 1.5 6.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
        </Glyph>
      </Light>

      <Light
        aria-label="Minimize window"
        onClick={() => void runWindowAction("minimize")}
        tone="#FEBC2E"
      >
        <Glyph className="light-glyph" height="8" viewBox="0 0 8 8" width="8">
          <path d="M1.5 4h5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
        </Glyph>
      </Light>

      <Light
        aria-label="Maximize window"
        onClick={() => void runWindowAction("maximize")}
        tone="#28C840"
      >
        <Glyph className="light-glyph" height="8" viewBox="0 0 8 8" width="8">
          <path d="M1.5 4h5M4 1.5v5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
        </Glyph>
      </Light>
    </LightsRow>
  );
}
