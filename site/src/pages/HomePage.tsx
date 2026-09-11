import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ProductPreview } from "../data/components/ProductPreview";
import { Reveal } from "../data/components/Reveal";
import { SectionHeading } from "../data/components/SectionHeading";
import { SiteShell } from "../data/components/SiteShell";
import { externalLinks } from "../data/siteContent";
import { toSitePath } from "../lib/sitePaths";

const heroContainer: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const heroItem: Variants = {
	hidden: { opacity: 0, y: 18 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
	},
};

type TItem = { title: string; description: string };
type TWorkflowItem = { index: string; title: string; description: string };

export function HomePage() {
	const { t } = useTranslation();
	const shouldReduceMotion = useReducedMotion();
	const [downloadLabel, setDownloadLabel] = useState(() =>
		t("hero.downloadLatest"),
	);

	useEffect(() => {
		const platform = window.navigator.platform.toLowerCase();
		setDownloadLabel(
			platform.includes("mac")
				? t("hero.downloadMac")
				: t("hero.downloadLatest"),
		);
	}, [t]);

	const navItems = [
		{ label: t("nav.features"), href: toSitePath("/#features") },
		{ label: t("nav.workflow"), href: toSitePath("/#workflow") },
		{ label: t("nav.download"), href: toSitePath("/#download") },
		{ label: t("nav.docs"), href: toSitePath("/docs/") },
	];

	const heroHighlights = t("heroHighlights", {
		returnObjects: true,
	}) as string[];
	const signalItems = t("signalBar.items", { returnObjects: true }) as string[];
	const featureItems = t("features.items", { returnObjects: true }) as TItem[];
	const workflowItems = t("workflow.items", {
		returnObjects: true,
	}) as TWorkflowItem[];
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
						<a href={toSitePath("/docs/")}>{t("nav.docs")}</a>
						<a href={toSitePath("/roadmap/")}>{t("nav.roadmap")}</a>
						<a href={toSitePath("/support/")}>{t("nav.support")}</a>
						<a href={toSitePath("/privacy/")}>{t("nav.privacy")}</a>
						<a href={toSitePath("/changelog/")}>{t("nav.changelog")}</a>
					</div>
				</footer>
			}
		>
			<main id="top">
				<section className="hero">
					<motion.div
						className="hero-copy"
						variants={heroContainer}
						initial={shouldReduceMotion ? "show" : "hidden"}
						animate="show"
					>
						<motion.p className="eyebrow" variants={heroItem}>
							{t("hero.eyebrow")}
						</motion.p>
						<motion.h1 variants={heroItem}>{t("hero.title")}</motion.h1>
						<motion.p className="hero-text" variants={heroItem}>
							{t("hero.description")}
						</motion.p>

						<motion.div className="hero-actions" variants={heroItem}>
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
						</motion.div>

						<motion.ul
							className="hero-meta"
							aria-label={t("hero.highlightsLabel")}
							variants={heroItem}
						>
							{heroHighlights.map((item) => (
								<li key={item}>{item}</li>
							))}
						</motion.ul>
					</motion.div>

					<motion.div
						initial={shouldReduceMotion ? "show" : { opacity: 0, scale: 0.96 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
					>
						<ProductPreview />
					</motion.div>
				</section>

				<section className="signal-bar" aria-label={t("signalBar.ariaLabel")}>
					{signalItems.map((item, index) => (
						<Reveal delay={index * 0.06} key={item}>
							{item}
						</Reveal>
					))}
				</section>

				<section className="section-grid" id="features">
					<Reveal>
						<SectionHeading
							eyebrow={t("features.eyebrow")}
							title={t("features.title")}
						/>
					</Reveal>

					<div className="card-grid">
						{featureItems.map((item, index) => (
							<Reveal as="article" className="feature-card" delay={index * 0.08} key={item.title}>
								<h3>{item.title}</h3>
								<p>{item.description}</p>
							</Reveal>
						))}
					</div>
				</section>

				<section className="workflow" id="workflow">
					<Reveal>
						<SectionHeading
							eyebrow={t("workflow.eyebrow")}
							title={t("workflow.title")}
						/>
					</Reveal>

					<div className="workflow-list">
						{workflowItems.map((item, index) => (
							<Reveal as="article" className="workflow-step" delay={index * 0.08} key={item.index}>
								<span className="step-index">{item.index}</span>
								<h3>{item.title}</h3>
								<p>{item.description}</p>
							</Reveal>
						))}
					</div>
				</section>

				<section className="download-panel" id="download">
					<Reveal>
						<SectionHeading
							eyebrow={t("download.eyebrow")}
							title={t("download.title")}
							description={t("download.description")}
						/>
					</Reveal>

					<div className="download-grid">
						<Reveal as="article" className="download-card download-card-primary">
							<p className="download-label">{t("download.primaryLabel")}</p>
							<h3>{downloadLabel}</h3>
							<p>{t("download.primaryText")}</p>
							<a
								className="button button-primary cta-release"
								href={externalLinks.latestRelease}
								target="_blank"
								rel="noreferrer"
							>
								{t("download.openRelease")}
							</a>
						</Reveal>

						<Reveal as="article" className="download-card" delay={0.08}>
							<p className="download-label">{t("download.macLabel")}</p>
							<h3>{t("download.macTitle")}</h3>
							<p>{t("download.macText")}</p>
						</Reveal>

						<Reveal as="article" className="download-card" delay={0.12}>
							<p className="download-label">{t("download.homebrewLabel")}</p>
							<h3>{t("download.homebrewTitle")}</h3>
							<p>{t("download.homebrewText")}</p>
							<a className="button button-secondary" href={toSitePath("/docs/#homebrew")}>
								{t("download.homebrewLink")}
							</a>
						</Reveal>

						<Reveal as="article" className="download-card disabled" delay={0.16}>
							<p className="download-label">{t("download.windowsLabel")}</p>
							<h3>{t("download.windowsTitle")}</h3>
							<p>{t("download.windowsText")}</p>
						</Reveal>

						<Reveal as="article" className="download-card disabled" delay={0.24}>
							<p className="download-label">{t("download.linuxLabel")}</p>
							<h3>{t("download.linuxTitle")}</h3>
							<p>{t("download.linuxText")}</p>
						</Reveal>
					</div>
				</section>

				<section className="faq">
					<Reveal>
						<SectionHeading eyebrow={t("faq.eyebrow")} title={t("faq.title")} />
					</Reveal>

					<div className="faq-list">
						{faqItems.map((item, index) => (
							<Reveal as="article" className="faq-item" delay={index * 0.08} key={item.title}>
								<h3>{item.title}</h3>
								<p>{item.description}</p>
							</Reveal>
						))}
					</div>
				</section>
			</main>
		</SiteShell>
	);
}
