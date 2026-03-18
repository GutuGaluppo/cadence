import React from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { TimerMode, TimerState } from '@/types';

interface TomatoProps {
  progress: number; // 0 to 100
  mode: TimerMode;
  state: TimerState;
}

const SvgContainer = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
`;

export const Tomato: React.FC<TomatoProps> = ({ progress, mode, state }) => {
  const segments = 8;
  const radius = 90;
  const center = 100;

  const getSegmentColor = () => {
    if (state === TimerState.PAUSED) return 'rgba(210, 180, 140, 0.3)';
    if (mode === TimerMode.SHORT_BREAK) return '#B4C6A6'; // Sage green
    if (mode === TimerMode.LONG_BREAK) return '#8E9775'; // Deeper sage
    return '#D2B48C'; // Beige
  };

  const color = getSegmentColor();

  return (
    <SvgContainer>
      <StyledSvg viewBox="0 0 200 200">
        {/* Stem */}
        <path
          d="M100 20 C105 20 110 25 110 35 L100 45 L90 35 C90 25 95 20 100 20"
          fill="#4A5D23"
          opacity={state === TimerState.PAUSED ? 0.5 : 1}
        />
        
        {/* Tomato Body Segments */}
        {Array.from({ length: segments }).map((_, i) => {
          const startAngle = (i * 360) / segments;
          const endAngle = ((i + 1) * 360) / segments;
          const isFilled = progress >= ((i + 1) * 100) / segments;
          const partialFill = Math.max(0, Math.min(1, (progress - (i * 100) / segments) / (100 / segments)));

          return (
            <g key={i}>
              {/* Background Segment Outline */}
              <path
                d={describeArc(center, center, radius, startAngle, endAngle)}
                fill="none"
                stroke="rgba(210, 180, 140, 0.1)"
                strokeWidth="2"
              />
              
              {/* Filled Segment */}
              <motion.path
                initial={false}
                animate={{
                  opacity: state === TimerState.PAUSED ? 0.4 : 1,
                  fill: color,
                }}
                d={describeArc(center, center, radius, startAngle, startAngle + (endAngle - startAngle) * partialFill)}
                fill={color}
              />
            </g>
          );
        })}
      </StyledSvg>
    </SvgContainer>
  );
};

// Helper to describe an SVG arc
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M", x, y,
    "L", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    "Z"
  ].join(" ");

  return d;
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}
