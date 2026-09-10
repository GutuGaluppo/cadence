import { useTranslation } from "react-i18next";
import appHomeScreenshot from "../../assets/app-home-light.png";
import { Reveal } from "./Reveal";

export function ProductPreview() {
  const { t } = useTranslation();

  return (
    <div className="hero-stage">
      <div aria-hidden="true" className="orb orb-indigo"></div>
      <div aria-hidden="true" className="orb orb-gold"></div>

      <div className="product-window product-window-shot">
        <img
          alt={t("preview.screenshotAlt")}
          className="product-shot"
          src={appHomeScreenshot}
        />
      </div>

      <Reveal as="div" delay={0.25}>
        <p className="preview-note">
          <span aria-hidden="true" className="preview-note-dot"></span>
          {t("preview.tasksHint")}
        </p>
      </Reveal>
    </div>
  );
}
