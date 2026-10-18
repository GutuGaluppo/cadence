// Drives the real app frontend (`pnpm dev`, browser runtime with the
// localStorage repositories) in headless Chrome and writes raw captures:
//   <out>/shots/app-<screen>-<theme>.png   static screens, light + dark
//   <out>/frames/f####.png + times.json    the navigation tour, for the GIF
// Then run site/scripts/build-app-media.py to frame them and export assets.
//
// Usage: node site/scripts/capture-app.mjs [outDir]
//   APP_URL      default http://localhost:1420
//   CHROME_PATH  default macOS Google Chrome
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const APP_URL = process.env.APP_URL ?? "http://localhost:1420";
const CHROME_PATH =
	process.env.CHROME_PATH ??
	"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = path.resolve(process.argv[2] ?? ".app-captures");
// Matches the Tauri window's inner size in src-tauri/tauri.conf.json.
const WINDOW = { width: 350, height: 520 };
// The timer view is the reduced circle; these match COMPACT_WINDOW_SIZE in
// src/app/window/useCompactWindow.ts.
const COMPACT = { width: 260, height: 348 };

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// The app switches to the reduced window itself when the timer view is shown;
// the viewport has to follow so each capture matches the native window size.
async function setSize(page, size) {
	await page.setViewport({ ...size, deviceScaleFactor: 2 });
	await sleep(400);
}

const now = Date.now();
const demoTasks = [
	{ title: "Write the Q4 product brief", pomodoroCount: 3 },
	{ title: "Review pull requests", pomodoroCount: 1 },
	{
		title: "Design onboarding flow",
		pomodoroCount: 2,
		focusDuration: 50,
		shortBreakDuration: 10,
	},
	{ title: "Read: Deep Work, ch. 3", pomodoroCount: 0 },
]
	.map((task, index) => ({
		id: `demo-${index}`,
		completed: false,
		createdAt: now - index * 60_000,
		...task,
	}))
	.concat({
		id: "demo-done",
		title: "Inbox zero",
		completed: true,
		pomodoroCount: 1,
		createdAt: now - 900_000,
	});

async function openApp(browser, theme) {
	const page = await browser.newPage();
	// The app opens on the timer, which is the reduced window.
	await page.setViewport({ ...COMPACT, deviceScaleFactor: 2 });
	await page.goto(APP_URL);
	await page.evaluate(
		(tasks, themeMode) => {
			localStorage.clear();
			localStorage.setItem("cadence_tasks", JSON.stringify(tasks));
			localStorage.setItem("cadence_settings", JSON.stringify({ themeMode }));
		},
		demoTasks,
		theme,
	);
	await page.goto(APP_URL, { waitUntil: "networkidle0" });
	await sleep(6000); // splash screen (5.4s, see src/features/splash)
	return page;
}

// Resolves a `[aria-label=...]` selector or the deepest element containing text.
async function locate(page, target) {
	for (let attempt = 0; attempt < 40; attempt++) {
		const handle = target.startsWith("[")
			? await page.$(target)
			: await page.evaluateHandle((text) => {
					const matches = [...document.querySelectorAll("body *")].filter(
						(el) =>
							el.textContent.includes(text) &&
							el.getBoundingClientRect().width > 0,
					);
					return matches[matches.length - 1];
				}, target);
		const box = await handle?.asElement()?.boundingBox();
		if (box) return [box.x + box.width / 2, box.y + box.height / 2];
		await sleep(100);
	}
	throw new Error(`Element not found: ${target}`);
}

async function click(page, target, wait = 900) {
	const [x, y] = await locate(page, target);
	await page.mouse.click(x, y);
	await sleep(wait);
}

async function captureScreens(browser, theme) {
	const page = await openApp(browser, theme);
	// Compact screens are transparent PNGs: the circle floats with no card behind it.
	const shot = (name, { compact = false } = {}) =>
		page.screenshot({
			path: path.join(OUT, "shots", `app-${name}-${theme}.png`),
			omitBackground: compact,
		});

	await shot("home", { compact: true });
	await click(page, '[aria-label="Open task list"]', 600);
	await setSize(page, WINDOW);
	await click(page, "Write the Q4", 500);
	await shot("task-modal");
	await click(page, '[aria-label="Close"]', 600);
	await setSize(page, COMPACT);
	await click(page, '[aria-label="Start timer"]', 0);
	await page.mouse.move(-1, -1); // leave the window so no hover controls show
	// Headless Chrome can keep the hover state after the pointer leaves, which
	// would leave the action arc half-faded in the capture. Hide it explicitly.
	const hideArc = await page.addStyleTag({
		content: ".compact-controls { opacity: 0 !important; }",
	});
	await sleep(4200);
	await shot("running", { compact: true });
	await hideArc.evaluate((style) => style.remove());
	await click(page, '[aria-label="Open task management"]', 600);
	await setSize(page, WINDOW);
	await shot("tasks");
	await click(page, "New Task", 600);
	await page.type("input[type=text]", "Plan the sprint retro", { delay: 20 });
	await sleep(400);
	await shot("task-create");
	await click(page, '[aria-label="Go back"]', 600);
	await click(page, '[aria-label="Go back"]', 600);
	await setSize(page, COMPACT);
	await click(page, '[aria-label="Open settings"]', 600);
	await setSize(page, WINDOW);
	await shot("settings");
	await page.close();
}

