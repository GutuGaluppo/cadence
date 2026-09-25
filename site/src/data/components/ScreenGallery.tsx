import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  APP_SCREEN_HEIGHT,
  APP_SCREEN_WIDTH,
  appScreenOrder,
  appScreens,
  type AppTheme,
} from "../appScreens";
import { Reveal } from "./Reveal";

const themes: AppTheme[] = ["light", "dark"];

export function ScreenGallery() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<AppTheme>("light");

  return (
    <>
      <div
        aria-label={t("gallery.themeLabel")}
        className="theme-toggle"
        role="radiogroup"
      >
        {themes.map((option) => (
          <button
            aria-checked={theme === option}
            className="theme-toggle-option"
            key={option}
            onClick={() => setTheme(option)}
            role="radio"
            type="button"
          >
            {t(`gallery.${option}`)}
          </button>
        ))}
      </div>

      <div className="screen-gallery" data-theme={theme}>
        {appScreenOrder.map((key, index) => (
          <Reveal
            as="article"
            className="screen-card"
            delay={(index % 3) * 0.08}
            key={key}
          >
            <div className="screen-frame">
              {/* Both themes stay mounted so toggling never waits on the network. */}
              {themes.map((option) => (
                <img
                  alt={option === theme ? t(`gallery.items.${key}.title`) : ""}
                  aria-hidden={option !== theme}
                  className="screen-shot"
                  data-active={option === theme}
                  height={APP_SCREEN_HEIGHT}
                  key={option}
                  loading="lazy"
                  src={appScreens[key][option]}
                  width={APP_SCREEN_WIDTH}
                />
              ))}
            </div>
            <h3>{t(`gallery.items.${key}.title`)}</h3>
            <p>{t(`gallery.items.${key}.description`)}</p>
          </Reveal>
        ))}
      </div>
    </>
  );
}
