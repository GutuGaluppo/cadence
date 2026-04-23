import { AnimatePresence } from "motion/react";
import { FlipDigitSlot, FlipDigitText } from "./styled";

export interface FlipDigitProps {
  digit: string;
}

export default function FlipDigit({ digit }: FlipDigitProps) {
  return (
    <FlipDigitSlot aria-hidden="true">
      <AnimatePresence initial={false} mode="popLayout">
        <FlipDigitText
          key={digit}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeInOut" }}
        >
          {digit}
        </FlipDigitText>
      </AnimatePresence>
    </FlipDigitSlot>
  );
}
