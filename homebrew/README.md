# Homebrew Cask (maintenance notes)

This folder is the source of truth for Cadence's Homebrew Cask. Homebrew
requires taps to live in a repository named `homebrew-<tap>`, so the actual
file users tap into (`gutugaluppo/cadence`) lives in a **separate** GitHub
repository: `GutuGaluppo/homebrew-cadence`. This folder just holds the
maintained copy so the formula evolves alongside the app.

## One-time setup (manual — do this once)

1. Create a new **public** GitHub repository named `homebrew-cadence` under
   the `GutuGaluppo` account (empty, no README needed).
2. Clone it locally and copy this folder's `Casks/cadence.rb` into it at the
   same path (`Casks/cadence.rb`).
3. Commit and push.

No release exists yet for this project (`git tag` is empty), so there is
nothing to point the Cask at until the first version is tagged and
published — see `RELEASE_PLAYBOOK.md` for that process. The Cask's
`sha256` values above are placeholders and **must** be replaced before the
tap will work.

## Updating the Cask for a new release

After a tag (for example `v0.1.0`) has been pushed and
`.github/workflows/release.yml` has finished publishing the macOS `.dmg`
assets:

1. Download both macOS assets from the release:
   - `Cadence_<version>_aarch64.dmg` (Apple Silicon)
   - `Cadence_<version>_x64.dmg` (Intel)
2. Compute their checksums:

   ```bash
   shasum -a 256 Cadence_<version>_aarch64.dmg
   shasum -a 256 Cadence_<version>_x64.dmg
   ```

3. In `Casks/cadence.rb`, update `version` and paste each checksum into the
   matching `sha256` line (`on_arm` for aarch64, `on_intel` for x64).
4. Copy the updated file into the `homebrew-cadence` tap repository, commit,
   and push.

## Verifying the tap

```bash
brew tap gutugaluppo/cadence
brew install --cask cadence
```

To pick up a newer version after updating the tap:

```bash
brew update
brew upgrade --cask cadence
```
