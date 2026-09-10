import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "motion/react";

const START_SECONDS = 24 * 60 + 58;

function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function ProductPreview() {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [secondsLeft, setSecondsLeft] = useState(START_SECONDS);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setSecondsLeft((current) => (current <= 0 ? START_SECONDS : current - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <div className="hero-stage" aria-hidden="true">
      <div className="orb orb-indigo"></div>
      <div className="orb orb-gold"></div>
      <div className="product-window">
        <div className="window-top">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="window-body">
          <div className="timer-preview">
            <div className="timer-ring">
              <div className="timer-core">
                <p className="timer-mode">{t("preview.mode")}</p>
                <p className="timer-value">{formatClock(secondsLeft)}</p>
                <div className="timer-dots">
                  <span className="active"></span>
                  <span className="active"></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>

            <div className="task-stack">
              <article className="task-card selected">
                <div>
                  <p className="task-title">{t("preview.task1Title")}</p>
                  <p className="task-meta">{t("preview.task1Meta")}</p>
                </div>
                <span className="task-count">3</span>
              </article>

              <article className="task-card">
                <div>
                  <p className="task-title">{t("preview.task2Title")}</p>
                  <p className="task-meta">{t("preview.task2Meta")}</p>
                </div>
                <span className="task-count task-count-muted">1</span>
              </article>
            </div>

            <motion.p
              className="preview-note"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="preview-note-dot"></span>
              {t("preview.tasksHint")}
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}
