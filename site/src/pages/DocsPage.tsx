import { useTranslation } from "react-i18next";
import { Reveal } from "../data/components/Reveal";
import { SectionHeading } from "../data/components/SectionHeading";
import { SiteShell } from "../data/components/SiteShell";
import { toSitePath } from "../lib/sitePaths";

type DocsSection = { title: string; items: string[] };

function renderInlineCode(text: string) {
	const parts = text.split(/(`[^`]+`)/g);

	return parts.map((part, index) =>
		part.startsWith("`") && part.endsWith("`") ? (
			<code key={index}>{part.slice(1, -1)}</code>
		) : (
			<span key={index}>{part}</span>
		),
	);
}

export function DocsPage() {
	const { t } = useTranslation();

	const navItems = [
		{ label: t("nav.features"), href: toSitePath("/#features") },
		{ label: t("nav.roadmap"), href: toSitePath("/roadmap/") },
		{ label: t("nav.support"), href: toSitePath("/support/") },
	];

	const installSteps = t("docs.install.steps", {
		returnObjects: true,
	}) as string[];
	const gatekeeperSteps = t("docs.install.gatekeeperSteps", {
		returnObjects: true,
	}) as string[];
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

				<Reveal as="section" className="content-card">
					<h2>{t("docs.install.title")}</h2>
					<ol className="content-list">
						{installSteps.map((step) => (
							<li key={step}>{renderInlineCode(step)}</li>
						))}
					</ol>

					<div className="gatekeeper-note">
						<h3>{t("docs.install.gatekeeperTitle")}</h3>
						<p>{t("docs.install.gatekeeperExplanation")}</p>
						<p>{t("docs.install.gatekeeperReassurance")}</p>
						<ol className="content-list">
							{gatekeeperSteps.map((step) => (
								<li key={step}>{renderInlineCode(step)}</li>
							))}
						</ol>
					</div>

					<p>
						<strong>{t("docs.install.homebrewTitle")}</strong>{" "}
						{renderInlineCode(t("docs.install.homebrewText"))}
					</p>
				</Reveal>

				{sections.map((section, index) => (
					<Reveal as="section" className="content-card" delay={(index + 1) * 0.06} key={section.title}>
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
