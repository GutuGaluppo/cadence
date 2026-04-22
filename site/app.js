const releaseUrl = "https://github.com/GutuGaluppo/cadence/releases/latest";

const primaryButton = document.getElementById("download-primary");
const primaryCardTitle = document.getElementById("download-card-title");

const platform = navigator.platform.toLowerCase();

let ctaLabel = "Download Latest Release";

if (platform.includes("mac")) {
  ctaLabel = "Download for macOS";
} else if (platform.includes("win")) {
  ctaLabel = "Download Latest Release";
} else if (platform.includes("linux")) {
  ctaLabel = "Download Latest Release";
}

if (primaryButton) {
  primaryButton.textContent = ctaLabel;
  primaryButton.href = releaseUrl;
}

if (primaryCardTitle) {
  primaryCardTitle.textContent = ctaLabel;
}
