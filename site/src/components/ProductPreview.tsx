import { useTranslation } from "react-i18next";

export function ProductPreview() {
  const { t } = useTranslation();

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
                <p className="timer-value">24:58</p>
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
          </div>
        </div>
      </div>
    </div>
  );
}
