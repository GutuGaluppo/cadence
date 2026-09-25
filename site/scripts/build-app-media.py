"""Turns the raw captures from capture-app.mjs into the site's app assets.

Adds the macOS title bar (traffic lights) the Tauri window draws natively,
rounds the static shots' corners, and encodes the tour as GIF + animated WebP.

Usage: python3 site/scripts/build-app-media.py [captureDir]   (needs Pillow)
"""

import glob
import json
import os
import sys

from PIL import Image, ImageDraw

CAPTURES = sys.argv[1] if len(sys.argv) > 1 else ".app-captures"
ASSETS = os.path.join(os.path.dirname(__file__), "..", "src", "assets")

# Measured at 2x from a real macOS window of the app.
TITLE_BAR = 56
LIGHTS = ((32, (255, 95, 87)), (78, (254, 188, 46)), (124, (40, 200, 64)))
LIGHT_Y, LIGHT_R = 26, 12
CORNER_RADIUS = 24

TOUR_FPS = 15
TOUR_END_HOLD_MS = 1200
GIF_WIDTH = 480
WEBP_WIDTH = 600


def add_window_chrome(image, rounded=True):
    image = image.convert("RGB")
    width, height = image.size
    background = image.getpixel((4, 4))
    window = Image.new("RGB", (width, height + TITLE_BAR), background)
    window.paste(image, (0, TITLE_BAR))
    draw = ImageDraw.Draw(window)
    for x, color in LIGHTS:
        draw.ellipse((x - LIGHT_R, LIGHT_Y - LIGHT_R, x + LIGHT_R, LIGHT_Y + LIGHT_R), fill=color)
    if not rounded:
        return window

    # Supersampled mask for smooth corners.
    scale = 4
    mask = Image.new("L", (window.width * scale, window.height * scale), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, mask.width - 1, mask.height - 1), radius=CORNER_RADIUS * scale, fill=255
    )
    window = window.convert("RGBA")
    window.putalpha(mask.resize(window.size, Image.LANCZOS))
    return window


def resize_to_width(image, width):
    return image.resize((width, round(image.height * width / image.width)), Image.LANCZOS)


def build_shots():
    for path in sorted(glob.glob(os.path.join(CAPTURES, "shots", "*.png"))):
        add_window_chrome(Image.open(path)).save(
            os.path.join(ASSETS, os.path.basename(path)), optimize=True
        )


def build_tour():
    frames_dir = os.path.join(CAPTURES, "frames")
    times = json.load(open(os.path.join(frames_dir, "times.json")))["times"]
    files = sorted(glob.glob(os.path.join(frames_dir, "f*.png")))

    # Resample the irregular capture timeline onto a fixed frame rate,
    # merging repeats into longer frame durations.
    frames, durations = [], []
    source, previous = 0, None
    for tick in range(int((times[-1] - times[0]) * TOUR_FPS) + 1):
        moment = times[0] + tick / TOUR_FPS
        while source + 1 < len(times) and times[source + 1] <= moment:
            source += 1
        if source == previous:
            durations[-1] += 1000 / TOUR_FPS
            continue
        previous = source
        frames.append(add_window_chrome(Image.open(files[source]), rounded=False))
        durations.append(1000 / TOUR_FPS)
    durations[-1] += TOUR_END_HOLD_MS
    durations = [round(d) for d in durations]

    gif_frames = [
        resize_to_width(f, GIF_WIDTH).quantize(
            colors=128, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE
        )
        for f in frames
    ]
    gif_frames[0].save(
        os.path.join(ASSETS, "cadence-tour.gif"),
        save_all=True,
        append_images=gif_frames[1:],
        duration=durations,
        loop=0,
        optimize=True,
        disposal=1,
    )

    webp_frames = [resize_to_width(f, WEBP_WIDTH) for f in frames]
    webp_frames[0].save(
        os.path.join(ASSETS, "cadence-tour.webp"),
        save_all=True,
        append_images=webp_frames[1:],
        duration=durations,
        loop=0,
        quality=82,
        method=6,
    )
    print(f"Tour: {len(frames)} frames, {sum(durations) / 1000:.1f}s")


build_shots()
build_tour()
