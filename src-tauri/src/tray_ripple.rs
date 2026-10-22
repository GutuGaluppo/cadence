//! Ripple animation for the menu bar icon while the timer runs.
//!
//! The icon's concentric rings rest at the same translucent, milky
//! opacity while soft bands of full opacity keep travelling from the center
//! outwards, like the waves left by a drop falling into water. Only the rings
//! are animated; the background of the icon stays still.

use std::{
    f32::consts::TAU,
    sync::{
        atomic::{AtomicBool, Ordering},
        Arc,
    },
    thread::{self, JoinHandle},
    time::Duration,
};

use tauri::{image::Image, tray::TrayIcon, Runtime};

use crate::tray_badge::badge;

/// Opacity of the rings between waves.
const RESTING_OPACITY: f32 = 0.35;
/// Opacity at the crest of a wave.
const PEAK_OPACITY: f32 = 1.0;
/// Distance (in px) between two consecutive waves.
const WAVELENGTH: f32 = 12.0;

const FRAME_DURATION: Duration = Duration::from_millis(50);
const FRAMES_PER_WAVE: usize = 60; // a new wave leaves the center every 3s

/// Outer radius (in px) of each ring in `tray-icon.png`, from the center out.
/// The icon draws each ring at a different opacity, so every ring is
/// normalized by its own peak alpha before the animation is applied.
const RING_BOUNDS: [f32; 4] = [7.5, 10.1, 12.9, f32::INFINITY];

pub struct TrayRipple {
    running: Arc<AtomicBool>,
    worker: JoinHandle<()>,
}

impl TrayRipple {
    /// `rings` is the plain `tray-icon.png`; frames are drawn with [`badge`].
    pub fn spawn<R: Runtime>(tray: TrayIcon<R>, rings: &Image<'_>) -> Self {
        let running = Arc::new(AtomicBool::new(false));
        let frames = build_frames(rings);
        let icon = badge(rings);

        let worker = {
            let running = running.clone();
            thread::spawn(move || loop {
                if !running.load(Ordering::Relaxed) {
                    // Parking can wake spuriously; the loop re-checks the flag.
                    thread::park();
                    continue;
                }

                for (frame, delay) in &frames {
                    if !running.load(Ordering::Relaxed) {
                        break;
                    }
                    let _ = tray.set_icon(Some(frame.clone()));
                    thread::sleep(*delay);
                }

                if !running.load(Ordering::Relaxed) {
                    let _ = tray.set_icon(Some(icon.clone()));
                }
            })
        };

        Self { running, worker }
    }

    pub fn set_running(&self, is_running: bool) {
        let was_running = self.running.swap(is_running, Ordering::Relaxed);
        if is_running && !was_running {
            self.worker.thread().unpark();
        }
    }
}

fn build_frames(icon: &Image<'_>) -> Vec<(Image<'static>, Duration)> {
    let (width, height) = (icon.width(), icon.height());
    let center_x = (width as f32 - 1.0) / 2.0;
    let center_y = (height as f32 - 1.0) / 2.0;

    let pixels: Vec<(f32, usize, u8)> = icon
        .rgba()
        .chunks_exact(4)
        .enumerate()
        .map(|(i, pixel)| {
            let x = (i as u32 % width) as f32 - center_x;
            let y = (i as u32 / width) as f32 - center_y;
            let radius = (x * x + y * y).sqrt();
            let ring = RING_BOUNDS.iter().position(|&bound| radius < bound);
            (radius, ring.unwrap_or(RING_BOUNDS.len() - 1), pixel[3])
        })
        .collect();

    let mut ring_peaks = [1u8; RING_BOUNDS.len()];
    for &(_, ring, alpha) in &pixels {
        ring_peaks[ring] = ring_peaks[ring].max(alpha);
    }

    (0..FRAMES_PER_WAVE)
        .map(|frame| {
            let time = frame as f32 / FRAMES_PER_WAVE as f32;
            let mut rgba = icon.rgba().to_vec();
            for (pixel, &(radius, ring, alpha)) in rgba.chunks_exact_mut(4).zip(&pixels) {
                let coverage = alpha as f32 / ring_peaks[ring] as f32;
                // Periodic in both space and time, so the loop has no seam.
                let wave = (0.5 + 0.5 * (TAU * (radius / WAVELENGTH - time)).cos()).powi(2);
                let opacity = RESTING_OPACITY + (PEAK_OPACITY - RESTING_OPACITY) * wave;
                pixel[3] = (255.0 * coverage * opacity).round() as u8;
            }
            (badge(&Image::new(&rgba, width, height)), FRAME_DURATION)
        })
        .collect()
}
