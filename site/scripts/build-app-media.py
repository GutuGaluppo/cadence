"""Turns the raw captures from capture-app.mjs into the site's app assets.

Rounds the corners of the full-window shots (the app draws its own window
controls now), keeps the reduced timer's shots as transparent PNGs, and encodes
the tour as GIF + animated WebP. Reduced frames are centred on a full-window
canvas so the animation keeps one size.

Usage: python3 site/scripts/build-app-media.py [captureDir]   (needs Pillow)
"""

import glob
import json
import os
import sys

from PIL import Image, ImageDraw

CAPTURES = sys.argv[1] if len(sys.argv) > 1 else ".app-captures"
ASSETS = os.path.join(os.path.dirname(__file__), "..", "src", "assets")

# Captures are 2x. The full window is 350x520 and the reduced timer 260x348
# (see WINDOW and COMPACT in capture-app.mjs).
WINDOW_SIZE = (700, 1040)
COMPACT_WIDTH = 520
CORNER_RADIUS = 24

TOUR_FPS = 15
TOUR_END_HOLD_MS = 1200
GIF_WIDTH = 480
WEBP_WIDTH = 600


def is_compact(image):
    return image.width == COMPACT_WIDTH


def fit_to_window(image):
    """Centres a reduced capture on a full-window canvas, filled with the page colour."""
    image = image.convert("RGB")
    if image.size == WINDOW_SIZE:
        return image
    canvas = Image.new("RGB", WINDOW_SIZE, image.getpixel((4, 4)))
    canvas.paste(
        image,
        ((WINDOW_SIZE[0] - image.width) // 2, (WINDOW_SIZE[1] - image.height) // 2),
    )
    return canvas


def round_corners(image):
    # Supersampled mask for smooth corners.
    image = image.convert("RGB")
    scale = 4
    mask = Image.new("L", (image.width * scale, image.height * scale), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, mask.width - 1, mask.height - 1), radius=CORNER_RADIUS * scale, fill=255
    )
    image = image.convert("RGBA")
    image.putalpha(mask.resize(image.size, Image.LANCZOS))
    return image


def resize_to_width(image, width):
    return image.resize((width, round(image.height * width / image.width)), Image.LANCZOS)


def build_shots():
    for path in sorted(glob.glob(os.path.join(CAPTURES, "shots", "*.png"))):
        image = Image.open(path)
        output = image if is_compact(image) else round_corners(image)
        output.save(os.path.join(ASSETS, os.path.basename(path)), optimize=True)


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
        frames.append(fit_to_window(Image.open(files[source])))
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
