import { useTranslation } from "react-i18next";
import { SectionHeading } from "../components/SectionHeading";
import { SiteShell } from "../components/SiteShell";
import { toSitePath } from "../lib/sitePaths";

type PrivacySection =
  | { title: string; items: string[] }
  | { title: string; description: string };

export function PrivacyPage() {
  const { t } = useTranslation();

  const navItems = [
    { label: t("nav.features"), href: toSitePath("/#features") },
    { label: t("nav.support"), href: toSitePath("/support/") },
    { label: t("nav.changelog"), href: toSitePath("/changelog/") },
  ];

  const sections = t("privacy.sections", { returnObjects: true }) as PrivacySection[];

  return (
    <SiteShell compact navAriaLabel={t("nav.secondaryLabel")} navItems={navItems}>
      <main className="content-stack">
        <SectionHeading
          eyebrow={t("privacy.eyebrow")}
          title={t("privacy.title")}
          description={t("privacy.description")}
          titleTag="h1"
          titleClassName="subpage-title"
        />

        {sections.map((section) => (
          <section className="content-card" key={section.title}>
            <h2>{section.title}</h2>
            {"items" in section ? (
              <ul className="content-list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{section.description}</p>
            )}
          </section>
        ))}
      </main>
    </SiteShell>
  );
}