async function recordTour(browser) {
	const page = await openApp(browser, "light");

	// The clip follows the window size, which changes with the view: the timer
	// is the reduced circle, every panel and the task list is the full window.
	let current = COMPACT;
	const resize = async (next) => {
		current = next;
		await setSize(page, next);
	};

	// Visit every lazy view once so no "Loading..." fallback lands in the GIF.
	for (const label of ["Open task management", "Open settings"]) {
		await click(page, `[aria-label="${label}"]`, 600);
		await resize(WINDOW);
		await click(page, '[aria-label="Go back"]', 1200);
		await resize(COMPACT);
	}
	await click(page, '[aria-label="Open task management"]', 600);
	await resize(WINDOW);
	await click(page, "New Task");
	await click(page, '[aria-label="Go back"]');
	await click(page, '[aria-label="Go back"]');
	await resize(COMPACT);

	let cursor = [130, 125];
	await page.mouse.move(...cursor);
	await sleep(1200);

	// Headless Chrome draws no pointer, so render one that follows the mouse.
	await page.evaluate(([x, y]) => {
		const dot = document.createElement("div");
		dot.style.cssText = `position:fixed;left:0;top:0;width:22px;height:22px;margin:-11px 0 0 -11px;border-radius:50%;background:rgba(40,36,90,.28);border:2px solid rgba(255,255,255,.9);box-shadow:0 1px 6px rgba(0,0,0,.25);pointer-events:none;z-index:2147483647;transform:translate(${x}px,${y}px);transition:width .12s,height .12s,margin .12s`;
		document.body.appendChild(dot);
		const size = (px) => {
			dot.style.width = dot.style.height = `${px}px`;
			dot.style.margin = `-${px / 2}px 0 0 -${px / 2}px`;
		};
		document.addEventListener("mousemove", (e) => {
			dot.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
		}, true);
		document.addEventListener("mousedown", () => size(16), true);
		document.addEventListener("mouseup", () => size(22), true);
	}, cursor);

	// Raw CDP captures: page.screenshot() re-applies device metrics per call,
	// which throws off concurrent mouse coordinates.
	const cdp = await page.createCDPSession();
	const frames = [];
	let recording = true;
	const recorder = (async () => {
		while (recording) {
			const t = Date.now() / 1000;
			const { data } = await cdp.send("Page.captureScreenshot", {
				format: "png",
				clip: { x: 0, y: 0, ...current, scale: 2 },
			});
			frames.push({ t, data });
		}
	})();

	const glide = async (to) => {
		await page.mouse.move(...to, { steps: 16 });
		cursor = to;
	};
	const tap = async (target, hold = 500) => {
		await glide(await locate(page, target));
		await sleep(180);
		await page.mouse.down();
		await sleep(90);
		await page.mouse.up();
		await sleep(hold);
	};

	await sleep(1300);
	await tap('[aria-label="Open task list"]', 300);
	await resize(WINDOW);
	await sleep(800);
	await tap("Write the Q4", 700);
	await tap('[aria-label="Close"]', 300);
	await resize(COMPACT);
	await sleep(500);
	await tap('[aria-label="Start timer"]', 250);
	await glide([130, 125]);
	await page.mouse.move(-1, -1, { steps: 8 }); // leave the window: no hover controls
	cursor = [-1, -1];
	await sleep(3000);
	await glide([130, 125]);
	await tap('[aria-label="Open task management"]', 300);
	await resize(WINDOW);
	await sleep(1000);
	await tap('[aria-label="Go back"]', 700);
	await resize(COMPACT);
	await tap('[aria-label="Open settings"]', 300);
	await resize(WINDOW);
	await sleep(700);
	await tap("Dark", 1200);
	await tap('[aria-label="Go back"]', 300);
	await resize(COMPACT);
	await glide([130, 125]);
	await sleep(2400);

	recording = false;
	await recorder;
	frames.forEach((frame, index) =>
		fs.writeFileSync(
			path.join(OUT, "frames", `f${String(index).padStart(4, "0")}.png`),
			Buffer.from(frame.data, "base64"),
		),
	);
	fs.writeFileSync(
		path.join(OUT, "frames", "times.json"),
		JSON.stringify({ times: frames.map((frame) => frame.t) }),
	);
	await page.close();
	return frames.length;
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, "shots"), { recursive: true });
fs.mkdirSync(path.join(OUT, "frames"), { recursive: true });

const browser = await puppeteer.launch({ executablePath: CHROME_PATH, headless: true });
try {
	await captureScreens(browser, "light");
	await captureScreens(browser, "dark");
	const count = await recordTour(browser);
	console.log(`Captured 12 screens and ${count} tour frames into ${OUT}`);
} finally {
	await browser.close();
}
