import { useTranslation } from "react-i18next";
import { Reveal } from "../data/components/Reveal";
import { SectionHeading } from "../data/components/SectionHeading";
import { SiteShell } from "../data/components/SiteShell";
import { externalLinks } from "../data/siteContent";
import { toSitePath } from "../lib/sitePaths";

type Tile = { title: string; description: string };

const tileLinks = [
	externalLinks.issuesNew,
	externalLinks.releases,
	externalLinks.repository,
];

export function SupportPage() {
	const { t } = useTranslation();

	const navItems = [
		{ label: t("nav.download"), href: toSitePath("/#download") },
		{ label: t("nav.privacy"), href: toSitePath("/privacy/") },
		{ label: t("nav.changelog"), href: toSitePath("/changelog/") },
	];

	const tiles = t("support.tiles", { returnObjects: true }) as Tile[];
	const checklist = t("support.checklist", { returnObjects: true }) as string[];

	return (
		<SiteShell
			compact
			navAriaLabel={t("nav.secondaryLabel")}
			navItems={navItems}
		>
			<main className="content-stack">
				<SectionHeading
					eyebrow={t("support.eyebrow")}
					title={t("support.title")}
					description={t("support.description")}
					titleTag="h1"
					titleClassName="subpage-title"
				/>

				<Reveal as="section" className="content-card">
					<h2>{t("support.openThread")}</h2>
					<div className="link-grid">
						{tiles.map((tile, index) => (
							<a
								className={`link-tile${index === 1 ? " cta-release" : ""}`}
								href={tileLinks[index]}
								key={tile.title}
								target="_blank"
								rel="noreferrer"
							>
								<strong>{tile.title}</strong>
								<span>{tile.description}</span>
							</a>
						))}
					</div>
				</Reveal>

				<Reveal as="section" className="content-card" delay={0.08}>
					<h2>{t("support.bugReport")}</h2>
					<ul className="content-list">
						{checklist.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</Reveal>

				<Reveal as="section" className="content-card" delay={0.16}>
					<h2>{t("support.beforePosting")}</h2>
					<p>{t("support.beforePostingText")}</p>
				</Reveal>
			</main>
		</SiteShell>
	);
}
