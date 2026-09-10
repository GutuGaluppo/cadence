import { useTranslation } from "react-i18next";
import { Reveal } from "../data/components/Reveal";
import { SectionHeading } from "../data/components/SectionHeading";
import { SiteShell } from "../data/components/SiteShell";
import { toSitePath } from "../lib/sitePaths";

type DocsSection = { title: string; items: string[] };

export function DocsPage() {
	const { t } = useTranslation();

	const navItems = [
		{ label: t("nav.features"), href: toSitePath("/#features") },
		{ label: t("nav.roadmap"), href: toSitePath("/roadmap/") },
		{ label: t("nav.support"), href: toSitePath("/support/") },
	];

	const sections = t("docs.sections", {
		returnObjects: true,
	}) as DocsSection[];

	return (
		<SiteShell
			compact
			navAriaLabel={t("nav.secondaryLabel")}
			navItems={navItems}
		>
			<main className="content-stack">
				<SectionHeading
					eyebrow={t("docs.eyebrow")}
					title={t("docs.title")}
					description={t("docs.description")}
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
			</main>
		</SiteShell>
	);
}
