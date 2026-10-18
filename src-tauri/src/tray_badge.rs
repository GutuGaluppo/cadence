//! Menu bar icon: the white rings of `tray-icon.png` over a circle filled with
//! the gradient of the focus timer ring.

use tauri::image::Image;

/// Top and bottom colors of the focus timer ring (light theme).
const GRADIENT_TOP: [f32; 3] = [155.0, 147.0, 216.0]; // #9B93D8
const GRADIENT_BOTTOM: [f32; 3] = [26.0, 18.0, 72.0]; // #1A1248
/// Space (in px) between the outer ring and the edge of the circle.
const PADDING: u32 = 4;

/// Draws `rings` in white over the gradient circle. Only the alpha channel of
/// `rings` is used, so the rings can be faded in and out by the animation.
pub fn badge(rings: &Image<'_>) -> Image<'static> {
    let size = rings.width().max(rings.height()) + 2 * PADDING;
    let offset_x = (size - rings.width()) / 2;
    let offset_y = (size - rings.height()) / 2;
    let radius = size as f32 / 2.0;

    let mut rgba = vec![0u8; (size * size * 4) as usize];
    for (i, pixel) in rgba.chunks_exact_mut(4).enumerate() {
        let (x, y) = (i as u32 % size, i as u32 / size);
        let dx = x as f32 + 0.5 - radius;
        let dy = y as f32 + 0.5 - radius;
        // Anti-aliased edge: partial coverage on the pixels the circle crosses.
        let background = (radius - (dx * dx + dy * dy).sqrt() + 0.5).clamp(0.0, 1.0);

        let ring = x
            .checked_sub(offset_x)
            .zip(y.checked_sub(offset_y))
            .filter(|&(rx, ry)| rx < rings.width() && ry < rings.height())
            .map(|(rx, ry)| rings.rgba()[((ry * rings.width() + rx) * 4 + 3) as usize])
            .map_or(0.0, |alpha| alpha as f32 / 255.0);

        let t = (y as f32 + 0.5) / size as f32;
        let alpha = ring + background * (1.0 - ring);
        if alpha == 0.0 {
            continue;
        }
        for channel in 0..3 {
            let gradient =
                GRADIENT_TOP[channel] + (GRADIENT_BOTTOM[channel] - GRADIENT_TOP[channel]) * t;
            let color = 255.0 * ring + gradient * background * (1.0 - ring);
            pixel[channel] = (color / alpha).round() as u8;
        }
        pixel[3] = (alpha * 255.0).round() as u8;
    }

    Image::new_owned(rgba, size, size)
}
