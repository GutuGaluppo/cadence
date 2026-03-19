import React, { useEffect } from "react";
import "./SplashScreen.css";

/**
 * TIMING (ms from mount):
 *   0       blobs ignite
 *   400     rings appear (tilted) + start spinning
 *   1900    app name fades in
 *   3000    screen begins fading out
 *   3450    onComplete fires (screen fully hidden)
 *
 * Adjust COMPLETE_MS to control when the parent unmounts this component.
 */
const COMPLETE_MS = 3450;

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const t = setTimeout(onComplete, COMPLETE_MS);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="sp">
      {/* ── Organic smoke blobs ── */}
      <div className="sp__blobs">
        <div className="sp__blob sp__blob--3" />
        <div className="sp__blob sp__blob--1" />
        <div className="sp__blob sp__blob--2" />
        <div className="sp__blob sp__blob--4" />
      </div>

      {/* ── 3-D rings ── */}
      <div className="sp__stage">
        {/* Ring A — smaller, tilts on X/Y then flattens */}
        <div className="sp__tilt sp__tilt--a">
          <div className="sp__spin sp__spin--a">
            <svg
              className="sp__ring sp__ring--a"
              viewBox="0 0 184 184"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="sp-grad-ring-a"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%"   stopColor="rgba(255, 88, 38, 0)"   />
                  <stop offset="22%"  stopColor="rgba(255, 88, 38, 0.95)" />
                  <stop offset="65%"  stopColor="rgba(255, 172, 56, 0.75)" />
                  <stop offset="100%" stopColor="rgba(255, 88, 38, 0)"   />
                </linearGradient>
              </defs>
              <circle
                cx="92"
                cy="92"
                r="80"
                fill="none"
                stroke="url(#sp-grad-ring-a)"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>

        {/* Ring B — larger, tilts on opposite axis */}
        <div className="sp__tilt sp__tilt--b">
          <div className="sp__spin sp__spin--b">
            <svg
              className="sp__ring sp__ring--b"
              viewBox="0 0 248 248"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="sp-grad-ring-b"
                  x1="100%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%"   stopColor="rgba(255, 212, 64, 0)"   />
                  <stop offset="28%"  stopColor="rgba(255, 212, 64, 0.82)" />
                  <stop offset="72%"  stopColor="rgba(255, 72, 28, 0.55)"  />
                  <stop offset="100%" stopColor="rgba(255, 212, 64, 0)"   />
                </linearGradient>
              </defs>
              <circle
                cx="124"
                cy="124"
                r="112"
                fill="none"
                stroke="url(#sp-grad-ring-b)"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ── App name ── */}
      <div className="sp__text">
        <p className="sp__name">Pomodoro Cadence</p>
      </div>
    </div>
  );
};
