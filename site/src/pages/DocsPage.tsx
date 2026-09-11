import { useTranslation } from "react-i18next";
import appIcon from "../assets/app-icon.png";
import appHomeShot from "../assets/app-home-light.png";
import appTaskModalShot from "../assets/app-task-modal-light.png";
import appTasksShot from "../assets/app-tasks-light.png";
import appTaskCreateShot from "../assets/app-task-create-light.png";
import appSettingsShot from "../assets/app-settings-light.png";
import terminalFinderShot from "../assets/terminal-finder-light.png";
import terminalEmptyShot from "../assets/terminal-empty-light.png";
import terminalBrewShot from "../assets/terminal-brew-version-light.png";
import { Reveal } from "../data/components/Reveal";
import { SectionHeading } from "../data/components/SectionHeading";
import { SiteShell } from "../data/components/SiteShell";
import { toSitePath } from "../lib/sitePaths";

type DocsSection = { title: string; items: string[] };

const HOMEBREW_SHOTS = [
	{ src: terminalFinderShot, captionKey: "docs.shots.terminalFinder" },
	{ src: terminalEmptyShot, captionKey: "docs.shots.terminalEmpty" },
	{ src: terminalBrewShot, captionKey: "docs.shots.terminalBrew" },
];

const SECTION_SHOTS: { src: string; captionKey: string }[][] = [
	[{ src: appHomeShot, captionKey: "docs.shots.home" }],
	[
		{ src: appTaskModalShot, captionKey: "docs.shots.taskModal" },
		{ src: appTasksShot, captionKey: "docs.shots.tasksPage" },
		{ src: appTaskCreateShot, captionKey: "docs.shots.taskCreate" },
	],
	[{ src: appSettingsShot, captionKey: "docs.shots.settings" }],
];

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
	const homebrewSteps = t("docs.homebrewGuide.steps", {
		returnObjects: true,
	}) as string[];

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
					<div className="content-card-heading">
						<img alt="" className="content-card-icon" src={appIcon} />
						<h2>{t("docs.install.title")}</h2>
					</div>
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

				<Reveal as="section" className="content-card" delay={0.06}>
					<h2>{t("docs.homebrewGuide.title")}</h2>
					<p>{t("docs.homebrewGuide.intro")}</p>

					<ol className="content-list">
						{homebrewSteps.map((step) => (
							<li key={step}>{renderInlineCode(step)}</li>
						))}
					</ol>

					<div className="doc-shot-row">
						{HOMEBREW_SHOTS.map((shot) => (
							<figure className="doc-shot" key={shot.src}>
								<img alt={t(shot.captionKey)} src={shot.src} />
								<figcaption className="doc-shot-caption">
									{t(shot.captionKey)}
								</figcaption>
							</figure>
						))}
					</div>

					<p>{renderInlineCode(t("docs.homebrewGuide.pasteTip"))}</p>
				</Reveal>

				{sections.map((section, index) => (
					<Reveal as="section" className="content-card" delay={(index + 2) * 0.06} key={section.title}>
						<h2>{section.title}</h2>
						<ul className="content-list">
							{section.items.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>

						{SECTION_SHOTS[index] && (
							<div className="doc-shot-row">
								{SECTION_SHOTS[index].map((shot) => (
									<figure className="doc-shot" key={shot.src}>
										<img alt={t(shot.captionKey)} src={shot.src} />
										<figcaption className="doc-shot-caption">
											{t(shot.captionKey)}
										</figcaption>
									</figure>
								))}
							</div>
						)}
					</Reveal>
				))}
			</main>
		</SiteShell>
	);
}
