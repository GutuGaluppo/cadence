import { useTranslation } from "react-i18next";
import { SectionHeading } from "../components/SectionHeading";
import { SiteShell } from "../components/SiteShell";
import { externalLinks } from "../data/siteContent";
import { toSitePath } from "../lib/sitePaths";

export function ChangelogPage() {
  const { t } = useTranslation();

  const navItems = [
    { label: t("nav.download"), href: toSitePath("/#download") },
    { label: t("nav.support"), href: toSitePath("/support/") },
    { label: t("nav.privacy"), href: toSitePath("/privacy/") },
  ];

  const highlights = t("changelog.highlights", { returnObjects: true }) as string[];

  return (
    <SiteShell compact navAriaLabel={t("nav.secondaryLabel")} navItems={navItems}>
      <main className="content-stack">
        <SectionHeading
          eyebrow={t("changelog.eyebrow")}
          title={t("changelog.title")}
          description={t("changelog.description")}
          titleTag="h1"
          titleClassName="subpage-title"
        />

        <section className="content-card">
          <h2>{t("changelog.currentWork")}</h2>
          <ul className="content-list">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="content-card">
          <h2>{t("changelog.canonicalSources")}</h2>
          <div className="link-grid">
            <a
              className="link-tile"
              href={externalLinks.releases}
              target="_blank"
              rel="noreferrer"
            >
              <strong>{t("changelog.githubReleases")}</strong>
              <span>{t("changelog.githubReleasesDesc")}</span>
            </a>
            <a
              className="link-tile"
              href={externalLinks.changelog}
              target="_blank"
              rel="noreferrer"
            >
              <strong>{t("changelog.repoChangelog")}</strong>
              <span>{t("changelog.repoChangelogDesc")}</span>
            </a>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
