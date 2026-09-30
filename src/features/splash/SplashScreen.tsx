import React, { useEffect } from "react";
import "./SplashScreen.css";

/**
 * "The drop" — the splash reenacts the app icon being drawn: a drop of light
 * falls onto the indigo surface and its impact leaves the icon's four
 * concentric rings behind, like ripples in water. A single wave of light then
 * crosses the rings (the same motion as the menu bar ripple while a timer
 * runs), the wordmark settles underneath and the icon takes one slow breath
 * before handing over — the app should open calmly, never in a hurry.
 *
 * TIMING (ms from mount):
 *   0       indigo surface fades in
 *   150     drop falls towards the center
 *   500     impact: rings are born from the center, inner → outer
 *   1300    wave of light travels outwards across the rings
 *   1450    wordmark fades in
 *   2100    the settled icon breathes once (swell and release)
 *   4400    onReveal fires: the app mounts underneath while the rings drift
 *           outwards and the screen slowly fades out over it
 *   5400    onComplete fires (screen fully hidden)
 */
const REVEAL_MS = 4400;
const COMPLETE_MS = 5400;
const REDUCED_MOTION_REVEAL_MS = 1600;
const REDUCED_MOTION_COMPLETE_MS = 2400;

/** Radii relative to the outer ring, measured from the app icon. */
const RINGS = [
  { r: 42.5, stroke: 1.2, opacity: 0.5 },
  { r: 57.5, stroke: 1.5, opacity: 0.75 },
  { r: 73, stroke: 1.8, opacity: 0.92 },
  { r: 90, stroke: 2.2, opacity: 1 },
] as const;

interface SplashScreenProps {
  /** The exit has started: mount the app underneath so the fade reveals it. */
  onReveal: () => void;
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onReveal, onComplete }) => {
  useEffect(() => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const reveal = setTimeout(onReveal, reducedMotion ? REDUCED_MOTION_REVEAL_MS : REVEAL_MS);
    const complete = setTimeout(
      onComplete,
      reducedMotion ? REDUCED_MOTION_COMPLETE_MS : COMPLETE_MS,
    );
    return () => {
      clearTimeout(reveal);
      clearTimeout(complete);
    };
  }, [onReveal, onComplete]);

  return (
    <div className="sp" aria-hidden="true">
      <div className="sp__glow" />

      <div className="sp__stage">
        <div className="sp__drop" />
        <div className="sp__splash" />

        {RINGS.map((ring, index) => (
          <svg
            key={ring.r}
            className="sp__ring"
            style={
              {
                "--sp-ring-index": index,
                "--sp-ring-opacity": ring.opacity,
              } as React.CSSProperties
            }
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="100"
              cy="100"
              r={ring.r}
              fill="none"
              stroke="url(#sp-ring-sheen)"
              strokeWidth={ring.stroke}
            />
          </svg>
        ))}

        {/* Shared gradient: the rings catch light from the top-left, as in the icon. */}
        <svg className="sp__defs" width="0" height="0">
          <defs>
            <linearGradient id="sp-ring-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#D9D7FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <p className="sp__name">Cadence</p>
    </div>
  );
};
