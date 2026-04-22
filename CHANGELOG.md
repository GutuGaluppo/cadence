# Changelog

All notable changes to Cadence should be tracked in this file.

The format follows a lightweight Keep a Changelog style and uses semantic version tags for public releases.

## [Unreleased]

### Added

- GitHub Actions workflows for CI, release builds, and GitHub Pages deployment
- Production playbook for releases, signing, notarization, and Pages setup
- Public support, privacy, and changelog pages for the landing site
- Unit coverage for timer formatting, timer engine, timer settings resolution, and local task persistence
- LocalStorage task repository fallback for browser builds and landing/demo-safe environments

### Changed

- Main layout and secondary views now load lazily to reduce the initial desktop payload
- Release pipeline is prepared for macOS signing/notarization and updater artifact signatures when the required secrets are configured
- Landing page footer and support routes now point to real public project resources instead of placeholder contact data

### Fixed

- Task insertion order is now consistent with the descending `createdAt` sort used by the repository
- Tauri window APIs are loaded only when running inside the Tauri runtime
- Frontend production build no longer emits the previous oversized-entry warning
