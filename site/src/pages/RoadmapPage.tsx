import { useTranslation } from "react-i18next";
import { Reveal } from "../data/components/Reveal";
import { SectionHeading } from "../data/components/SectionHeading";
import { SiteShell } from "../data/components/SiteShell";
import { externalLinks } from "../data/siteContent";
import { toSitePath } from "../lib/sitePaths";

type RoadmapSection = { title: string; items: string[] };

export function RoadmapPage() {
	const { t } = useTranslation();

	const navItems = [
		{ label: t("nav.download"), href: toSitePath("/#download") },
		{ label: t("nav.support"), href: toSitePath("/support/") },
		{ label: t("nav.privacy"), href: toSitePath("/privacy/") },
	];

	const sections = t("roadmap.sections", {
		returnObjects: true,
	}) as RoadmapSection[];

	return (
		<SiteShell
			compact
			navAriaLabel={t("nav.secondaryLabel")}
			navItems={navItems}
		>
			<main className="content-stack">
				<SectionHeading
					eyebrow={t("roadmap.eyebrow")}
					title={t("roadmap.title")}
					description={t("roadmap.description")}
					titleTag="h1"
					titleClassName="subpage-title"
				/>

				{sections.map((section, index) => (
					<Reveal as="section" className="content-card" delay={index * 0.06} key={section.title}>
						<h2>{section.title}</h2>
						<ul className="content-list">
							{section.items.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</Reveal>
				))}

				<Reveal as="section" className="content-card" delay={sections.length * 0.06}>
					<h2>{t("roadmap.linksTitle")}</h2>
					<div className="link-grid">
						<a
							className="link-tile"
							href={toSitePath("/changelog/")}
						>
							<strong>{t("roadmap.changelogLink")}</strong>
							<span>{t("roadmap.changelogLinkDesc")}</span>
						</a>
						<a
							className="link-tile"
							href={externalLinks.issuesNew}
							target="_blank"
							rel="noreferrer"
						>
							<strong>{t("roadmap.issueLink")}</strong>
							<span>{t("roadmap.issueLinkDesc")}</span>
						</a>
					</div>
				</Reveal>
			</main>
		</SiteShell>
	);
}
