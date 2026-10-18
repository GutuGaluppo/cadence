import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { SplashScreen } from "../../../../src/features/splash/SplashScreen";

// A "fake loader": the page renders underneath from the start, while the app's
// own splash plays over it once per browser session. `?splash` forces it again.
const SEEN_KEY = "cadence_site_splash_seen";
const SKIP_FADE_MS = 350;

type Phase = "splash" | "revealing" | "skipping" | "done";

/** False while the splash covers the page, so entrance animations wait for it. */
const SiteReadyContext = createContext(true);

export const useSiteReady = () => useContext(SiteReadyContext);

function shouldPlaySplash() {
	try {
		if (new URLSearchParams(window.location.search).has("splash")) return true;
		if (sessionStorage.getItem(SEEN_KEY)) return false;
		sessionStorage.setItem(SEEN_KEY, "1");
	} catch {
		// Storage can be blocked; playing the splash is the safe default.
	}
	return true;
}

export function SiteLoader({ children }: { children: ReactNode }) {
	const [phase, setPhase] = useState<Phase>(() => (shouldPlaySplash() ? "splash" : "done"));

	// A skip may already be fading the splash out; the reveal must not undo it.
	const handleReveal = useCallback(
		() => setPhase((current) => (current === "splash" ? "revealing" : current)),
		[],
	);
	const handleComplete = useCallback(() => setPhase("done"), []);
	const skip = useCallback(
		() => setPhase((current) => (current === "done" ? current : "skipping")),
		[],
	);

	useEffect(() => {
		if (phase === "done") return;

		const root = document.documentElement;
		root.style.overflow = "hidden";
		window.addEventListener("keydown", skip);
		return () => {
			root.style.overflow = "";
			window.removeEventListener("keydown", skip);
		};
	}, [phase, skip]);

	useEffect(() => {
		if (phase !== "skipping") return;
		const t = setTimeout(handleComplete, SKIP_FADE_MS);
		return () => clearTimeout(t);
	}, [phase, handleComplete]);

	return (
		<SiteReadyContext.Provider value={phase !== "splash"}>
			{children}
			{phase !== "done" && (
				<div
					className={`site-loader${phase === "skipping" ? " site-loader--skipping" : ""}`}
					onClick={skip}
				>
					<SplashScreen onReveal={handleReveal} onComplete={handleComplete} />
				</div>
			)}
		</SiteReadyContext.Provider>
	);
}
