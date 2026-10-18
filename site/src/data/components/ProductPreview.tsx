import { useTranslation } from "react-i18next";
import tourGif from "../../assets/cadence-tour.gif";
import tourWebp from "../../assets/cadence-tour.webp";
import { appScreens } from "../appScreens";

// The tour only shows the reduced timer (see build-app-media.py).
const TOUR_WIDTH = 680;
const TOUR_HEIGHT = 856;
import { Reveal } from "./Reveal";

export function ProductPreview() {
  const { t } = useTranslation();

  return (
    <div className="hero-stage">
      <div aria-hidden="true" className="orb orb-indigo"></div>
      <div aria-hidden="true" className="orb orb-gold"></div>

      <div className="product-window product-window-shot">
        <picture>
          {/* Visitors who opt out of motion get a still frame of the same window. */}
          <source
            media="(prefers-reduced-motion: reduce)"
            srcSet={appScreens.home.light}
          />
          <source srcSet={tourWebp} type="image/webp" />
          <img
            alt={t("preview.tourAlt")}
            className="product-shot"
            height={TOUR_HEIGHT}
            src={tourGif}
            width={TOUR_WIDTH}
          />
        </picture>
      </div>

      <Reveal as="div" delay={0.25}>
        <p className="preview-note">
          <span aria-hidden="true" className="preview-note-dot"></span>
          {t("preview.tourHint")}
        </p>
      </Reveal>
    </div>
  );
}
