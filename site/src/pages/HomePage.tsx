import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProductPreview } from "../components/ProductPreview";
import { SectionHeading } from "../components/SectionHeading";
import { SiteShell } from "../components/SiteShell";
import { externalLinks } from "../data/siteContent";
import { toSitePath } from "../lib/sitePaths";

type TItem = { title: string; description: string };
type TWorkflowItem = { index: string; title: string; description: string };

export function HomePage() {
  const { t } = useTranslation();
  const [downloadLabel, setDownloadLabel] = useState(() => t("hero.downloadLatest"));

  useEffect(() => {
    const platform = window.navigator.platform.toLowerCase();
    setDownloadLabel(platform.includes("mac") ? t("hero.downloadMac") : t("hero.downloadLatest"));
  }, [t]);

  const navItems = [
    { label: t("nav.features"), href: toSitePath("/#features") },
    { label: t("nav.workflow"), href: toSitePath("/#workflow") },
    { label: t("nav.download"), href: toSitePath("/#download") },
  ];

  const heroHighlights = t("heroHighlights", { returnObjects: true }) as string[];
  const signalItems = t("signalBar.items", { returnObjects: true }) as string[];
  const featureItems = t("features.items", { returnObjects: true }) as TItem[];
  const workflowItems = t("workflow.items", { returnObjects: true }) as TWorkflowItem[];
  const faqItems = t("faq.items", { returnObjects: true }) as TItem[];

  return (
    <SiteShell
      navAriaLabel={t("nav.primaryLabel")}
      navItems={navItems}
      footer={
        <footer className="footer">
          <div>
            <strong>{t("brand.name")}</strong>
            <p>{t("footer.tagline")}</p>
          </div>

          <div className="footer-links">
            <a href={externalLinks.repository} target="_blank" rel="noreferrer">
              {t("footer.github")}
            </a>
            <a href={externalLinks.releases} target="_blank" rel="noreferrer">
              {t("footer.releases")}
            </a>
            <a href={toSitePath("/support/")}>{t("nav.support")}</a>
            <a href={toSitePath("/privacy/")}>{t("nav.privacy")}</a>
            <a href={toSitePath("/changelog/")}>{t("nav.changelog")}</a>
          </div>
        </footer>
      }
    >
      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">{t("hero.eyebrow")}</p>
            <h1>{t("hero.title")}</h1>
            <p className="hero-text">{t("hero.description")}</p>

            <div className="hero-actions">
              <a
                className="button button-primary"
                href={externalLinks.latestRelease}
                target="_blank"
                rel="noreferrer"
              >
                {downloadLabel}
              </a>
              <a
                className="button button-secondary"
                href={externalLinks.releases}
                target="_blank"
                rel="noreferrer"
              >
                {t("hero.releaseNotes")}
              </a>
            </div>

            <ul className="hero-meta" aria-label={t("hero.highlightsLabel")}>
              {heroHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <ProductPreview />
        </section>

        <section className="signal-bar" aria-label={t("signalBar.ariaLabel")}>
          {signalItems.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </section>

        <section className="section-grid" id="features">
          <SectionHeading
            eyebrow={t("features.eyebrow")}
            title={t("features.title")}
          />

          <div className="card-grid">
            {featureItems.map((item) => (
              <article className="feature-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="workflow" id="workflow">
          <SectionHeading
            eyebrow={t("workflow.eyebrow")}
            title={t("workflow.title")}
          />

          <div className="workflow-list">
            {workflowItems.map((item) => (
              <article className="workflow-step" key={item.index}>
                <span className="step-index">{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="download-panel" id="download">
          <SectionHeading
            eyebrow={t("download.eyebrow")}
            title={t("download.title")}
            description={t("download.description")}
          />

          <div className="download-grid">
            <article className="download-card download-card-primary">
              <p className="download-label">{t("download.primaryLabel")}</p>
              <h3>{downloadLabel}</h3>
              <p>{t("download.primaryText")}</p>
              <a
                className="button button-primary"
                href={externalLinks.latestRelease}
                target="_blank"
                rel="noreferrer"
              >
                {t("download.openRelease")}
              </a>
            </article>

            <article className="download-card">
              <p className="download-label">{t("download.macLabel")}</p>
              <h3>{t("download.macTitle")}</h3>
              <p>{t("download.macText")}</p>
            </article>

            <article className="download-card disabled">
              <p className="download-label">{t("download.windowsLabel")}</p>
              <h3>{t("download.windowsTitle")}</h3>
              <p>{t("download.windowsText")}</p>
            </article>

            <article className="download-card disabled">
              <p className="download-label">{t("download.linuxLabel")}</p>
              <h3>{t("download.linuxTitle")}</h3>
              <p>{t("download.linuxText")}</p>
            </article>
          </div>
        </section>

        <section className="faq">
          <SectionHeading eyebrow={t("faq.eyebrow")} title={t("faq.title")} />

          <div className="faq-list">
            {faqItems.map((item) => (
              <article className="faq-item" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
